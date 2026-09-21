-- Onze Dansreis — Supabase setup
-- Plak dit volledige bestand één keer in Supabase > SQL Editor > New query > Run.

create extension if not exists pgcrypto;

create table if not exists public.couples (
  id uuid primary key default gen_random_uuid(),
  invite_code text not null unique,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.couple_members (
  couple_id uuid not null references public.couples(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (couple_id,user_id),
  unique (user_id)
);

create or replace function public.is_couple_member(p_couple_id uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.couple_members cm where cm.couple_id=p_couple_id and cm.user_id=auth.uid());
$$;

create or replace function public.create_couple()
returns table(couple_id uuid, invite_code text)
language plpgsql security definer set search_path=public as $$
declare v_id uuid; v_code text;
begin
  if exists(select 1 from public.couple_members where user_id=auth.uid()) then
    raise exception 'Dit account is al aan een dansreis gekoppeld.';
  end if;
  loop
    v_code := upper(substr(md5(random()::text || clock_timestamp()::text),1,8));
    exit when not exists(select 1 from public.couples where invite_code=v_code);
  end loop;
  insert into public.couples(invite_code,created_by) values(v_code,auth.uid()) returning id into v_id;
  insert into public.couple_members(couple_id,user_id,role) values(v_id,auth.uid(),'owner');
  return query select v_id,v_code;
end; $$;

create or replace function public.join_couple(p_invite_code text)
returns table(couple_id uuid)
language plpgsql security definer set search_path=public as $$
declare v_id uuid;
begin
  if exists(select 1 from public.couple_members where user_id=auth.uid()) then
    raise exception 'Dit account is al aan een dansreis gekoppeld.';
  end if;
  select id into v_id from public.couples where invite_code=upper(trim(p_invite_code));
  if v_id is null then raise exception 'Koppelcode niet gevonden.'; end if;
  if (select count(*) from public.couple_members where couple_members.couple_id=v_id) >= 2 then
    raise exception 'Deze dansreis heeft al twee gekoppelde accounts.';
  end if;
  insert into public.couple_members(couple_id,user_id,role) values(v_id,auth.uid(),'member');
  return query select v_id;
end; $$;

grant execute on function public.create_couple() to authenticated;
grant execute on function public.join_couple(text) to authenticated;
grant execute on function public.is_couple_member(uuid) to authenticated;

create table if not exists public.lesson_state (
  couple_id uuid not null references public.couples(id) on delete cascade,
  lesson_code text not null,
  status text not null default 'new' check(status in ('new','practicing','mastered')),
  favorite boolean not null default false,
  shared_note text not null default '',
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key(couple_id,lesson_code)
);

create table if not exists public.repertoire_items (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  title text not null,
  style text not null default 'Anders',
  item_type text not null default 'Anders',
  notes text not null default '',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_lesson_code text,
  welcome_seen boolean not null default false,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end; $$;

drop trigger if exists lesson_state_touch on public.lesson_state;
create trigger lesson_state_touch before update on public.lesson_state for each row execute function public.touch_updated_at();
drop trigger if exists repertoire_touch on public.repertoire_items;
create trigger repertoire_touch before update on public.repertoire_items for each row execute function public.touch_updated_at();
drop trigger if exists user_settings_touch on public.user_settings;
create trigger user_settings_touch before update on public.user_settings for each row execute function public.touch_updated_at();

alter table public.couples enable row level security;
alter table public.couple_members enable row level security;
alter table public.lesson_state enable row level security;
alter table public.repertoire_items enable row level security;
alter table public.user_settings enable row level security;

-- Couples: alleen leden zien hun eigen koppelrecord.
drop policy if exists couples_select on public.couples;
create policy couples_select on public.couples for select to authenticated using(created_by=auth.uid() or public.is_couple_member(id));

-- Membership: ieder ziet alleen memberships van zijn/haar eigen dansreis.
drop policy if exists members_select on public.couple_members;
create policy members_select on public.couple_members for select to authenticated using(user_id=auth.uid() or public.is_couple_member(couple_id));

-- Shared lesson state.
drop policy if exists lesson_select on public.lesson_state;
create policy lesson_select on public.lesson_state for select to authenticated using(public.is_couple_member(couple_id));
drop policy if exists lesson_insert on public.lesson_state;
create policy lesson_insert on public.lesson_state for insert to authenticated with check(public.is_couple_member(couple_id));
drop policy if exists lesson_update on public.lesson_state;
create policy lesson_update on public.lesson_state for update to authenticated using(public.is_couple_member(couple_id)) with check(public.is_couple_member(couple_id));
drop policy if exists lesson_delete on public.lesson_state;
create policy lesson_delete on public.lesson_state for delete to authenticated using(public.is_couple_member(couple_id));

-- Shared repertoire.
drop policy if exists rep_select on public.repertoire_items;
create policy rep_select on public.repertoire_items for select to authenticated using(public.is_couple_member(couple_id));
drop policy if exists rep_insert on public.repertoire_items;
create policy rep_insert on public.repertoire_items for insert to authenticated with check(public.is_couple_member(couple_id));
drop policy if exists rep_update on public.repertoire_items;
create policy rep_update on public.repertoire_items for update to authenticated using(public.is_couple_member(couple_id)) with check(public.is_couple_member(couple_id));
drop policy if exists rep_delete on public.repertoire_items;
create policy rep_delete on public.repertoire_items for delete to authenticated using(public.is_couple_member(couple_id));

-- Persoonlijke instellingen.
drop policy if exists settings_select on public.user_settings;
create policy settings_select on public.user_settings for select to authenticated using(user_id=auth.uid());
drop policy if exists settings_insert on public.user_settings;
create policy settings_insert on public.user_settings for insert to authenticated with check(user_id=auth.uid());
drop policy if exists settings_update on public.user_settings;
create policy settings_update on public.user_settings for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());

-- Realtime voor jullie gedeelde lesstatus en repertoire.
alter table public.lesson_state replica identity full;
alter table public.repertoire_items replica identity full;
do $$ begin
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='lesson_state') then
    alter publication supabase_realtime add table public.lesson_state;
  end if;
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='repertoire_items') then
    alter publication supabase_realtime add table public.repertoire_items;
  end if;
end $$;
-- Fix 001 — ambiguous invite_code in create_couple RPC
create or replace function public.create_couple()
returns table(couple_id uuid, invite_code text)
language plpgsql
security definer
set search_path=public
as $$
declare
  v_id uuid;
  v_code text;
begin
  if exists (
    select 1
    from public.couple_members cm
    where cm.user_id = auth.uid()
  ) then
    raise exception 'Dit account is al aan een dansreis gekoppeld.';
  end if;

  loop
    v_code := upper(substr(md5(random()::text || clock_timestamp()::text),1,8));
    exit when not exists (
      select 1
      from public.couples c
      where c.invite_code = v_code
    );
  end loop;

  insert into public.couples(invite_code, created_by)
  values(v_code, auth.uid())
  returning id into v_id;

  insert into public.couple_members(couple_id, user_id, role)
  values(v_id, auth.uid(), 'owner');

  return query select v_id, v_code;
end;
$$;

grant execute on function public.create_couple() to authenticated;

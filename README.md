# Onze Dansreis 💃🏽🕺🏽

Persoonlijke PWA voor Urban Kiz, Douceur, Konpa en Kizomba.

## Eenmalige setup

1. Open Supabase → **SQL Editor** → **New query**.
2. Plak de inhoud van `SUPABASE_SETUP.sql` en klik **Run**.
3. GitHub → repository **Settings → Pages** → Source: **Deploy from a branch** → `main` / `(root)` → Save.
4. De site wordt daarna: `https://unstablenicky.github.io/Onze-reis/`.
5. Supabase → **Authentication → URL Configuration**:
   - Site URL: `https://unstablenicky.github.io/Onze-reis/`
   - Redirect URL toevoegen: `https://unstablenicky.github.io/Onze-reis/`
6. Open de site op beide telefoons. Maak ieder een eigen account met e-mail + wachtwoord.
7. De eerste maakt de gezamenlijke dansreis aan en deelt de koppelcode; de tweede voert die code in.
8. Kies in Chrome **App installeren / Toevoegen aan startscherm**.

De publishable Supabase key mag in browsercode staan. Zet nooit een `service_role` of secret key in deze repository.
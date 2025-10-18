# 🌙 Midnight Magnolia — Replit Launch (Path 3)

**Stack:** Node + Express + SQLite (content) + Supabase Auth + Stripe

## Quick Start
1. **Import ZIP** on Replit.
2. Add Secrets (Tools → Secrets):
   ```
   SUPABASE_URL=
   SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE=
   SESSION_SECRET=super-long-random-string
   STRIPE_SECRET_KEY=
   BASE_URL=https://YOUR-REPLIT-URL.repl.co
   ADMIN_EMAILS=latisha@midnight-magnolia.com
   ```
3. Install & migrate:
   ```bash
   npm install
   npm run migrate
   npm run dev
   ```
4. Visit `/` for the site, `/shop` for the seeded product, `/login` for Auth.
   - MVP callback: POST tokens to `/auth/callback` form to set cookie session.

## Notes
- Public + admin live in one app (no Vercel).
- SQLite is zero-cost. Supabase handles **Auth only**.
- Stripe Checkout used for payments (no cart).

## Backups
- Weekly run (Replit scheduled task): `npm run backup` → creates `backups/sqlite-backup-YYYY-MM-DD.sqlite.gz`.

## Brand
- Colors & fonts set in `static/styles.css` and `views/layout.html`.
- Hero includes Adobe Express moodboard embed on the homepage.

© 2025 Rumi-Nations LLC
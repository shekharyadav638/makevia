# Makevia

Coming-soon landing page for [makevia.in](https://makevia.in). Next.js 16, TypeScript, Tailwind CSS v4, Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # waitlist validation
npm run build
```

## Waitlist

Entries are stored in Supabase through the server action in `src/app/actions.ts`. Your secret key stays on the server and is never sent to the browser.

1. Create a Supabase project and run this in the SQL editor:

```sql
create table public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique check (char_length(email) <= 254),
  idea text check (char_length(idea) <= 200),
  source text,
  created_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
grant insert on public.waitlist to service_role;
```

2. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` (Project Settings → Data API) and `SUPABASE_SECRET_KEY` (Project Settings → API Keys: a `sb_secret_…` key, or the legacy `service_role` key). Add the same two variables in Vercel.

RLS is on and has no policies, so the public/anon key can't read or write the table. Emails are saved in lowercase, and a repeat signup is silently ignored.

## Brand tokens

Colors live as CSS variables in `src/app/globals.css` and are exposed as Tailwind colors (`ink`, `paper`, `accent`, …).

## Deploy

Import the repo in Vercel and set the two Supabase env vars.

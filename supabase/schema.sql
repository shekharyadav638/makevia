create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique check (char_length(email) <= 254),
  idea text check (char_length(idea) <= 200),
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  idea text not null check (char_length(idea) between 3 and 300),
  category text not null,
  roadmap jsonb not null,
  ip_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists ideas_ip_hash_created_at_idx on public.ideas (ip_hash, created_at desc);

create table if not exists public.providers (
  id bigint generated always as identity primary key,
  name text not null,
  service text not null check (service in ('formulation', 'manufacturing', 'packaging', 'testing', 'logistics')),
  categories text[] not null default '{}',
  city text,
  state text,
  description text,
  website text check (website is null or website ~* '^https?://'),
  email text,
  phone text,
  verified boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists providers_published_service_idx on public.providers (service) where published;

create table if not exists public.match_requests (
  id bigint generated always as identity primary key,
  idea_id uuid not null references public.ideas (id) on delete cascade,
  email text not null check (char_length(email) <= 254),
  created_at timestamptz not null default now(),
  unique (idea_id, email)
);

alter table public.waitlist enable row level security;
alter table public.ideas enable row level security;
alter table public.providers enable row level security;
alter table public.match_requests enable row level security;

grant insert on public.waitlist to service_role;
grant select, insert on public.ideas to service_role;
grant select on public.providers to service_role;
grant insert on public.match_requests to service_role;

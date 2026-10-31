-- Directory schema. Mirrors src/lib/types.ts; the app reads local sample data
-- until this is applied to a Supabase project.

create table funding_programs (
  slug text primary key,
  name text not null,
  short_name text not null,
  kind text not null check (kind in ('scholarship', 'public-insurance', 'private-insurance', 'self-pay')),
  state char(2),                -- null = applies in every state
  administrator text,
  description text not null,
  official_url text,
  badge_label text not null
);

create table services (
  slug text primary key,
  name text not null,
  "group" text not null check ("group" in ('therapy', 'medical', 'complementary', 'support')),
  blurb text not null
);

create table conditions (
  slug text primary key,
  name text not null
);

create table providers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  kind text not null check (kind in ('clinic', 'individual', 'organization')),
  description text not null,
  age_min smallint not null default 0,
  age_max smallint not null default 99,
  city text not null,
  county text not null,
  state char(2) not null,
  zip text not null,
  telehealth boolean not null default false,
  in_home boolean not null default false,
  accepting_new_patients boolean not null default false,
  waitlist text not null default 'unknown'
    check (waitlist in ('none', 'under-1-month', '1-3-months', '3-plus-months', 'unknown')),
  insurers text[] not null default '{}',
  languages text[] not null default '{English}',
  phone text,
  website text,
  verified_at date,
  verified_method text check (verified_method in ('provider', 'official-list', 'phone')),
  claimed_by uuid references auth.users,  -- provider account that manages the listing
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table provider_services (
  provider_id uuid references providers on delete cascade,
  service_slug text references services,
  primary key (provider_id, service_slug)
);

create table provider_conditions (
  provider_id uuid references providers on delete cascade,
  condition_slug text references conditions,
  primary key (provider_id, condition_slug)
);

create table provider_funding (
  provider_id uuid references providers on delete cascade,
  funding_slug text references funding_programs,
  primary key (provider_id, funding_slug)
);

create index providers_state_county on providers (state, county);

-- Public read-only directory; writes go through the claimed provider or admins.
alter table funding_programs enable row level security;
alter table services enable row level security;
alter table conditions enable row level security;
alter table providers enable row level security;
alter table provider_services enable row level security;
alter table provider_conditions enable row level security;
alter table provider_funding enable row level security;

create policy "public read" on funding_programs for select using (true);
create policy "public read" on services for select using (true);
create policy "public read" on conditions for select using (true);
create policy "public read" on providers for select using (true);
create policy "public read" on provider_services for select using (true);
create policy "public read" on provider_conditions for select using (true);
create policy "public read" on provider_funding for select using (true);
create policy "claimed provider updates" on providers for update
  using (auth.uid() = claimed_by) with check (auth.uid() = claimed_by);

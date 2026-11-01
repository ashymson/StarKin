-- Waitlist sign-ups from /waitlist. Email, role and ZIP only: never a child's
-- diagnosis or other health details (see docs/ROADMAP.md, privacy).
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) <= 254),
  role text not null check (role in ('parent', 'provider', 'other')),
  zip text not null check (zip ~ '^\d{5}$'),
  ok_to_contact boolean not null default false,
  created_at timestamptz not null default now()
);

-- One sign-up per email, ignoring case. A repeat sign-up returns 409, which the
-- site shows as "You're already on the list".
create unique index waitlist_email_key on waitlist (lower(email));

-- The site uses the public (anon) key: it may add sign-ups but never read them.
-- Read the list in the Supabase dashboard (Table Editor) or with the service role.
alter table waitlist enable row level security;
grant insert on waitlist to anon;
create policy "anyone can join" on waitlist for insert to anon with check (true);

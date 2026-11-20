-- Optional CMS for SoCal's New Homes browse-only showcase.
-- Do not run against production without Aaron's go-ahead.
-- Site currently serves src/data/newHomes.ts until this is wired.

create table if not exists public.showcase_homes (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  area text not null,
  from_price numeric not null,
  beds text not null,
  baths text not null,
  sqft text not null,
  style text not null,
  blurb text not null default '',
  compare_to_resale text[] not null default '{}',
  image text not null default '',
  gallery text[] not null default '{}',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.showcase_homes enable row level security;

create policy "Public read published showcase"
  on public.showcase_homes for select
  using (is_published = true);

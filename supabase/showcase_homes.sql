-- SoCal's New Homes browse-only showcase CMS + media storage.
-- Run in Supabase SQL Editor for project pdlecpunupzyqreocjnn.

create table if not exists public.showcase_homes (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  area text not null,
  from_price numeric not null,
  price_high numeric,
  beds text not null default '',
  baths text not null default '',
  sqft text not null default '',
  style text not null default '',
  blurb text not null default '',
  compare_to_resale text[] not null default '{}',
  why_buyers text not null default '',
  hoa text not null default 'Not yet verified',
  special_assessments text not null default 'Not yet verified',
  incentives text not null default 'Not yet verified',
  verified_date text not null default '',
  image text not null default '',
  gallery text[] not null default '{}',
  video_url text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Upgrade path if an older thin table already exists
alter table public.showcase_homes add column if not exists price_high numeric;
alter table public.showcase_homes add column if not exists why_buyers text not null default '';
alter table public.showcase_homes add column if not exists hoa text not null default 'Not yet verified';
alter table public.showcase_homes add column if not exists special_assessments text not null default 'Not yet verified';
alter table public.showcase_homes add column if not exists incentives text not null default 'Not yet verified';
alter table public.showcase_homes add column if not exists verified_date text not null default '';
alter table public.showcase_homes add column if not exists video_url text not null default '';

alter table public.showcase_homes enable row level security;

drop policy if exists "Public read published showcase" on public.showcase_homes;
create policy "Public read published showcase"
  on public.showcase_homes for select
  using (is_published = true);

drop policy if exists "admin read all showcase" on public.showcase_homes;
create policy "admin read all showcase"
  on public.showcase_homes for select
  to authenticated
  using (true);

drop policy if exists "admin write showcase" on public.showcase_homes;
create policy "admin write showcase"
  on public.showcase_homes for all
  to authenticated
  using (true) with check (true);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_showcase_homes_updated on public.showcase_homes;
create trigger trg_showcase_homes_updated
  before update on public.showcase_homes
  for each row execute function public.set_updated_at();

-- Public media bucket for listing + showcase galleries
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-media',
  'listing-media',
  true,
  52428800,
  array['image/jpeg','image/png','image/webp','image/gif','image/heic','image/heif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read listing media" on storage.objects;
create policy "Public read listing media"
  on storage.objects for select
  using (bucket_id = 'listing-media');

drop policy if exists "Admin upload listing media" on storage.objects;
create policy "Admin upload listing media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'listing-media');

drop policy if exists "Admin update listing media" on storage.objects;
create policy "Admin update listing media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'listing-media')
  with check (bucket_id = 'listing-media');

drop policy if exists "Admin delete listing media" on storage.objects;
create policy "Admin delete listing media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'listing-media');

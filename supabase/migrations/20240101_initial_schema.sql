-- Borena National Park CMS Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site settings
create table public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_by uuid references public.profiles(id)
);

-- Navigation items
create table public.navigation_items (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  url text not null,
  "order" integer not null default 0,
  visible boolean not null default true,
  open_in_new_tab boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Content base table
create table public.contents (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('wildlife', 'story', 'experience', 'culture', 'conservation', 'research', 'visitor_info')),
  title text not null,
  slug text unique not null,
  excerpt text,
  body text,
  featured_image_url text,
  gallery jsonb default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  seo_title text,
  seo_description text,
  og_image_url text,
  canonical_url text,
  essential_offline boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone,
  author_id uuid references public.profiles(id)
);

-- Wildlife specific fields
create table public.wildlife_details (
  id uuid primary key default uuid_generate_v4(),
  content_id uuid references public.contents(id) on delete cascade unique not null,
  scientific_name text,
  category text,
  conservation_status text,
  habitat text,
  behavior text
);

-- Content categories/tags
create table public.tags (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null
);

create table public.content_tags (
  content_id uuid references public.contents(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (content_id, tag_id)
);

-- Media library
create table public.media (
  id uuid primary key default uuid_generate_v4(),
  filename text not null,
  title text,
  description text,
  alt_text text,
  caption text,
  photographer text,
  copyright text,
  category text,
  mime_type text not null,
  size_bytes integer,
  width integer,
  height integer,
  url text not null,
  thumbnail_url text,
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gallery
create table public.galleries (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  "order" integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.gallery_items (
  id uuid primary key default uuid_generate_v4(),
  gallery_id uuid references public.galleries(id) on delete cascade not null,
  media_id uuid references public.media(id) on delete cascade not null,
  "order" integer not null default 0,
  caption text
);

-- Map locations
create table public.map_locations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  category text,
  latitude double precision not null,
  longitude double precision not null,
  image_url text,
  essential_offline boolean not null default false,
  "order" integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Accommodation
create table public.accommodations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  type text,
  price_range text,
  contact_email text,
  contact_phone text,
  website text,
  image_url text,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Visitor information
create table public.visitor_infos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  category text,
  essential_offline boolean not null default false,
  "order" integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact messages
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean not null default false,
  replied boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Newsletter subscribers
create table public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  active boolean not null default true,
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unsubscribed_at timestamp with time zone
);

-- Activity log
create table public.activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id),
  action text not null,
  content_type text,
  content_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.navigation_items enable row level security;
alter table public.contents enable row level security;
alter table public.wildlife_details enable row level security;
alter table public.tags enable row level security;
alter table public.content_tags enable row level security;
alter table public.media enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_items enable row level security;
alter table public.map_locations enable row level security;
alter table public.accommodations enable row level security;
alter table public.visitor_infos enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.activity_logs enable row level security;

-- Public read policies
create policy "Public read published content" on public.contents for select using (status = 'published');
create policy "Public read published galleries" on public.galleries for select using (status = 'published');
create policy "Public read map locations" on public.map_locations for select using (true);
create policy "Public read published accommodations" on public.accommodations for select using (status = 'published');
create policy "Public read visitor info" on public.visitor_infos for select using (true);
create policy "Public read navigation" on public.navigation_items for select using (visible = true);
create policy "Public read site settings" on public.site_settings for select using (true);

-- Admin policies
create policy "Admins full access profiles" on public.profiles for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors read profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access site_settings" on public.site_settings for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors read site_settings" on public.site_settings for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access navigation" on public.navigation_items for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors read navigation" on public.navigation_items for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access contents" on public.contents for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors manage contents" on public.contents for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access media" on public.media for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors manage media" on public.media for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access galleries" on public.galleries for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors manage galleries" on public.galleries for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access map_locations" on public.map_locations for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors manage map_locations" on public.map_locations for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access accommodations" on public.accommodations for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors manage accommodations" on public.accommodations for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access visitor_infos" on public.visitor_infos for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors manage visitor_infos" on public.visitor_infos for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access contact_messages" on public.contact_messages for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors read contact_messages" on public.contact_messages for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access newsletter_subscribers" on public.newsletter_subscribers for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors read newsletter_subscribers" on public.newsletter_subscribers for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins full access activity_logs" on public.activity_logs for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Editors read activity_logs" on public.activity_logs for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'viewer');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

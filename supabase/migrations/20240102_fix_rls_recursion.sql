-- Fix RLS Infinite Recursion on Profiles and add Public Media Read
-- Run this in Supabase SQL Editor

-- 1. Helper functions with SECURITY DEFINER to safely check roles without triggering RLS recursion
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- 2. Drop existing recursive policies
drop policy if exists "Admins full access profiles" on public.profiles;
drop policy if exists "Editors read profiles" on public.profiles;
drop policy if exists "Admins full access site_settings" on public.site_settings;
drop policy if exists "Editors read site_settings" on public.site_settings;
drop policy if exists "Admins full access navigation" on public.navigation_items;
drop policy if exists "Editors read navigation" on public.navigation_items;
drop policy if exists "Admins full access contents" on public.contents;
drop policy if exists "Editors manage contents" on public.contents;
drop policy if exists "Admins full access media" on public.media;
drop policy if exists "Editors manage media" on public.media;
drop policy if exists "Admins full access galleries" on public.galleries;
drop policy if exists "Editors manage galleries" on public.galleries;
drop policy if exists "Admins full access map_locations" on public.map_locations;
drop policy if exists "Editors manage map_locations" on public.map_locations;
drop policy if exists "Admins full access accommodations" on public.accommodations;
drop policy if exists "Editors manage accommodations" on public.accommodations;
drop policy if exists "Admins full access visitor_infos" on public.visitor_infos;
drop policy if exists "Editors manage visitor_infos" on public.visitor_infos;
drop policy if exists "Admins full access contact_messages" on public.contact_messages;
drop policy if exists "Editors read contact_messages" on public.contact_messages;
drop policy if exists "Admins full access newsletter_subscribers" on public.newsletter_subscribers;
drop policy if exists "Editors read newsletter_subscribers" on public.newsletter_subscribers;
drop policy if exists "Admins full access activity_logs" on public.activity_logs;
drop policy if exists "Editors read activity_logs" on public.activity_logs;
drop policy if exists "Public read media" on public.media;
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

-- 3. Re-create non-recursive policies
create policy "Public read media" on public.media for select using (true);

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Admins full access profiles" on public.profiles for all using (public.is_admin());
create policy "Editors read profiles" on public.profiles for select using (public.is_staff());

create policy "Admins full access site_settings" on public.site_settings for all using (public.is_admin());
create policy "Editors read site_settings" on public.site_settings for select using (public.is_staff());

create policy "Admins full access navigation" on public.navigation_items for all using (public.is_admin());
create policy "Editors read navigation" on public.navigation_items for select using (public.is_staff());

create policy "Admins full access contents" on public.contents for all using (public.is_admin());
create policy "Editors manage contents" on public.contents for all using (public.is_staff());

create policy "Admins full access media" on public.media for all using (public.is_admin());
create policy "Editors manage media" on public.media for all using (public.is_staff());

create policy "Admins full access galleries" on public.galleries for all using (public.is_admin());
create policy "Editors manage galleries" on public.galleries for all using (public.is_staff());

create policy "Admins full access map_locations" on public.map_locations for all using (public.is_admin());
create policy "Editors manage map_locations" on public.map_locations for all using (public.is_staff());

create policy "Admins full access accommodations" on public.accommodations for all using (public.is_admin());
create policy "Editors manage accommodations" on public.accommodations for all using (public.is_staff());

create policy "Admins full access visitor_infos" on public.visitor_infos for all using (public.is_admin());
create policy "Editors manage visitor_infos" on public.visitor_infos for all using (public.is_staff());

create policy "Admins full access contact_messages" on public.contact_messages for all using (public.is_admin());
create policy "Editors read contact_messages" on public.contact_messages for select using (public.is_staff());

create policy "Admins full access newsletter_subscribers" on public.newsletter_subscribers for all using (public.is_admin());
create policy "Editors read newsletter_subscribers" on public.newsletter_subscribers for select using (public.is_staff());

create policy "Admins full access activity_logs" on public.activity_logs for all using (public.is_admin());
create policy "Editors read activity_logs" on public.activity_logs for select using (public.is_staff());

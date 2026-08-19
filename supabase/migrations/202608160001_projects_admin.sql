-- Yılmaz Yapı — proje yönetimi + admin RLS
-- Supabase Dashboard > SQL Editor içinde çalıştırın.

create extension if not exists pgcrypto;

create type public.project_status as enum ('ongoing', 'completed', 'permit');
create type public.media_type as enum ('image', 'video', 'youtube');

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status public.project_status not null default 'ongoing',
  short_description text,
  description text,
  location text,
  district text,
  city text,
  cover_image text,
  published boolean not null default false,
  featured boolean not null default false,
  sort_order integer not null default 0,
  features jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  type public.media_type not null,
  url text not null,
  storage_path text,
  title text,
  description text,
  thumbnail_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index project_media_project_id_idx on public.project_media (project_id, sort_order);
create index projects_status_published_idx on public.projects (status, published, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
before update on public.projects
for each row
execute procedure public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;

create policy "Admins can read own admin row"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

create policy "Published projects are readable"
on public.projects
for select
to anon, authenticated
using (published = true or public.is_admin());

create policy "Admins insert projects"
on public.projects
for insert
to authenticated
with check (public.is_admin());

create policy "Admins update projects"
on public.projects
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins delete projects"
on public.projects
for delete
to authenticated
using (public.is_admin());

create policy "Published project media is readable"
on public.project_media
for select
to anon, authenticated
using (
  public.is_admin()
  or exists (
    select 1 from public.projects p
    where p.id = project_id and p.published = true
  )
);

create policy "Admins insert project media"
on public.project_media
for insert
to authenticated
with check (public.is_admin());

create policy "Admins update project media"
on public.project_media
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins delete project media"
on public.project_media
for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

create policy "Public read project-media bucket"
on storage.objects
for select
using (bucket_id = 'project-media');

create policy "Admins upload project-media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-media' and public.is_admin());

create policy "Admins update project-media"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-media' and public.is_admin())
with check (bucket_id = 'project-media' and public.is_admin());

create policy "Admins delete project-media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-media' and public.is_admin());

grant usage on type public.project_status to anon, authenticated;
grant usage on type public.media_type to anon, authenticated;

grant select on table public.projects to anon, authenticated;
grant insert, update, delete on table public.projects to authenticated;

grant select on table public.project_media to anon, authenticated;
grant insert, update, delete on table public.project_media to authenticated;

grant select on table public.admin_users to authenticated;

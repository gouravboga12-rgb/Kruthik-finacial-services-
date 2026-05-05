

-- Table for Home Page Banners
create table public.banners (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  image_url text not null,
  redirect_url text,
  title text,
  is_active boolean default true,
  display_order integer default 0
);

-- Enable RLS
alter table public.banners enable row level security;

-- Policies
create policy " Banners are viewable by everyone\ on public.banners for select using (true);
create policy \Banners are manageable by authenticated users\ on public.banners for all using (auth.role() = 'authenticated');


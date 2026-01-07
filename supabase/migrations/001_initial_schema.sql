-- Children (kids/students linked to a user)
create table children (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  school_name text,
  created_at timestamptz default now() not null
);

-- Emails received
create table emails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  from_address text not null,
  subject text,
  body_text text,
  raw_html text,
  attachment_path text,
  processed boolean default false not null,
  created_at timestamptz default now() not null
);

-- Items extracted from emails (events, deadlines, etc)
create table items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  child_id uuid references children(id) on delete set null,
  email_id uuid references emails(id) on delete set null,
  title text not null,
  event_date date,
  event_time time,
  action_required text,
  cost decimal(10,2),
  status text default 'pending' not null check (status in ('pending', 'added_to_calendar')),
  calendar_event_id text,
  created_at timestamptz default now() not null
);

-- Indexes
create index children_user_id_idx on children(user_id);
create index emails_user_id_idx on emails(user_id);
create index emails_processed_idx on emails(processed) where not processed;
create index items_user_id_idx on items(user_id);
create index items_status_idx on items(user_id, status);
create index items_created_at_idx on items(user_id, created_at);

-- RLS (Row Level Security)
alter table children enable row level security;
alter table emails enable row level security;
alter table items enable row level security;

-- Policies: users can only access their own data
create policy "Users can view own children"
  on children for select using (auth.uid() = user_id);

create policy "Users can insert own children"
  on children for insert with check (auth.uid() = user_id);

create policy "Users can update own children"
  on children for update using (auth.uid() = user_id);

create policy "Users can delete own children"
  on children for delete using (auth.uid() = user_id);

create policy "Users can view own emails"
  on emails for select using (auth.uid() = user_id);

create policy "Users can insert own emails"
  on emails for insert with check (auth.uid() = user_id);

create policy "Users can view own items"
  on items for select using (auth.uid() = user_id);

create policy "Users can insert own items"
  on items for insert with check (auth.uid() = user_id);

create policy "Users can update own items"
  on items for update using (auth.uid() = user_id);

create policy "Users can delete own items"
  on items for delete using (auth.uid() = user_id);

-- Storage bucket for attachments
insert into storage.buckets (id, name, public)
values ('attachments', 'attachments', false);

-- Storage policy: users can access their own attachments
create policy "Users can upload own attachments"
  on storage.objects for insert
  with check (bucket_id = 'attachments' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view own attachments"
  on storage.objects for select
  using (bucket_id = 'attachments' and auth.uid()::text = (storage.foldername(name))[1]);

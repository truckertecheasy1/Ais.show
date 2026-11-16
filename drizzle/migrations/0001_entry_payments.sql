create table public.entry_payments (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  email text,
  name text,
  category text,
  quantity integer not null default 1,
  amount_total integer,
  currency text,
  status text not null default 'pending',
  environment text not null default 'sandbox',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.entry_payments enable row level security;
grant all on public.entry_payments to service_role;
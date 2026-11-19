ALTER TABLE public.entry_interest ADD COLUMN IF NOT EXISTS channel_url text;
ALTER TABLE public.entry_interest ADD COLUMN IF NOT EXISTS work_url text;

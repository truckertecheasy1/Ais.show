CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  interest_type text NOT NULL CHECK (interest_type IN ('viewer','creator','sponsor','press')),
  language text NOT NULL DEFAULT 'en' CHECK (char_length(language) <= 10),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX leads_email_uniq ON public.leads (lower(email));

CREATE TABLE public.votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  host_choice text NOT NULL CHECK (host_choice IN ('aria-nova','kai-sterling','lumen-vale','orion-cross','sable-wren','vega-lux')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX votes_email_uniq ON public.votes (lower(email));

CREATE TABLE public.sponsor_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL CHECK (char_length(company) BETWEEN 1 AND 150),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  tier_interest text NOT NULL CHECK (tier_interest IN ('anchor','platinum','silver','category','undecided')),
  message text CHECK (char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.entry_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  category text NOT NULL CHECK (char_length(category) BETWEEN 1 AND 60),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads, public.votes, public.sponsor_inquiries, public.entry_interest TO anon, authenticated;
GRANT ALL ON public.leads, public.votes, public.sponsor_inquiries, public.entry_interest TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsor_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entry_interest ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public insert votes" ON public.votes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public insert sponsor" ON public.sponsor_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public insert entry" ON public.entry_interest FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Basic per-email throttle: max 3 submissions per 10 minutes
CREATE OR REPLACE FUNCTION public.throttle_by_email()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n int;
BEGIN
  EXECUTE format('SELECT count(*) FROM public.%I WHERE lower(email) = lower($1) AND created_at > now() - interval ''10 minutes''', TG_TABLE_NAME)
    INTO n USING NEW.email;
  IF n >= 3 THEN
    RAISE EXCEPTION 'rate_limited' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER throttle_sponsor BEFORE INSERT ON public.sponsor_inquiries FOR EACH ROW EXECUTE FUNCTION public.throttle_by_email();
CREATE TRIGGER throttle_entry BEFORE INSERT ON public.entry_interest FOR EACH ROW EXECUTE FUNCTION public.throttle_by_email();

CREATE OR REPLACE FUNCTION public.get_vote_counts()
RETURNS TABLE(host_choice text, votes bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT host_choice, count(*) FROM public.votes GROUP BY host_choice;
$$;
GRANT EXECUTE ON FUNCTION public.get_vote_counts() TO anon, authenticated;
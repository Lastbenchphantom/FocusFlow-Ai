-- FocusFlow AI: contact_leads table with RLS and least-privilege grants

create extension if not exists "pgcrypto";

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text,
  created_at timestamptz not null default now(),
  constraint contact_leads_name_length check (char_length(trim(name)) between 2 and 100),
  constraint contact_leads_email_format check (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    and char_length(email) <= 254
  ),
  constraint contact_leads_company_length check (
    company is null or char_length(company) <= 120
  ),
  constraint contact_leads_message_length check (
    message is null or char_length(message) <= 2000
  )
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create index if not exists contact_leads_email_idx
  on public.contact_leads (lower(email));

alter table public.contact_leads enable row level security;

-- No policies for anon/authenticated: clients cannot read, update, or delete leads.
-- Inserts go through the server using the service role, which bypasses RLS.

revoke all on table public.contact_leads from anon, authenticated;
grant insert, select, update, delete on table public.contact_leads to service_role;

comment on table public.contact_leads is
  'Lead capture submissions for FocusFlow AI. Server-side writes only.';

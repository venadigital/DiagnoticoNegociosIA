create table if not exists public.diagnosis_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  instagram text,
  whatsapp text,
  business_type text not null,
  business_size text not null,
  ai_goal text,
  answers jsonb not null,
  raw_score integer not null check (raw_score >= 0 and raw_score <= 48),
  final_score integer not null check (final_score >= 0 and final_score <= 100),
  result_level text not null check (result_level in ('caos_operativo', 'base_minima', 'negocio_preparado', 'listo_para_escalar')),
  weakest_block text not null check (weakest_block in ('clientes', 'ventas', 'oferta_inventario', 'finanzas', 'procesos', 'preparacion_ia')),
  cta_shown text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer_url text
);

alter table public.diagnosis_leads enable row level security;
grant usage on schema public to anon;
grant insert on public.diagnosis_leads to anon;
drop policy if exists "Anyone can submit diagnosis leads" on public.diagnosis_leads;
create policy "Anyone can submit diagnosis leads" on public.diagnosis_leads for insert to anon with check (true);
create index if not exists diagnosis_leads_created_at_idx on public.diagnosis_leads (created_at desc);
create index if not exists diagnosis_leads_email_idx on public.diagnosis_leads (email);
create index if not exists diagnosis_leads_result_level_idx on public.diagnosis_leads (result_level);

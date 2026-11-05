-- Apenas para teste sem autenticação: qualquer visitante poderá inserir um nome.
-- Não usar para dados pessoais reais sem autenticação e controles adicionais.
create table if not exists public.nomes_teste (
 id bigint generated always as identity primary key,
 nome text not null check (char_length(trim(nome)) between 1 and 100),
 criado_em timestamptz not null default now()
);
alter table public.nomes_teste enable row level security;
grant usage on schema public to anon;
grant insert on public.nomes_teste to anon;
create policy "Permitir insercao anonima de teste" on public.nomes_teste for insert to anon with check (char_length(trim(nome)) between 1 and 100);
-- Sem política SELECT: visitantes não podem listar nomes cadastrados.

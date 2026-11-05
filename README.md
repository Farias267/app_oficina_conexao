# Oficina Conexão — Teste React / Supabase / Vercel

App responsivo de teste com React 19.3.1, Vite 8.3.5 e TypeScript. Possui header, sidebar, navegação inferior mockada e um campo de nome.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

## Supabase

1. Crie ou selecione um projeto Supabase.
2. Execute a migration em `supabase/migrations/20261104000000_create_nomes_teste.sql` no SQL Editor ou via Supabase CLI.
3. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` no Vercel (Production e Preview) ou copie `.env.example` para `.env` localmente com os valores públicos reais.
4. Faça um novo deploy após configurar as variáveis.

**Segurança:** projeto de demonstração sem login. O banco aceita apenas INSERT anônimo de nomes, não permite SELECT público. Não use dados sensíveis nem exponha chaves `service_role` no frontend. Sem Supabase configurado, o app mostra uma simulação local sem persistir.

## Hospedagem

Vercel com framework Vite, comando `npm run build` e diretório de saída `dist`. Alterações na branch `main` publicam automaticamente quando conectado ao GitHub.

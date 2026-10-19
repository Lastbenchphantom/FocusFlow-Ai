# FocusFlow AI

Premium SaaS landing page for an **illustrative** AI productivity product. Built as a professional portfolio project with a real PostgreSQL-backed contact form.

> Simulated prioritization demos use local heuristics — **not** a live AI model. Demo data and testimonials are fictional.

## Stack

- Next.js (App Router) · React · JavaScript · Tailwind CSS
- Motion for React · GSAP / ScrollTrigger · Lucide React
- Supabase PostgreSQL · Vercel

## Local development

```bash
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm test` | Automated smoke tests |

## Environment variables

| Name | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Publishable / anon key (not used for lead writes) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Lead inserts via API route |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Server | Rate-limit window (default `60000`) |
| `CONTACT_RATE_LIMIT_MAX` | Server | Max requests per window (default `5`) |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL for metadata |

Never expose the service role key in client bundles.

## Database

Migration: `supabase/migrations/20261019060000_create_contact_leads.sql`

Creates `contact_leads` with UUID PK, validation constraints, indexes, RLS enabled, and no anon/authenticated policies for read/update/delete. Inserts go through `/api/contact` using the service role.

```bash
npx supabase db push
```

## Contact API

`POST /api/contact` — validates input, honeypot, rate limit, inserts into `contact_leads`.

## License

Portfolio demonstration project. All product claims are illustrative.
# FocusFlow-Ai
# FocusFlow-Ai

# FocusFlow AI — Premium SaaS Landing Page

A polished, responsive SaaS landing page for a fictional AI productivity platform, built to demonstrate modern frontend development, advanced animations, and real database-backed lead capture.

**FocusFlow AI helps teams visualize a smarter way to organize tasks, prioritize work, and improve productivity.**

> **Portfolio project:** FocusFlow AI is an illustrative product concept. Its AI prioritization demo uses local heuristics rather than a live AI model. Testimonials, pricing, and product metrics are illustrative. The contact form is connected to a real Supabase PostgreSQL database.

## Overview

FocusFlow AI combines premium SaaS design with practical full-stack functionality. The project demonstrates how a modern marketing website can deliver an engaging user experience while securely collecting prospective customer inquiries.

### Features

- **Premium UI/UX:** A refined dark interface, modern typography, gradients, and carefully designed layouts.
- **Advanced animations:** Scroll-triggered transitions, interactive elements, and motion-enhanced product storytelling.
- **Responsive design:** Layouts optimized for desktop, tablet, and mobile screens.
- **Interactive product demo:** A simulated task-prioritization experience using local logic.
- **Real lead capture:** Contact form submissions are persisted in Supabase PostgreSQL.
- **Server-side validation:** Input validation and safe error handling through the contact API.
- **Database security:** Row Level Security (RLS), controlled database permissions, and server-side privileged operations.
- **Production deployment:** Built with Next.js and designed for deployment on Vercel.
- **Developer-friendly structure:** Reusable components, environment configuration, database migrations, and documented commands.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js App Router | Application framework and routing |
| React | Component-based user interface |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive layouts |
| Motion for React | UI animations |
| GSAP / ScrollTrigger | Scroll-based animation effects |
| Lucide React | Interface icons |
| Supabase | Backend services and PostgreSQL database |
| Vercel | Hosting and deployment |

## Project Structure

```text
FocusFlowAi/
├── app/                  # Pages, layouts, and API routes
├── components/           # Reusable UI components
├── lib/                  # Shared utilities and Supabase clients
├── public/                # Static assets
├── supabase/
│   └── migrations/        # Version-controlled database migrations
├── .env.example           # Environment variable template
├── .gitignore             # Git exclusions
├── package.json           # Scripts and dependencies
├── package-lock.json      # Dependency lockfile
└── README.md
```

The exact structure may evolve as the application grows.

## Getting Started

### Prerequisites

- Node.js compatible with the project's dependencies
- npm
- A Supabase project for database-backed functionality
- Git (optional, for cloning the repository)

### 1. Clone the repository

```bash
git clone https://github.com/Lastbenchphantom/FocusFlow-Ai.git
cd FocusFlow-Ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Fill in the values required by the application:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase anon/publishable key, if expected by the current client implementation |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only privileged key for lead insertion, if used by the current API implementation |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Contact endpoint rate-limit window; documented default is `60000` |
| `CONTACT_RATE_LIMIT_MAX` | Maximum requests per rate-limit window; documented default is `5` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for canonical metadata |

**Security:** Never commit `.env.local` or real credentials. Never expose a service-role or secret key in client-side code, a `NEXT_PUBLIC_` variable, or a public repository.

Use the exact variable names expected by the current source code. Supabase projects may use either the legacy anon key or the newer publishable key, depending on how the client is configured.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run automated tests |

Run only the scripts that exist in the current `package.json`.

## Database & Lead Capture

FocusFlow AI uses Supabase PostgreSQL to persist contact form submissions.

### Database migration

The existing project documents this migration:

```text
supabase/migrations/20261019060000_create_contact_leads.sql
```

It creates the `contact_leads` table with a UUID primary key, contact fields, a creation timestamp, validation constraints, indexes, and Row Level Security.

The contact API is documented at:

```text
POST /api/contact
```

The expected flow is:

1. A visitor submits the contact form.
2. The application validates the submitted data.
3. The server processes the request and attempts a database insert.
4. The visitor receives a success message only after a successful write.
5. Errors are handled without exposing privileged credentials.

### Applying migrations

After configuring the Supabase CLI and linking the intended project, review the migration before applying it.

```bash
npx supabase db push
```

Run this command only against the intended database. It applies pending local migrations; it is not a command to reset the database.

**Important:** Never disable RLS or grant unrestricted database access simply to make the form work.

## Deployment

The application is designed for deployment on Vercel.

General deployment workflow:

1. Push the project to GitHub.
2. Import the repository into Vercel or link it through the Vercel CLI.
3. Configure the required environment variables in the appropriate deployment environments.
4. Deploy the application.
5. Test the production website and submit a test contact form.
6. Confirm that the new record appears in the intended Supabase database.

Keep production secrets in Vercel's environment-variable settings rather than in Git.

## Security Considerations

- Keep privileged Supabase keys server-side.
- Validate form submissions on the server.
- Restrict database permissions according to the application's requirements.
- Keep local environment files and credentials out of Git.
- Review dependencies for known vulnerabilities.
- Never claim a contact submission succeeded unless the database write actually succeeded.

## Project Status

FocusFlow AI is a portfolio demonstration of modern SaaS interface design and full-stack integration.

The landing page, interactive demo, and lead capture illustrate different aspects of a production-style web application. The simulated AI experience is not a substitute for a connected AI service.

## License

This repository is a portfolio demonstration. No open-source license is specified unless a license file is added to the repository.

---

**Built with Next.js, React, Tailwind CSS, and Supabase.**

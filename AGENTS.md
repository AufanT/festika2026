# AGENTS.md — Festika UA 2026

## Project

Public-facing IT festival website (FESTIKA UA 2026) + admin dashboard.  
Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4 + shadcn/ui (radix-nova style).

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | `next dev` |
| `npm run build` | `prisma generate && next build` — **requires `DATABASE_URL` env** |
| `npm run start` | `next start` |
| `npm run lint` | `eslint` (flat config) |

## Must-Know

- **No Prisma at runtime.** The `prisma/schema.prisma` is only used for `prisma generate` (typegen). All actual DB queries go through `mysql2/promise` pool defined in `src/lib/mysql.ts` (singleton for HMR safety).
- **Auth:** NextAuth v5 beta.30 with Credentials provider + JWT sessions. Admin routes guarded by `src/middleware.ts` (redirects to `/admin/login` if unauthenticated; also redirects logged-in users away from login page).
- **Build requires env:** `.env` must exist (copy `.env.example`). Cloudinary creds are optional for dev but `DATABASE_URL` is required for `prisma generate`.
- **Image remote:** Only `res.cloudinary.com` is whitelisted in `next.config.ts`.
- **Standalone output:** `output: "standalone"` — produces a self-contained build for deployment.

## Architecture

- **Routes:** `(public)/` (Navbar + Footer layout), `(admin)/` (admin dashboard), `api/` (REST endpoints).
  - *Admin note:* `(admin)` is a route group (no URL impact) containing `admin/` which creates the `/admin` URL path. This lets `(admin)/admin/layout.tsx` serve as the admin layout without affecting URL structure.
- **Pattern:** Repository (`src/lib/repositories/`) → Service (`src/lib/services/`) → Route handlers (`src/app/api/*`). API responses use `ApiResponse` helper.
- **Image uploads:** `src/lib/cloudinary.ts` — server-side upload stream.
- **Validation:** Zod schemas in `src/lib/validations.ts`.
- **Alias:** `@/` → `./src/`.

## Scripts

One-off DB migrations live in `scripts/` — run via `npx tsx scripts/db-migrate.ts` (needs `.env` loaded).

## What's Missing

- No tests, no CI workflow.
- No OpenCode config (`opencode.json`).

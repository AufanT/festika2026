# AGENTS.md — Festika UA 2026

## Project

Public-facing IT festival website (FESTIKA UA 2026) + admin dashboard.  
Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4 + shadcn/ui (radix-nova style).

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | `next dev` |
| `npm run build` | `next build` |
| `npm run start` | `next start` |
| `npm run lint` | `eslint` (flat config) |

## Must-Know

- **Auth:** NextAuth v5 beta.30 with Credentials provider + JWT sessions. Admin routes guarded by `src/middleware.ts` (redirects to `/admin/login` if unauthenticated; also redirects logged-in users away from login page).
- **Build requires env:** `.env` must exist (copy `.env.example`). `DATABASE_URL` is required for DB queries.
- **Image remote:** Only `res.cloudinary.com` is whitelisted in `next.config.ts`.
- **Standalone output:** `output: "standalone"` — produces a self-contained build for deployment.

## Architecture

- **Routes:** `(public)/` (Navbar + Footer layout), `(admin)/` (admin dashboard), `api/` (REST endpoints).
  - *Admin note:* `(admin)` is a route group (no URL impact) containing `admin/` which creates the `/admin` URL path. This lets `(admin)/admin/layout.tsx` serve as the admin layout without affecting URL structure.
- **Pattern:** Repository (`src/lib/repositories/`) → Service (`src/lib/services/`) → Route handlers (`src/app/api/*`). API responses use `ApiResponse` helper.
- **Database:** Raw MySQL via `mysql2/promise` (`src/lib/mysql.ts`).
- **Image uploads:** `src/lib/cloudinary.ts` — server-side upload stream.
- **Validation:** Zod schemas in `src/lib/validations.ts`.
- **Alias:** `@/` → `./src/`.

## What's Missing

- No tests, no CI workflow.

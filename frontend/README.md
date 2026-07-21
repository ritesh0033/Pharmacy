# PharmaCare Frontend

The public pharmacy landing page and the `/admin` management panel, built with Next.js (App
Router) and Tailwind CSS.

## Prerequisites

- Node.js 18+
- The backend running (see `../backend/README.md`) — required for the site to show real data.

## Environment Variables

Create `.env.local` in this folder (already present in this repo for local dev):

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Point this at wherever the Django API is reachable — `http://127.0.0.1:8000/api` for a local
backend, or your deployed backend's URL if you deployed it.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page.

## Admin Panel

- URL: `http://localhost:3000/admin`
- Gated by login at `/admin/login` — log in with a Django staff user (see backend README for
  creating one).
- Manage products (rich-text description via Quill, required image upload, featured toggle),
  testimonials, and view/delete contact messages.

## Project Structure

```
frontend/src/
├── app/
│   ├── page.tsx              # Public landing page
│   └── admin/
│       ├── login/            # Login page (no sidebar)
│       └── (dashboard)/      # Dashboard, products, testimonials, messages (sidebar layout)
├── components/                # Public + admin/ (admin-only) components
├── lib/
│   ├── api.ts                 # Typed API client for all backend endpoints
│   ├── auth.ts                # Admin token cookie helpers
│   └── types.ts               # Shared TypeScript types
└── proxy.ts                    # Route guard: redirects unauthenticated /admin/* to /admin/login
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel, setting the **root directory** to `frontend`.
3. Add an environment variable in the Vercel project settings:
   `NEXT_PUBLIC_API_URL` = the public URL of your backend (e.g.
   `https://your-backend.onrender.com/api`).
4. Deploy. The admin panel is included automatically at `/admin` on the same deployment.

**Important:** if the backend is only run locally (not deployed), the live Vercel URL will not
be able to reach it — `NEXT_PUBLIC_API_URL` is baked in at build time and can't point at an
evaluator's own machine. In that case, plan to demo the live site's static shell plus a full
local run (`npm run dev` + local backend) for the working data flows, per the assignment's
"backend can be deployed or run locally" allowance.

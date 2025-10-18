# Midnight Magnolia — Website Info
_Updated Fonts:_ Cormorant Garamond · Merriweather · Poppins  
_Colors:_ #0A0F14 · #F6F4EF · #C19A33 · #8A9B6E · #56334E  

## Overview
The Midnight Magnolia platform blends a dark-mode React experience with a ritual-aware backend. Frontend, backend, and automation layers honor accessibility, security, and ease of maintenance.

## Frontend Stack
- **Framework:** Next.js (React 18) with app directory optional, server-side rendering for SEO and dynamic reflections.
- **Styling:** CSS variables (`src/styles/variables.css`), CSS Modules or styled-components as needed, prefers CSS logical properties for bidi support.
- **Fonts:** Google Fonts import for Cormorant Garamond, Merriweather, and Poppins, preloaded via `<link rel="preconnect">`.
- **Components:** Hero, Footer with mood-ring phases, ProductGrid, BlogCard, RecoveryWidget (affirmations + reflection form).
- **Accessibility:** Skip links, aria landmarks, focus-visible outlines in Southern Gold, motion reduced through `prefers-reduced-motion` query.

## Backend & API
- **Server:** Express (Node 18+) deployed on Vercel Edge Functions or Render.
- **Endpoints:**
  - `POST /api/reflections` — store daily reflections in MongoDB Atlas.
  - `GET /api/reflections` — paginate user entries with JWT auth.
  - `GET /api/affirmations` — deliver rotating affirmations fed by Make.com webhook.
- **Database:** MongoDB Atlas free tier, collections `reflections`, `affirmations`, `users`.
- **Auth:** Auth0 or Clerk for OAuth + passwordless email, fallback to Magic Links.
- **Environment Variables:** `.env.example` will include `MONGODB_URI`, `STRIPE_SECRET_KEY`, `WISE_API_KEY`, `MAKE_WEBHOOK_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

## Hosting & Deployment
- **Frontend Hosting:** Vercel (auto deploy from main branch, preview builds per PR).
- **Backend Hosting:** API routes within Next.js or standalone Express on Render/Heroku (if separate, align environment variables).
- **Static Assets:** Hosted via Next.js `/public` directory with optimized images. Use Next/Image for automatic lazy loading.
- **Deployment Ritual:**
  1. Run `npm run lint` and `npm run test`.
  2. Validate Lighthouse accessibility score ≥ 95.
  3. Merge into `main`; Vercel auto-deploys.
  4. Confirm Make.com webhooks update environment.

## Integrations
- **Stripe:** Subscription tiers, product catalog, webhook consumption via Express route.
- **Wise.com:** Payout automation for collaborators; store minimal data (recipient ID token).
- **Make.com:** Scenarios for daily affirmation rotation, Notion updates, Shopify sync.
- **Notion API:** Healing View dashboard sync, reflection archive duplication, KPI widgets.
- **Plausible Analytics:** Deployed with `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, respects DNT.

## Data & Privacy
- Encrypt sensitive env values, rotate keys quarterly.
- Use secure cookies (`SameSite=Lax`, `HttpOnly`).
- Provide privacy notice and terms referencing sobriety resources and data handling.
- Offer data export on request (JSON & CSV via Notion and MongoDB).

## Monitoring & Maintenance
- Automated tests for API routes (Jest + supertest) and React components (Testing Library).
- Uptime monitoring through UptimeRobot; alerts via Slack channel `#midnight-ops`.
- Monthly content audit: refresh affirmations, update blog, ensure automation logs clean.
- Quarterly security scan; review dependencies with `npm audit`.

## Local Development
1. Clone repo and install dependencies: `npm install`.
2. Duplicate `.env.example` to `.env.local` with valid keys.
3. Run `npm run dev` for Next.js, `npm run server` if using standalone Express.
4. Seed data via `src/data/affirmations.json` and `products.json`.
5. Access Notion templates through `notion/Healing_View_Dashboard.json`.

## Support & Escalation
- Document issues in Notion Kanban (Backlog → Ritualize → Ready → Blooming).
- Critical bugs: notify via SMS tree and disable new signups until resolved.
- Accessibility blockers prioritized above feature requests.

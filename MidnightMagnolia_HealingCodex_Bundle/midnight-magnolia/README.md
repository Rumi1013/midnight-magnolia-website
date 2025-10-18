# Midnight Magnolia — Healing Codex Starter

Rest-forward React Vite scaffold for the Midnight Magnolia ecosystem: dark-mode UI, ritual-focused components, and automation-ready integrations.

## Quick Start
- Install dependencies: `npm install`
- Run the dev server: `npm run dev`
- Visit `http://localhost:5173` and let the moonlit interface bloom.

## Project Rituals
- **Styling:** `src/styles/variables.css` defines the Midnight Magnolia palette and Google Fonts (Cormorant Garamond, Merriweather, Poppins, Cormorant SC). Global patterns live in `src/styles/base.css` with WCAG AA+ contrast, 70ch text width, and 1.8× line height.
- **Components:** Hero, ProductGrid, BlogList, Services, NewsletterForm, RecoveryWidget, Contact, and Footer compose the home experience (`src/App.jsx`).
- **Data:** Seed products in `src/data/products.json`, affirmations in `src/data/affirmations.json`. Replace or extend as you launch.
- **Integrations:** `src/integrations/commerce.js` fetches Shopify + Etsy listings when API keys are present. `src/notion.js` reads reflections from the Healing View database.
- **Docs:** Business, launch, brand, and website playbooks live in `/docs`.
- **Automation & Notion:** Importable assets are in `/automations/make_scenarios.json` and `/notion/Healing_View_Dashboard.json`.

## Environment Variables
Duplicate `.env.example` to `.env.local` and fill in:

```
VITE_SHOPIFY_STORE_DOMAIN=
VITE_SHOPIFY_STOREFRONT_TOKEN=
VITE_ETSY_API_KEY=
VITE_ETSY_SHOP_ID=
VITE_NEWSLETTER_WEBHOOK_URL=
VITE_CONTACT_WEBHOOK_URL=
VITE_NOTION_API_KEY=
VITE_NOTION_DB_REFLECTION=
VITE_WISE_API_KEY=
VITE_STRIPE_SECRET_KEY=
VITE_PLAUSIBLE_DOMAIN=
```

## Accessibility Promises
- Dyslexia-friendly line height (1.8×) and max width (70ch).
- Skip link, focus-visible outlines, and reduced-motion guardrails.
- Mood-ring footer animation limited to gentle (<3% luminance) shifts.

## Next Steps
- Scaffold additional pages (shop, blog, services, contact) or hook a router.
- Connect Express/MongoDB reflections endpoint and wire to RecoveryWidget submissions.
- Configure Make.com + Notion automations for daily affirmations and membership onboarding.

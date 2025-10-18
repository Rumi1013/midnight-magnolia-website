# Midnight Magnolia

A full-stack spiritual marketplace and creative platform with Southern Gothic aesthetic.

## Overview

Midnight Magnolia is a platform for spiritual creators to sell mystical products (tarot decks, journals, art) and access AI-powered creative tools. The site features three membership tiers with increasing access to AI tools and premium features.

## Project Structure

### Frontend (`client/`)
- **Framework**: React with Vite, TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query v5)
- **Forms**: React Hook Form with Zod validation

### Backend (`server/`)
- **Framework**: Express.js with TypeScript
- **Authentication**: Session-based with express-session and bcrypt
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage due to connection issues)
- **AI Integration**: OpenAI GPT-5 for journal generation, affirmations, and prompts
- **Payments**: Stripe for subscription management

### Design System

**Color Palette:**
- Midnight Blue: `hsl(213, 64%, 12%)` - Primary dark background
- Magnolia White: `hsl(40, 44%, 93%)` - Light text and accents
- Rich Gold: `hsl(43, 64%, 52%)` - Accent color and CTAs

**Typography:**
- Headings: Playfair Display (serif)
- Body: Lora (serif)
- Accents: Montserrat (sans-serif)

**Logo:** Magnolia and crescent moon imagery (`attached_assets/DD927ECB-BEA2-4D80-A9A5-22E371277B56_1760072655904.png`)

## Features

### Completed MVP Features
- [x] User authentication system (signup, login, logout, session management)
- [x] Public landing page with Southern Gothic branding
- [x] Product showcase pages for tarot, journals, and art
- [x] Creator dashboard with auth protection
- [x] AI-powered journal generation API endpoint (Creator/Mystic tiers only)
- [x] AI affirmation generator API endpoint (Creator/Mystic tiers only)
- [x] AI journal prompt generator (Creator/Mystic tiers only)
- [x] Membership tier display page
- [x] Stripe integration setup (API keys configured)
- [x] Notion API integration for content organization
- [x] Responsive design with gold hover effects
- [x] Complete route structure: landing, about, shop, tiers, signup, dashboard

### Membership Tiers

1. **Seeker (Free)**
   - Browse products
   - View content
   - Basic account features

2. **Creator ($29/month)**
   - All Seeker features
   - AI journal generation
   - AI affirmations
   - Journal prompts
   - Content upload to Notion
   - Creator dashboard access

3. **Mystic ($99/month)**
   - All Creator features
   - Advanced AI features (planned: tarot reading generator, creative writing assistant)
   - Premium content access
   - Enhanced analytics (planned)

## Known Issues & Technical Debt

### Database Connection Issues (Critical)
- PostgreSQL database is provisioned but experiencing authentication failures
- Error: "password authentication failed for user 'MidnightMagnolia_owner'"
- Attempted fixes:
  - Neon serverless driver (WebSocket connection issues)
  - Standard pg Pool with SSL (authentication failures)
  - Direct SQL execution (same authentication error)
- **Current workaround**: Using MemStorage (in-memory) for all data
- **Impact**: All data (users, products, journal entries) is lost on server restart
- **Files ready for database migration**:
  - `server/db.ts` - Database connection and initialization
  - `server/dbStorage.ts` - Database storage implementation
  - To activate: Uncomment database initialization in `server/index.ts` and switch storage in `server/storage.ts`

### Stripe Setup (Partial)
- API keys configured and working
- Subscription creation endpoint implemented
- **Missing**: 
  - Stripe Price IDs (need to create products in Stripe dashboard)
  - Webhook handlers for subscription status updates
  - Frontend checkout flow completion

### Planned Features (Next Phase)
- [ ] Complete Stripe checkout flow with subscription management
- [ ] Enhanced creator dashboard with analytics and content history
- [ ] Advanced AI features (tarot reading generator, creative writing assistant) for Mystic tier
- [ ] Member-only content portal with personalized experiences

## API Routes

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products

### AI Features (Requires Creator or Mystic tier)
- `POST /api/create-journal` - Generate AI journal entry
- `POST /api/affirmation` - Generate AI affirmation
- `POST /api/journal-prompt` - Generate journal prompt

### Journal Management
- `GET /api/journal-entries` - Get user's journal entries
- `POST /api/upload-content` - Upload content to Notion

### Stripe
- `POST /api/create-payment-intent` - Create payment intent
- `POST /api/create-subscription` - Create subscription

## Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string (currently not working)
- `SESSION_SECRET` - Express session secret
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `STRIPE_SECRET_KEY` - Stripe secret key
- `VITE_STRIPE_PUBLIC_KEY` - Stripe publishable key (frontend)

**Optional:**
- `STRIPE_CREATOR_PRICE_ID` - Stripe price ID for Creator tier
- `STRIPE_MYSTIC_PRICE_ID` - Stripe price ID for Mystic tier
- `NOTION_DATABASE_ID` - Notion database ID for content uploads

## Database Schema

### Users Table
- id (varchar, UUID primary key)
- email (text, unique)
- username (text, unique)
- password (text, hashed)
- firstName (text, nullable)
- lastName (text, nullable)
- role (text: 'seeker', 'creator', 'mystic')
- stripeCustomerId (text, nullable)
- stripeSubscriptionId (text, nullable)
- createdAt (timestamp)

### Journal Entries Table
- id (varchar, UUID primary key)
- userId (varchar, foreign key to users)
- title (text, nullable)
- content (text)
- prompt (text, nullable)
- type (text: 'journal', 'affirmation', 'prompt')
- metadata (jsonb)
- createdAt (timestamp)

### Products Table
- id (varchar, UUID primary key)
- name (text)
- description (text)
- price (integer, in cents)
- category (text: 'tarot', 'journal', 'art', 'oracle', 'crystal', 'ritual')
- imageUrl (text)
- featured (boolean)
- createdAt (timestamp)

## Sample Products (Currently in MemStorage)

1. **Midnight Tarot Deck** - $48.00 (Featured)
2. **Sacred Journal** - $32.00 (Featured)
3. **Magnolia Moon Print** - $65.00 (Featured)
4. **Botanical Oracle** - $42.00
5. **Moonlight Crystals** - $55.00
6. **Creator's Ritual Kit** - $88.00

## Development

**Start Development Server:**
```bash
npm run dev
```
Runs on port 5000 (Express serves both API and Vite frontend)

**Build for Production:**
```bash
npm run build
npm start
```

**Database Migrations** (when connection works):
```bash
npm run db:push
```

## Recent Changes (October 10, 2025)

### Morning Updates
- ✅ Logo integration complete (navigation and footer)
- ✅ All API keys configured (OpenAI, Stripe)
- ✅ Fixed Tailwind CSS opacity modifier errors
- ✅ Fixed all TypeScript/LSP errors
- ⚠️ Database connection issues - temporarily using MemStorage
- 📝 Database migration code ready but not active

### Afternoon Updates (Latest)
- ✅ Updated homepage hero with new tagline: "Rooted in mystery. Blooming in truth."
- ✅ Added Adobe Express moodboard embed section on homepage
- ✅ Updated footer with Rumi-Nations LLC info and social links (Instagram, Facebook, Patreon)
- ✅ Added new fonts: Cormorant Garamond, IBM Plex Serif, Poppins, Parisienne
- ✅ Enhanced color palette with additional brand colors
- ✅ Created Make.com automation integration with API endpoints
- ✅ Added admin panel for automation management (/admin route)
- ✅ Implemented webhook handlers for product, content, and backup automation

## User Preferences

- Southern Gothic aesthetic with mystical undertones
- Focus on creative healing and spiritual growth
- Premium, elegant design with gold accents
- Membership tier system with AI features for paid tiers

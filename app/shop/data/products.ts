export interface Product {
  id: number
  slug: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  comingSoon: boolean
  description: string
  longDescription: string
  features: string[]
  whatsIncluded: string[]
  tags: string[]
  shopifyProductId?: string
  shopifyVariantId?: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: "magnolia-reset-journal",
    name: "The Magnolia Reset Journal",
    category: "Journals & Planners",
    price: 47,
    originalPrice: 59,
    image: "/healing-journal-cover.png",
    images: ["/healing-journal-cover.png", "/magnolia-petal-1.png", "/magnolia-petal-2.png"],
    rating: 4.9,
    reviews: 124,
    comingSoon: false,
    description: "90-day healing journal with daily prompts that honor your pace and celebrate your progress.",
    longDescription: `
The Magnolia Reset Journal is more than a journal—it's a **90-day sanctuary** for your healing journey.

Designed specifically for trauma survivors, neurodivergent minds, and anyone rebuilding their life with gentleness, this journal rejects hustle culture's toxic positivity and instead offers **real, honest prompts** that honor exactly where you are.

## Why This Journal Is Different

- **No "manifest your best life" nonsense** — We start where you *actually are*, not where Instagram says you should be
- **Spoon theory integrated** — Every prompt offers a gentle option for low-energy days
- **ADHD-friendly design** — Color-coded sections, visual progress trackers, and zero overwhelming blank pages
- **Trauma-informed** — No forced gratitude lists, no "just think positive," no gaslighting your own experience

## What Makes It Healing

Each day includes:
- **Morning intention** (5 min or less)
- **Energy check-in** (high/medium/low + what you need)
- **One small win** (because you're doing better than you think)
- **Evening reflection** (optional, because rest matters more)

Every **7 days** includes a "Magnolia Moment"—a deeper reflection prompt that helps you see how far you've come.

Every **30 days** includes a "Root Check"—an assessment of what's working, what's not, and what needs to change.

## Perfect For:

- Trauma survivors navigating PTSD or C-PTSD
- ADHD/neurodivergent folks who need structure *with* flexibility
- Chronic illness warriors managing unpredictable energy
- Anyone rebuilding after burnout, career change, or major life transition
- People tired of journals that feel like homework

## What You Get:

- 90 days of guided prompts
- Weekly Magnolia Moments
- Monthly Root Check assessments  
- Bonus: Printable PDF version for digital journaling
- Lifetime access to journal template updates
    `,
    features: [
      "90 days of trauma-informed prompts",
      "Spoon theory energy tracking",
      "ADHD-friendly visual design",
      "Weekly + Monthly reflection pages",
      "Physical journal + Digital PDF",
      "Lifetime template updates",
    ],
    whatsIncluded: [
      'Hardcover bound journal (8.5" x 11")',
      "Ribbon bookmark",
      "Pocket folder for loose papers",
      "Downloadable PDF version",
      "Access to private journal community",
      "Welcome guide + Getting started video",
    ],
    tags: ["healing", "journal", "trauma-informed", "adhd", "neurodivergent", "bestseller"],
  },
  {
    id: 2,
    slug: "sacred-productivity-planner",
    name: "Sacred Productivity Planner",
    category: "Journals & Planners",
    price: 29,
    image: "/healing-journal-cover.png",
    images: ["/healing-journal-cover.png"],
    rating: 4.8,
    reviews: 86,
    comingSoon: false,
    description: "ADHD-friendly planner with gentle structure for chaotic minds with spoon theory integration.",
    longDescription: `
# Sacred Productivity Planner

Stop fighting your brain. Start working **with** it.

The Sacred Productivity Planner is designed for ADHD minds, chronic illness warriors, and anyone who's ever felt like they're "not doing enough" even when they're exhausted.

## What Makes It Sacred

- **Dopamine-friendly task menus** — Choose tasks based on energy + brain power
- **Visual time blocking** — Color-coded, not text-heavy
- **Spoon theory built in** — Every day starts with an energy assessment
- **Flexibility as default** — No shame for moving tasks, skipping days, or changing plans

## Digital Notion Template

This is a **fully customizable Notion template** that syncs across all your devices.

### What's Included:

- Daily dashboard with energy tracking
- Weekly review system
- Monthly goal setting (gentle version)
- Habit tracker that doesn't shame you
- Project management board (ADHD edition)
- Resource library with ADHD tips
    `,
    features: [
      "Notion template (all devices)",
      "Dopamine menu system",
      "Visual time blocking",
      "Spoon theory energy tracking",
      "Flexible scheduling",
      "Video tutorials included",
    ],
    whatsIncluded: [
      "Notion template (duplicate to your workspace)",
      "Setup video tutorial",
      "ADHD productivity guide (PDF)",
      "Monthly template updates",
      "Access to template community",
    ],
    tags: ["adhd", "productivity", "notion", "digital", "neurodivergent"],
  },
  {
    id: 3,
    slug: "digital-grimoire-automation-bundle",
    name: "The Digital Grimoire: Automation Bundle",
    category: "Digital Altars",
    price: 97,
    originalPrice: 147,
    image: "/images/logo-book.jpg",
    images: ["/images/logo-book.jpg"],
    rating: 4.9,
    reviews: 68,
    comingSoon: false,
    description: "Complete automation system: Notion databases + Make.com workflows + templates to run your business on autopilot (gently).",
    longDescription: `
# The Digital Grimoire: Automation Bundle

**What if your business could run while you rest?**

This isn't about grinding harder. It's about building systems that **protect your peace**.

## What You Get

### 1. Notion Business OS
- Client management system
- Product/service tracker
- Income/expense dashboard
- Project pipeline
- Content calendar
- Email templates library

### 2. Make.com Blueprints (10+ workflows)
- Auto-send payment reminders
- Sync calendar → Notion
- Email → Notion (inbox zero)
- Social media scheduler
- Client onboarding automation
- Invoice generation
- And more...

### 3. Integration Guides
- Shopify → Notion
- Stripe → Notion
- MailerLite → Notion
- Gmail → Notion
- Google Calendar → Notion

### 4. Video Tutorials
- Complete setup walkthrough
- Troubleshooting common issues
- Customization tutorials
- Monthly automation tips

## Who This Is For

- **Solopreneurs** drowning in admin tasks
- **ADHD business owners** who forget to invoice clients
- **Chronically ill entrepreneurs** who need systems that work when they can't
- **Digital product creators** who want passive income (for real)

## Investment

**$97** (Regular price: $147)

Lifetime access + all future updates.

*This system has saved me 15+ hours per week. It pays for itself in one client project.*
    `,
    features: [
      "Notion Business OS (full template)",
      "10+ Make.com automation blueprints",
      "Integration guides for 5+ platforms",
      "Video tutorial library",
      "Lifetime access + updates",
      "Private community access",
    ],
    whatsIncluded: [
      "Notion template (duplicate & customize)",
      "Make.com blueprints (JSON import)",
      "PDF setup guides",
      "Video tutorial library (10+ hours)",
      "Monthly automation tips",
      "1-on-1 setup support (optional add-on)",
    ],
    tags: ["automation", "notion", "make.com", "business", "digital-product", "bestseller"],
  },
  {
    id: 4,
    slug: "midnight-moon-mug",
    name: "Midnight Moon Mug",
    category: "Home Decor",
    price: 24,
    image: "/midnight-moon-mug.png",
    images: ["/midnight-moon-mug.png", "/elegant-moon-magnolia-mug.png"],
    rating: 4.7,
    reviews: 53,
    comingSoon: false,
    description: "Ceramic mug featuring phases of the moon, perfect for your morning ritual or evening tea.",
    longDescription: `
# Midnight Moon Mug

Your morning ritual deserves beauty.

This 15oz ceramic mug features hand-illustrated moon phases wrapping around its midnight blue body, with magnolia petals floating across the night sky.

## Details

- 15oz capacity
- Microwave safe
- Dishwasher safe (top rack)
- Lead-free ceramic
- Packaged in a gift-ready box

Perfect for coffee, tea, or hot chocolate. Also makes a beautiful pen/pencil holder for your desk.
    `,
    features: ["15oz capacity", "Moon phase design", "Magnolia accents", "Microwave & dishwasher safe", "Gift box included"],
    whatsIncluded: ["Ceramic mug (15oz)", "Gift-ready packaging", "Care instructions card"],
    tags: ["home-decor", "mug", "moon", "magnolia", "gift"],
    shopifyProductId: "gid://shopify/Product/8675309",
  },
  {
    id: 5,
    slug: "southern-gothic-pillow",
    name: "Southern Gothic Velvet Pillow",
    category: "Home Decor",
    price: 35,
    image: "/southern-gothic-pillow.png",
    images: ["/southern-gothic-pillow.png"],
    rating: 4.6,
    reviews: 42,
    comingSoon: false,
    description: "Velvet pillow with magnolia and moon phase embroidery for your sacred rest space.",
    longDescription: `
# Southern Gothic Velvet Pillow

Transform your space into a sanctuary.

This 18-inch x 18-inch velvet pillow features embroidered magnolia blooms intertwined with moon phases, creating a tapestry of Southern Gothic elegance.

## Details

- 18-inch x 18-inch square
- Midnight blue velvet front
- Linen back with hidden zipper
- Embroidered (not printed) design
- Removable cover (machine washable)
- Insert included

Perfect for your bed, reading nook, or meditation space.
    `,
    features: ['18" x 18" pillow', "Velvet + linen materials", "Embroidered design", "Removable cover", "Machine washable", "Insert included"],
    whatsIncluded: ["Velvet pillow cover", "Pillow insert", "Care instructions"],
    tags: ["home-decor", "pillow", "velvet", "southern-gothic", "embroidered"],
    shopifyProductId: "gid://shopify/Product/8675310",
  },
  {
    id: 6,
    slug: "magnolia-tote-bag",
    name: "Magnolia Tote Bag",
    category: "Apparel",
    price: 28,
    image: "/magnolia-tote-bag.png",
    images: ["/magnolia-tote-bag.png"],
    rating: 4.8,
    reviews: 37,
    comingSoon: false,
    description: "Canvas tote featuring our signature magnolia design, perfect for market trips or book hauls.",
    longDescription: `
# Magnolia Tote Bag

Carry your magic wherever you go.

Heavy-duty canvas tote featuring our signature magnolia logo in rich gold print on midnight blue canvas.

## Details

- 15-inch x 16-inch x 3-inch (perfect size)
- 100% cotton canvas (10oz weight)
- Reinforced handles
- Interior pocket
- Gold foil print (won't fade)

Holds up to 30lbs. Strong enough for groceries, books, or your entire life (we've been there).
    `,
    features: ["Heavy-duty 10oz canvas", "Gold foil print", "Reinforced handles", "Interior pocket", "Holds 30lbs", "Machine washable"],
    whatsIncluded: ["Canvas tote bag", "Care instructions"],
    tags: ["tote", "canvas", "apparel", "magnolia", "gift", "bestseller"],
    shopifyProductId: "gid://shopify/Product/8675311",
  },
]

export const categories = [
  "All Products",
  "Journals & Planners",
  "Digital Altars",
  "Ritual Tools",
  "Home Decor",
  "Pet Wellness",
  "Apparel",
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All Products") return products
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.tags.includes("bestseller"))
}


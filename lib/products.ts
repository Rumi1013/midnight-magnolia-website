// 🌙 Sacred Midnight Magnolia Product Catalog
export interface SacredProduct {
  id: string
  name: string
  description: string
  prices: Record<string, number>
  formats: string[]
  category: string
  tags: string[]
  inStock: boolean
  featured?: boolean
  externalLink?: string
  image?: string
}

export const midnightMagnoliaProducts = {
  healingJournals: [
    {
      id: "magnolia-reset-90",
      name: "The Magnolia Reset 90-Day Journal",
      description: "A sacred journey of transformation through ancestral wisdom and daily reflection",
      prices: { digital: 29, print: 47 },
      formats: ["digital-pdf", "print-softcover", "print-hardcover"],
      category: "healing-journals",
      tags: ["healing", "transformation", "ancestral-wisdom"],
      inStock: true,
      featured: true,
      image: "/healing-journal-cover.png",
    },
    {
      id: "midnight-tarot-deck",
      name: "Midnight Messages Tarot Deck",
      description: "Divination cards rooted in Southern Gothic wisdom and healing energy",
      prices: { digital: 19, print: 33 },
      formats: ["digital-printable", "print-cards"],
      category: "spiritual-tools",
      tags: ["tarot", "divination", "spiritual-guidance"],
      inStock: true,
      featured: true,
      image: "/mystical-cat-bandana.png",
    },
    {
      id: "sacred-productivity-adhd",
      name: "Sacred Productivity ADHD Planner",
      description: "Gentle planning system designed for neurodivergent entrepreneurs and healers",
      prices: { digital: 19, print: 29 },
      formats: ["digital-pdf", "print-spiral"],
      category: "productivity",
      tags: ["adhd", "planning", "neurodivergent"],
      inStock: true,
      featured: true,
      image: "/magnolia-tote-bag.png",
    },
  ],
  businessSuite: [
    {
      id: "digital-entrepreneur-kit",
      name: "Digital Entrepreneur's Starter Kit",
      description: "Complete foundation for building sacred business with authentic marketing",
      prices: { digital: 37 },
      formats: ["digital-bundle"],
      category: "business-tools",
      tags: ["entrepreneurship", "marketing", "business-strategy"],
      inStock: true,
      image: "/midnight-moon-mug.png",
    },
    {
      id: "brand-identity-workbook",
      name: "Brand Identity Workbook",
      description: "Discover your authentic brand voice and visual identity with soul-centered exercises",
      prices: { digital: 29 },
      formats: ["digital-pdf"],
      category: "branding",
      tags: ["branding", "identity", "authenticity"],
      inStock: true,
      image: "/elegant-moon-magnolia-mug.png",
    },
    {
      id: "notion-dashboard-templates",
      name: "Sacred Business Notion Templates",
      description: "Complete business management system with healing-centered workflows",
      prices: { digital: 49 },
      formats: ["notion-templates"],
      category: "productivity",
      tags: ["notion", "templates", "business-management"],
      inStock: true,
      image: "/southern-gothic-pillow.png",
    },
  ],
  kdpBooks: [
    {
      id: "magnolia-reset-book",
      name: "The Magnolia Reset - Paperback",
      description: "Physical book available through Amazon KDP",
      prices: { kdp: 24.99 },
      formats: ["kdp-paperback"],
      category: "books",
      externalLink: "https://amazon.com/dp/your-book-id",
      inStock: true,
      image: "/healing-journal-cover.png",
    },
    {
      id: "southern-gothic-poetry",
      name: "Southern Gothic Healing Poetry",
      description: "Collection of healing verses rooted in ancestral wisdom",
      prices: { kdp: 18.99 },
      formats: ["kdp-paperback"],
      category: "books",
      externalLink: "https://amazon.com/dp/your-book-id",
      inStock: true,
      image: "/magnolia-tote-bag.png",
    },
  ],
} as const

export const formatLabels: Record<string, string> = {
  "digital-pdf": "Digital PDF",
  "digital-printable": "Digital Printable",
  "digital-bundle": "Digital Bundle",
  "notion-templates": "Notion Templates",
  "print-softcover": "Print Softcover",
  "print-hardcover": "Print Hardcover",
  "print-spiral": "Print Spiral",
  "print-cards": "Print Cards",
  "kdp-paperback": "Amazon Paperback",
}

export function getAllProducts(): SacredProduct[] {
  return [
    ...midnightMagnoliaProducts.healingJournals,
    ...midnightMagnoliaProducts.businessSuite,
    ...midnightMagnoliaProducts.kdpBooks,
  ]
}

export function getProductById(id: string): SacredProduct | undefined {
  return getAllProducts().find((product) => product.id === id)
}

export function getProductsByCategory(category: string): SacredProduct[] {
  return getAllProducts().filter((product) => product.category === category)
}

export function getFeaturedProducts(): SacredProduct[] {
  return getAllProducts().filter((product) => product.featured)
}

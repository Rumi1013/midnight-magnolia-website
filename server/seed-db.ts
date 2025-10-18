import { db } from "./db";
import { products } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedDatabase() {
  try {
    console.log("Starting database seed...");

    // Check if products already exist
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length > 0) {
      console.log(`Database already has ${existingProducts.length} products. Skipping seed.`);
      return;
    }

    // Sample products for Midnight Magnolia
    const sampleProducts = [
      {
        name: "Midnight Tarot Deck",
        description: "78-card Southern Gothic tarot deck with hand-illustrated magnolia and moon imagery. Includes velvet storage pouch.",
        price: 4800, // $48.00
        category: "tarot",
        imageUrl: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        name: "Sacred Journal",
        description: "Premium leather-bound journal with gold-embossed magnolia. 200 pages of cream paper for your reflections.",
        price: 3200, // $32.00
        category: "journal",
        imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        name: "Magnolia Moon Print",
        description: "Limited edition 18x24\" giclée print on archival paper. Signed and numbered by the artist.",
        price: 6500, // $65.00
        category: "art",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        name: "Botanical Oracle",
        description: "44-card oracle deck featuring Southern botanicals and affirmations. Perfect for daily guidance.",
        price: 4200, // $42.00
        category: "oracle",
        imageUrl: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
      {
        name: "Moonlight Crystals",
        description: "Curated set of 7 healing crystals moon-charged and blessed. Includes guide and velvet pouch.",
        price: 5500, // $55.00
        category: "crystal",
        imageUrl: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
      {
        name: "Creator's Ritual Kit",
        description: "Complete ritual kit with candles, herbs, incense, and intention cards for creative manifestation.",
        price: 8800, // $88.00
        category: "ritual",
        imageUrl: "https://images.unsplash.com/photo-1540735240698-079472616409?auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
    ];

    // Insert products
    const insertedProducts = await db.insert(products).values(sampleProducts).returning();
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Display inserted products
    insertedProducts.forEach(product => {
      console.log(`- ${product.name}: $${(product.price / 100).toFixed(2)}`);
    });

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

// Run the seed
seedDatabase();
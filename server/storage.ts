import { type User, type InsertUser, type JournalEntry, type InsertJournalEntry, type Product } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  
  // Journal entries
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  getUserJournalEntries(userId: string): Promise<JournalEntry[]>;
  getJournalEntry(id: string): Promise<JournalEntry | undefined>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private journalEntries: Map<string, JournalEntry>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.journalEntries = new Map();
    this.products = new Map();
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: randomUUID(),
        name: "Midnight Tarot Deck",
        description: "78-card Southern Gothic tarot deck with hand-illustrated magnolia and moon imagery. Includes velvet storage pouch.",
        price: 4800, // $48.00
        category: "tarot",
        imageUrl: "https://pixabay.com/get/gd63d938761e38963912c9cc0dc87df805c991a2a2e8e08ce4b7f35ad055ddc016e3f44c5b0d20d1a999b0cc73e09261165815cc8858cc626dbd01cad86b3df2d_1280.jpg",
        featured: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Sacred Journal",
        description: "Premium leather-bound journal with gold-embossed magnolia. 200 pages of cream paper for your reflections.",
        price: 3200, // $32.00
        category: "journal",
        imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&h=600",
        featured: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Magnolia Moon Print",
        description: "Limited edition 18x24\" giclée print on archival paper. Signed and numbered by the artist.",
        price: 6500, // $65.00
        category: "art",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&h=600",
        featured: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Botanical Oracle",
        description: "44-card oracle deck featuring Southern botanicals and affirmations. Perfect for daily guidance.",
        price: 4200, // $42.00
        category: "oracle",
        imageUrl: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&w=800&h=600",
        featured: false,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Moonlight Crystals",
        description: "Curated set of 7 healing crystals moon-charged and blessed. Includes guide and velvet pouch.",
        price: 5500, // $55.00
        category: "crystal",
        imageUrl: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?auto=format&fit=crop&w=800&h=600",
        featured: false,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Creator's Ritual Kit",
        description: "Complete ritual kit with candles, herbs, incense, and intention cards for creative manifestation.",
        price: 8800, // $88.00
        category: "ritual",
        imageUrl: "https://pixabay.com/get/g225f659dc14d9799718deeff3a726066d842511f21bdfcfd2763acdccc48cbec588c6183439938245a76bef10139f4e66b3120e0e28c4e3087b862c86fd5fefa_1280.jpg",
        featured: false,
        createdAt: new Date(),
      },
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      email: insertUser.email,
      username: insertUser.username,
      password: insertUser.password,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      role: insertUser.role || 'seeker',
      id,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser: User = {
      ...user,
      stripeCustomerId,
      stripeSubscriptionId,
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const id = randomUUID();
    const entry: JournalEntry = {
      id,
      userId: insertEntry.userId,
      title: insertEntry.title || null,
      content: insertEntry.content,
      prompt: insertEntry.prompt || null,
      type: insertEntry.type || 'journal',
      metadata: insertEntry.metadata || null,
      createdAt: new Date(),
    };
    this.journalEntries.set(id, entry);
    return entry;
  }

  async getUserJournalEntries(userId: string): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getJournalEntry(id: string): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.featured)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
}

// TODO: Fix database connection issue then switch to DbStorage
// import { DbStorage } from "./dbStorage";
// export const storage = new DbStorage();

export const storage = new MemStorage();

import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import { users, journalEntries, products } from "@shared/schema";
import type { User, InsertUser, JournalEntry, InsertJournalEntry, Product } from "@shared/schema";
import type { IStorage } from "./storage";

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const result = await db
      .update(users)
      .set({ 
        stripeCustomerId, 
        stripeSubscriptionId 
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!result[0]) {
      throw new Error("User not found");
    }
    
    return result[0];
  }

  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const result = await db.insert(journalEntries).values(insertEntry).returning();
    return result[0];
  }

  async getUserJournalEntries(userId: string): Promise<JournalEntry[]> {
    return db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId))
      .orderBy(desc(journalEntries.createdAt));
  }

  async getJournalEntry(id: string): Promise<JournalEntry | undefined> {
    const result = await db.select().from(journalEntries).where(eq(journalEntries.id, id)).limit(1);
    return result[0];
  }

  async getProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.featured, true)).orderBy(desc(products.createdAt));
  }
}

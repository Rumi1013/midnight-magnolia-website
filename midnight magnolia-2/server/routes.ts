import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import Stripe from "stripe";
import { storage } from "./storage";
import { getUncachableNotionClient } from "./notionClient";
import { insertUserSchema, insertJournalEntrySchema } from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import MemoryStore from "memorystore";

// Extend session type to include userId
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

// Initialize OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

// Initialize Stripe (optional for development)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
    })
  : null;

// Session configuration
const MemoryStoreSession = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    cookie: {
      secure: false, // set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  // Auth helper
  function requireAuth(req: any, res: any, next: any) {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  }

  // Authentication Routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Set session
      req.session.userId = user.id;
      
      res.json({ user: { id: user.id, email: user.email, username: user.username, role: user.role } });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;
      
      res.json({ user: { id: user.id, email: user.email, username: user.username, role: user.role } });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: { id: user.id, email: user.email, username: user.username, role: user.role } });
  });

  // Products Routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // AI-Powered Journal Generation
  app.post("/api/create-journal", requireAuth, async (req, res) => {
    try {
      const { intention } = req.body;
      const user = await storage.getUser(req.session.userId!);
      
      if (!user || (user.role === 'seeker')) {
        return res.status(403).json({ message: "Creator or Mystic membership required" });
      }

      const prompt = `You are a wise spiritual guide helping a creative soul explore their inner world. 
      Based on this intention: "${intention}"
      
      Create a thoughtful, reflective journal entry that:
      1. Acknowledges their current state with compassion
      2. Offers gentle guidance and perspective
      3. Includes reflective questions to deepen their practice
      4. Maintains a Southern Gothic elegance and mystical tone
      5. Focuses on creative healing and transformation
      
      Respond with JSON in this format: { "title": "title", "content": "journal content" }`;

      const response = await openai.chat.completions.create({
        model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 8192,
      });

      const journalData = JSON.parse(response.choices[0].message.content || "{}");
      
      // Save to storage
      const entry = await storage.createJournalEntry({
        userId: user.id,
        title: journalData.title,
        content: journalData.content,
        prompt: intention,
        type: "journal",
        metadata: { generatedByAI: true },
      });

      res.json(entry);
    } catch (error: any) {
      res.status(500).json({ message: "Error generating journal entry: " + error.message });
    }
  });

  // AI Affirmation Generator
  app.post("/api/affirmation", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      
      if (!user || (user.role === 'seeker')) {
        return res.status(403).json({ message: "Creator or Mystic membership required" });
      }

      const prompt = `Create a powerful, personalized affirmation for a creative soul. 
      The affirmation should:
      1. Be empowering and healing
      2. Focus on creative confidence and spiritual growth
      3. Have a mystical, Southern Gothic elegance
      4. Be suitable for daily practice
      
      Respond with JSON in this format: { "affirmation": "your beautiful affirmation" }`;

      const response = await openai.chat.completions.create({
        model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 2048,
      });

      const affirmationData = JSON.parse(response.choices[0].message.content || "{}");
      
      // Save to storage
      const entry = await storage.createJournalEntry({
        userId: user.id,
        title: "Daily Affirmation",
        content: affirmationData.affirmation,
        type: "affirmation",
        metadata: { generatedByAI: true },
      });

      res.json({ affirmation: affirmationData.affirmation, id: entry.id });
    } catch (error: any) {
      res.status(500).json({ message: "Error generating affirmation: " + error.message });
    }
  });

  // Journal Prompt Generator
  app.post("/api/journal-prompt", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      
      if (!user || (user.role === 'seeker')) {
        return res.status(403).json({ message: "Creator or Mystic membership required" });
      }

      const prompt = `Create a thought-provoking journal prompt for a spiritual creator. 
      The prompt should:
      1. Inspire deep self-reflection
      2. Connect to creativity and spiritual practice
      3. Be open-ended and contemplative
      4. Have mystical undertones
      
      Respond with JSON in this format: { "prompt": "your inspiring prompt" }`;

      const response = await openai.chat.completions.create({
        model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 2048,
      });

      const promptData = JSON.parse(response.choices[0].message.content || "{}");

      res.json({ prompt: promptData.prompt });
    } catch (error: any) {
      res.status(500).json({ message: "Error generating prompt: " + error.message });
    }
  });

  // Save Content to Notion
  app.post("/api/upload-content", requireAuth, async (req, res) => {
    try {
      const { entryId } = req.body;
      const user = await storage.getUser(req.session.userId!);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const entry = await storage.getJournalEntry(entryId);
      if (!entry || entry.userId !== user.id) {
        return res.status(404).json({ message: "Journal entry not found" });
      }

      try {
        const notion = await getUncachableNotionClient();
        
        // Create a page in Notion (you'll need to configure a database ID)
        const response = await notion.pages.create({
          parent: {
            type: "database_id",
            database_id: process.env.NOTION_DATABASE_ID || "your-database-id",
          },
          properties: {
            Title: {
              title: [
                {
                  text: {
                    content: entry.title || "Untitled Entry",
                  },
                },
              ],
            },
            Type: {
              select: {
                name: entry.type,
              },
            },
            Created: {
              date: {
                start: entry.createdAt?.toISOString() || new Date().toISOString(),
              },
            },
          },
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: entry.content,
                    },
                  },
                ],
              },
            },
          ],
        });

        res.json({ success: true, notionPageId: response.id });
      } catch (notionError: any) {
        // If Notion fails, still return success but note the issue
        res.json({ 
          success: true, 
          message: "Content saved locally. Notion sync unavailable.",
          notionError: notionError?.message || "Unknown error"
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error uploading content: " + error.message });
    }
  });

  // User Journal Entries
  app.get("/api/journal-entries", requireAuth, async (req, res) => {
    try {
      const entries = await storage.getUserJournalEntries(req.session.userId!);
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe Routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ message: "Payment service not configured" });
      }
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  app.post('/api/create-subscription', requireAuth, async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ message: "Payment service not configured" });
      }
      const { tier } = req.body; // creator, mystic
      let user = await storage.getUser(req.session.userId!);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        return res.json({
          subscriptionId: subscription.id,
          clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        });
      }

      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.username,
        });
        customerId = customer.id;
      }

      // Determine price based on tier
      const priceMap = {
        creator: process.env.STRIPE_CREATOR_PRICE_ID || "price_creator",
        mystic: process.env.STRIPE_MYSTIC_PRICE_ID || "price_mystic",
      };

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceMap[tier as keyof typeof priceMap],
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with Stripe info
      user = await storage.updateUserStripeInfo(user.id, customerId, subscription.id);

      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Automation routes (protected with API key)
  app.post("/api/automations/product", async (req, res) => {
    // Import automation handlers dynamically to avoid circular dependencies
    const { verifyAutomationKey, handleProductAutomation } = await import("./automations");
    verifyAutomationKey(req, res, () => handleProductAutomation(req, res));
  });

  app.post("/api/automations/content", async (req, res) => {
    const { verifyAutomationKey, handleContentAutomation } = await import("./automations");
    verifyAutomationKey(req, res, () => handleContentAutomation(req, res));
  });

  app.post("/api/automations/backup", async (req, res) => {
    const { verifyAutomationKey, handleBackupAutomation } = await import("./automations");
    verifyAutomationKey(req, res, () => handleBackupAutomation(req, res));
  });

  // Generic webhook receiver (can be used by external services)
  app.post("/api/webhooks/incoming", async (req, res) => {
    const { handleIncomingWebhook } = await import("./automations");
    handleIncomingWebhook(req, res);
  });

  // Automation status endpoint (public)
  app.get("/api/automations/status", (req, res) => {
    res.json({
      status: "active",
      endpoints: {
        product: "/api/automations/product",
        content: "/api/automations/content",
        backup: "/api/automations/backup",
        webhook: "/api/webhooks/incoming"
      },
      timestamp: new Date().toISOString()
    });
  });

  // API key endpoint for admin panel (requires auth)
  app.get("/api/automations/api-key", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      
      // Only allow admin users to fetch the API key
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const apiKey = process.env.AUTOMATION_API_KEY || process.env.SESSION_SECRET;
      res.json({ apiKey });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

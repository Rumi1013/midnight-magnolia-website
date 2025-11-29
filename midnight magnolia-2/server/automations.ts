import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Middleware to verify API key for automation endpoints
export function verifyAutomationKey(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const expectedKey = process.env.AUTOMATION_API_KEY || process.env.SESSION_SECRET;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized - Missing API key" });
  }
  
  const providedKey = authHeader.slice(7); // Remove "Bearer " prefix
  
  if (providedKey !== expectedKey) {
    return res.status(401).json({ error: "Unauthorized - Invalid API key" });
  }
  
  next();
}

// Product automation schema
const productAutomationSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  imageUrl: z.string().optional(),
  action: z.enum(["create", "update", "sync"]).optional().default("sync"),
  productId: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

// Content automation schema
const contentAutomationSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: z.enum(["journal", "affirmation", "prompt", "article"]).optional().default("article"),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  publishDate: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

// Backup automation schema
const backupAutomationSchema = z.object({
  at: z.string().optional(),
  type: z.enum(["full", "incremental", "users", "content"]).optional().default("full"),
  notify: z.boolean().optional().default(true)
});

// Product automation handler
export async function handleProductAutomation(req: Request, res: Response) {
  try {
    const payload = productAutomationSchema.parse(req.body);
    
    // Log the automation request
    console.log("Product automation triggered:", {
      action: payload.action,
      title: payload.title,
      timestamp: new Date().toISOString()
    });
    
    // Trigger Make.com webhook if configured
    const productWebhookUrl = process.env.MAKE_WEBHOOK_PRODUCT;
    if (productWebhookUrl) {
      try {
        const webhookResponse = await fetch(productWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'midnight-magnolia',
            timestamp: new Date().toISOString(),
            data: payload
          })
        });
        
        if (!webhookResponse.ok) {
          console.error("Failed to trigger product webhook:", webhookResponse.status);
        }
      } catch (error) {
        console.error("Error triggering product webhook:", error);
      }
    }
    
    // TODO: Implement actual product handling logic
    // For now, just acknowledge the request
    res.json({
      success: true,
      message: "Product automation processed",
      data: {
        action: payload.action,
        title: payload.title,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid product payload",
        details: error.errors
      });
    }
    console.error("Product automation error:", error);
    res.status(500).json({ error: "Product automation failed" });
  }
}

// Content automation handler
export async function handleContentAutomation(req: Request, res: Response) {
  try {
    const payload = contentAutomationSchema.parse(req.body);
    
    // Log the automation request
    console.log("Content automation triggered:", {
      type: payload.type,
      title: payload.title,
      timestamp: new Date().toISOString()
    });
    
    // Trigger Make.com webhook if configured
    const contentWebhookUrl = process.env.MAKE_WEBHOOK_CONTENT;
    if (contentWebhookUrl) {
      try {
        const webhookResponse = await fetch(contentWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'midnight-magnolia',
            timestamp: new Date().toISOString(),
            data: payload
          })
        });
        
        if (!webhookResponse.ok) {
          console.error("Failed to trigger content webhook:", webhookResponse.status);
        }
      } catch (error) {
        console.error("Error triggering content webhook:", error);
      }
    }
    
    // TODO: Implement actual content handling logic
    // For now, just acknowledge the request
    res.json({
      success: true,
      message: "Content automation processed",
      data: {
        type: payload.type,
        title: payload.title,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid content payload",
        details: error.errors
      });
    }
    console.error("Content automation error:", error);
    res.status(500).json({ error: "Content automation failed" });
  }
}

// Backup automation handler
export async function handleBackupAutomation(req: Request, res: Response) {
  try {
    const payload = backupAutomationSchema.parse(req.body);
    
    // Log the automation request
    console.log("Backup automation triggered:", {
      type: payload.type,
      at: payload.at || new Date().toISOString(),
      notify: payload.notify
    });
    
    // Trigger Make.com webhook if configured
    const backupWebhookUrl = process.env.MAKE_WEBHOOK_BACKUP;
    if (backupWebhookUrl) {
      try {
        const webhookResponse = await fetch(backupWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'midnight-magnolia',
            timestamp: payload.at || new Date().toISOString(),
            type: payload.type,
            status: 'initiated'
          })
        });
        
        if (!webhookResponse.ok) {
          console.error("Failed to trigger backup webhook:", webhookResponse.status);
        }
      } catch (error) {
        console.error("Error triggering backup webhook:", error);
      }
    }
    
    // TODO: Implement actual backup logic
    // For now, just acknowledge the request
    res.json({
      success: true,
      message: "Backup automation initiated",
      data: {
        type: payload.type,
        timestamp: payload.at || new Date().toISOString(),
        status: "initiated"
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid backup payload",
        details: error.errors
      });
    }
    console.error("Backup automation error:", error);
    res.status(500).json({ error: "Backup automation failed" });
  }
}

// Webhook receiver for external services
export async function handleIncomingWebhook(req: Request, res: Response) {
  try {
    // Log incoming webhook
    console.log("Incoming webhook received:", {
      headers: req.headers,
      body: req.body,
      timestamp: new Date().toISOString()
    });
    
    // Basic validation
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: "Invalid webhook payload" });
    }
    
    // Determine webhook type based on headers or body
    const webhookType = req.headers['x-webhook-type'] || req.body.type || 'unknown';
    
    switch (webhookType) {
      case 'product':
        return handleProductAutomation(req, res);
      case 'content':
        return handleContentAutomation(req, res);
      case 'backup':
        return handleBackupAutomation(req, res);
      default:
        // Process generic webhook
        res.json({
          success: true,
          message: "Webhook received",
          type: webhookType,
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
import { WebhookQueue, type WebhookJob } from "./webhook-queue"
import { ShopifyDatabase } from "./database"

export class WebhookProcessor {
  private static isProcessing = false
  private static processingInterval: NodeJS.Timeout | null = null

  // Start the webhook processor
  static start(): void {
    if (this.processingInterval) {
      console.log("Webhook processor already running")
      return
    }

    try {
      console.log("Starting webhook processor...")
      this.processingInterval = setInterval(() => {
        this.processQueue().catch((err) => {
          console.error("Error in webhook processing interval:", err)
        })
      }, 5000) // Process every 5 seconds

      // Also process immediately
      this.processQueue().catch((err) => {
        console.error("Error in initial webhook processing:", err)
      })
    } catch (error) {
      console.error("Failed to start webhook processor:", error)
    }
  }

  // Stop the webhook processor
  static stop(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval)
      this.processingInterval = null
      console.log("Webhook processor stopped")
    }
  }

  // Process the webhook queue
  private static async processQueue(): Promise<void> {
    if (this.isProcessing) {
      return // Prevent concurrent processing
    }

    this.isProcessing = true

    try {
      let job = await WebhookQueue.dequeue().catch((err) => {
        console.error("Error dequeuing webhook job:", err)
        return null
      })

      while (job) {
        try {
          await this.processJob(job)
        } catch (error) {
          console.error(`Error processing job ${job.id}:`, error)
        }

        job = await WebhookQueue.dequeue().catch((err) => {
          console.error("Error dequeuing next webhook job:", err)
          return null
        })
      }
    } catch (error) {
      console.error("Error processing webhook queue:", error)
    } finally {
      this.isProcessing = false
    }
  }

  // Process a single webhook job
  private static async processJob(job: WebhookJob): Promise<void> {
    console.log(`Processing webhook job ${job.id}: ${job.webhookTopic}`)

    try {
      switch (job.webhookTopic) {
        case "orders/create":
          await this.processOrderCreate(job.payload)
          break
        case "orders/updated":
          await this.processOrderUpdate(job.payload)
          break
        case "products/create":
          await this.processProductCreate(job.payload)
          break
        case "products/update":
          await this.processProductUpdate(job.payload)
          break
        case "inventory_levels/update":
          await this.processInventoryUpdate(job.payload)
          break
        case "customers/create":
          await this.processCustomerCreate(job.payload)
          break
        default:
          throw new Error(`Unknown webhook topic: ${job.webhookTopic}`)
      }

      await WebhookQueue.markCompleted(job.id!)
      console.log(`Webhook job ${job.id} completed successfully`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error(`Webhook job ${job.id} failed:`, errorMessage)
      await WebhookQueue.markFailed(job.id!, errorMessage)
    }
  }

  // Process order creation
  private static async processOrderCreate(orderData: any): Promise<void> {
    // Find or create customer
    let customer = null
    if (orderData.customer) {
      customer = await ShopifyDatabase.createCustomer({
        shopifyCustomerId: orderData.customer.id.toString(),
        email: orderData.customer.email,
        firstName: orderData.customer.first_name,
        lastName: orderData.customer.last_name,
        phone: orderData.customer.phone,
        acceptsMarketing: orderData.customer.accepts_marketing || false,
        totalSpent: Number.parseFloat(orderData.customer.total_spent || "0"),
        ordersCount: orderData.customer.orders_count || 0,
        tags: orderData.customer.tags?.split(",").map((tag: string) => tag.trim()) || [],
        createdAt: new Date(orderData.customer.created_at),
        updatedAt: new Date(),
      })
    }

    // Create order record
    await ShopifyDatabase.createOrder({
      shopifyOrderId: orderData.id.toString(),
      orderNumber: orderData.name,
      customerId: customer?.id,
      customerEmail: orderData.email,
      customerName: `${orderData.customer?.first_name || ""} ${orderData.customer?.last_name || ""}`.trim(),
      totalPrice: Number.parseFloat(orderData.total_price),
      currency: orderData.currency,
      financialStatus: orderData.financial_status,
      fulfillmentStatus: orderData.fulfillment_status,
      shippingAddress: orderData.shipping_address,
      billingAddress: orderData.billing_address,
      createdAt: new Date(orderData.created_at),
      updatedAt: new Date(),
    })

    // Send notifications
    await this.sendOrderNotification(orderData)
  }

  // Process order update
  private static async processOrderUpdate(orderData: any): Promise<void> {
    await ShopifyDatabase.updateOrderStatus(
      orderData.id.toString(),
      orderData.financial_status,
      orderData.fulfillment_status,
    )

    // Send notification for significant status changes
    if (orderData.financial_status === "paid" || orderData.fulfillment_status === "fulfilled") {
      await this.sendStatusUpdateNotification(orderData)
    }
  }

  // Process product creation
  private static async processProductCreate(productData: any): Promise<void> {
    await ShopifyDatabase.createProduct({
      shopifyProductId: productData.id.toString(),
      title: productData.title,
      handle: productData.handle,
      description: productData.body_html,
      productType: productData.product_type,
      vendor: productData.vendor,
      status: productData.status,
      tags: productData.tags?.split(",").map((tag: string) => tag.trim()) || [],
      createdAt: new Date(productData.created_at),
      updatedAt: new Date(),
    })

    await this.sendNewProductNotification(productData)
  }

  // Process product update
  private static async processProductUpdate(productData: any): Promise<void> {
    await ShopifyDatabase.createProduct({
      shopifyProductId: productData.id.toString(),
      title: productData.title,
      handle: productData.handle,
      description: productData.body_html,
      productType: productData.product_type,
      vendor: productData.vendor,
      status: productData.status,
      tags: productData.tags?.split(",").map((tag: string) => tag.trim()) || [],
      createdAt: new Date(productData.created_at),
      updatedAt: new Date(),
    })
  }

  // Process inventory update
  private static async processInventoryUpdate(inventoryData: any): Promise<void> {
    await ShopifyDatabase.updateInventoryLevel(
      inventoryData.inventory_item_id.toString(),
      inventoryData.location_id.toString(),
      inventoryData.available,
    )

    // Check for low stock alerts
    if (inventoryData.available <= 5) {
      await this.sendLowStockAlert(inventoryData)
    }
  }

  // Process customer creation
  private static async processCustomerCreate(customerData: any): Promise<void> {
    await ShopifyDatabase.createCustomer({
      shopifyCustomerId: customerData.id.toString(),
      email: customerData.email,
      firstName: customerData.first_name,
      lastName: customerData.last_name,
      phone: customerData.phone,
      acceptsMarketing: customerData.accepts_marketing || false,
      totalSpent: Number.parseFloat(customerData.total_spent || "0"),
      ordersCount: customerData.orders_count || 0,
      tags: customerData.tags?.split(",").map((tag: string) => tag.trim()) || [],
      createdAt: new Date(customerData.created_at),
      updatedAt: new Date(),
    })

    await this.sendNewCustomerNotification(customerData)
  }

  // Notification methods
  private static async sendOrderNotification(orderData: any): Promise<void> {
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_order",
          order: {
            id: orderData.id,
            number: orderData.name,
            customer: orderData.email,
            total: orderData.total_price,
            items: orderData.line_items?.length || 0,
          },
        }),
      })
    }
  }

  private static async sendStatusUpdateNotification(orderData: any): Promise<void> {
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order_status_update",
          order: {
            id: orderData.id,
            number: orderData.name,
            customer: orderData.email,
            financialStatus: orderData.financial_status,
            fulfillmentStatus: orderData.fulfillment_status,
          },
        }),
      })
    }
  }

  private static async sendNewProductNotification(productData: any): Promise<void> {
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_product",
          product: {
            id: productData.id,
            title: productData.title,
            handle: productData.handle,
            status: productData.status,
          },
        }),
      })
    }
  }

  private static async sendLowStockAlert(inventoryData: any): Promise<void> {
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "low_stock_alert",
          inventory: {
            inventoryItemId: inventoryData.inventory_item_id,
            locationId: inventoryData.location_id,
            available: inventoryData.available,
          },
        }),
      })
    }
  }

  private static async sendNewCustomerNotification(customerData: any): Promise<void> {
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_customer",
          customer: {
            id: customerData.id,
            email: customerData.email,
            name: `${customerData.first_name} ${customerData.last_name}`,
            acceptsMarketing: customerData.accepts_marketing,
          },
        }),
      })
    }
  }
}

import { WebhookQueue, type WebhookJob } from "./webhook-queue"
import { ShopifyDatabase } from "./database"

export class WebhookProcessor {
  private static isRunning = false
  private static intervalId: NodeJS.Timeout | null = null

  static start(intervalMs = 5000) {
    if (this.isRunning) {
      console.log("Webhook processor is already running")
      return
    }

    this.isRunning = true
    console.log("Starting webhook processor...")

    this.intervalId = setInterval(async () => {
      await this.processNextJob()
    }, intervalMs)
  }

  static stop() {
    if (!this.isRunning) {
      console.log("Webhook processor is not running")
      return
    }

    this.isRunning = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    console.log("Webhook processor stopped")
  }

  private static async processNextJob() {
    try {
      const job = await WebhookQueue.dequeue()
      if (!job) return

      console.log(`Processing webhook job: ${job.id} (${job.topic})`)

      try {
        await this.processJob(job)
        await WebhookQueue.markCompleted(job.id)
        console.log(`Completed webhook job: ${job.id}`)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error(`Failed to process webhook job ${job.id}:`, errorMessage)

        if (job.retry_count < job.max_retries) {
          await WebhookQueue.retryJob(job.id)
          console.log(`Retrying webhook job: ${job.id} (attempt ${job.retry_count + 1})`)
        } else {
          await WebhookQueue.markFailed(job.id, errorMessage)
          console.log(`Max retries reached for webhook job: ${job.id}`)
        }
      }
    } catch (error) {
      console.error("Error in webhook processor:", error)
    }
  }

  private static async processJob(job: WebhookJob) {
    const { topic, payload } = job

    switch (topic) {
      case "orders/create":
        await this.processOrderCreate(payload)
        break
      case "orders/updated":
        await this.processOrderUpdate(payload)
        break
      case "products/create":
        await this.processProductCreate(payload)
        break
      case "products/update":
        await this.processProductUpdate(payload)
        break
      case "inventory_levels/update":
        await this.processInventoryUpdate(payload)
        break
      default:
        console.log(`Unknown webhook topic: ${topic}`)
    }
  }

  private static async processOrderCreate(orderData: any) {
    // Process new order
    console.log("Processing new order:", orderData.id)

    // Log to database
    await ShopifyDatabase.logWebhook({
      webhookTopic: "orders/create",
      shopifyId: orderData.id.toString(),
      status: "success",
      payload: orderData,
      retryCount: 0,
    })
  }

  private static async processOrderUpdate(orderData: any) {
    // Process order update
    console.log("Processing order update:", orderData.id)

    // Log to database
    await ShopifyDatabase.logWebhook({
      webhookTopic: "orders/updated",
      shopifyId: orderData.id.toString(),
      status: "success",
      payload: orderData,
      retryCount: 0,
    })
  }

  private static async processProductCreate(productData: any) {
    // Process new product
    console.log("Processing new product:", productData.id)

    await ShopifyDatabase.createProduct({
      shopifyProductId: productData.id.toString(),
      title: productData.title,
      handle: productData.handle,
      description: productData.body_html || "",
      productType: productData.product_type || "",
      vendor: productData.vendor || "",
      status: productData.status,
      tags: productData.tags?.split(",").map((tag: string) => tag.trim()) || [],
      createdAt: new Date(productData.created_at),
      updatedAt: new Date(),
    })
  }

  private static async processProductUpdate(productData: any) {
    // Process product update
    console.log("Processing product update:", productData.id)

    // Log to database
    await ShopifyDatabase.logWebhook({
      webhookTopic: "products/update",
      shopifyId: productData.id.toString(),
      status: "success",
      payload: productData,
      retryCount: 0,
    })
  }

  private static async processInventoryUpdate(inventoryData: any) {
    // Process inventory update
    console.log("Processing inventory update:", inventoryData.inventory_item_id)

    await ShopifyDatabase.updateInventoryLevel(
      inventoryData.inventory_item_id.toString(),
      inventoryData.location_id.toString(),
      inventoryData.available,
    )
  }
}

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface ShopifyCustomer {
  id?: number
  shopifyCustomerId: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  acceptsMarketing: boolean
  totalSpent: number
  ordersCount: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
  syncedAt: Date
}

export interface ShopifyProduct {
  id?: number
  shopifyProductId: string
  title: string
  handle: string
  description?: string
  productType?: string
  vendor?: string
  status: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  syncedAt: Date
}

export interface ShopifyOrder {
  id?: number
  shopifyOrderId: string
  orderNumber: string
  customerId?: number
  customerEmail?: string
  customerName?: string
  totalPrice: number
  currency: string
  financialStatus?: string
  fulfillmentStatus?: string
  shippingAddress?: any
  billingAddress?: any
  createdAt: Date
  updatedAt: Date
  syncedAt: Date
}

export interface WebhookLog {
  id?: number
  webhookTopic: string
  shopifyId?: string
  status: "success" | "failed" | "retry"
  payload?: any
  errorMessage?: string
  processedAt: Date
  retryCount: number
}

export class ShopifyDatabase {
  // Customer operations
  static async createCustomer(customer: Omit<ShopifyCustomer, "id" | "syncedAt">): Promise<ShopifyCustomer> {
    const result = await sql`
      INSERT INTO shopify_customers (
        shopify_customer_id, email, first_name, last_name, phone,
        accepts_marketing, total_spent, orders_count, tags, created_at, updated_at
      ) VALUES (
        ${customer.shopifyCustomerId}, ${customer.email}, ${customer.firstName}, ${customer.lastName}, ${customer.phone},
        ${customer.acceptsMarketing}, ${customer.totalSpent}, ${customer.ordersCount}, ${customer.tags}, ${customer.createdAt}, ${customer.updatedAt}
      )
      ON CONFLICT (shopify_customer_id) 
      DO UPDATE SET
        email = EXCLUDED.email,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        accepts_marketing = EXCLUDED.accepts_marketing,
        total_spent = EXCLUDED.total_spent,
        orders_count = EXCLUDED.orders_count,
        tags = EXCLUDED.tags,
        updated_at = EXCLUDED.updated_at,
        synced_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    return result[0] as ShopifyCustomer
  }

  static async getCustomerByShopifyId(shopifyCustomerId: string): Promise<ShopifyCustomer | null> {
    const result = await sql`
      SELECT * FROM shopify_customers 
      WHERE shopify_customer_id = ${shopifyCustomerId}
    `
    return (result[0] as ShopifyCustomer) || null
  }

  static async getCustomerByEmail(email: string): Promise<ShopifyCustomer | null> {
    const result = await sql`
      SELECT * FROM shopify_customers 
      WHERE email = ${email}
    `
    return (result[0] as ShopifyCustomer) || null
  }

  // Product operations
  static async createProduct(product: Omit<ShopifyProduct, "id" | "syncedAt">): Promise<ShopifyProduct> {
    const result = await sql`
      INSERT INTO shopify_products (
        shopify_product_id, title, handle, description, product_type,
        vendor, status, tags, created_at, updated_at
      ) VALUES (
        ${product.shopifyProductId}, ${product.title}, ${product.handle}, ${product.description}, ${product.productType},
        ${product.vendor}, ${product.status}, ${product.tags}, ${product.createdAt}, ${product.updatedAt}
      )
      ON CONFLICT (shopify_product_id)
      DO UPDATE SET
        title = EXCLUDED.title,
        handle = EXCLUDED.handle,
        description = EXCLUDED.description,
        product_type = EXCLUDED.product_type,
        vendor = EXCLUDED.vendor,
        status = EXCLUDED.status,
        tags = EXCLUDED.tags,
        updated_at = EXCLUDED.updated_at,
        synced_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    return result[0] as ShopifyProduct
  }

  static async getProductByShopifyId(shopifyProductId: string): Promise<ShopifyProduct | null> {
    const result = await sql`
      SELECT * FROM shopify_products 
      WHERE shopify_product_id = ${shopifyProductId}
    `
    return (result[0] as ShopifyProduct) || null
  }

  static async getAllProducts(): Promise<ShopifyProduct[]> {
    const result = await sql`
      SELECT * FROM shopify_products 
      ORDER BY created_at DESC
    `
    return result as ShopifyProduct[]
  }

  // Order operations
  static async createOrder(order: Omit<ShopifyOrder, "id" | "syncedAt">): Promise<ShopifyOrder> {
    const result = await sql`
      INSERT INTO shopify_orders (
        shopify_order_id, order_number, customer_id, customer_email, customer_name,
        total_price, currency, financial_status, fulfillment_status,
        shipping_address, billing_address, created_at, updated_at
      ) VALUES (
        ${order.shopifyOrderId}, ${order.orderNumber}, ${order.customerId}, ${order.customerEmail}, ${order.customerName},
        ${order.totalPrice}, ${order.currency}, ${order.financialStatus}, ${order.fulfillmentStatus},
        ${JSON.stringify(order.shippingAddress)}, ${JSON.stringify(order.billingAddress)}, ${order.createdAt}, ${order.updatedAt}
      )
      ON CONFLICT (shopify_order_id)
      DO UPDATE SET
        financial_status = EXCLUDED.financial_status,
        fulfillment_status = EXCLUDED.fulfillment_status,
        updated_at = EXCLUDED.updated_at,
        synced_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    return result[0] as ShopifyOrder
  }

  static async updateOrderStatus(
    shopifyOrderId: string,
    financialStatus?: string,
    fulfillmentStatus?: string,
  ): Promise<ShopifyOrder | null> {
    const result = await sql`
      UPDATE shopify_orders 
      SET 
        financial_status = COALESCE(${financialStatus}, financial_status),
        fulfillment_status = COALESCE(${fulfillmentStatus}, fulfillment_status),
        updated_at = CURRENT_TIMESTAMP,
        synced_at = CURRENT_TIMESTAMP
      WHERE shopify_order_id = ${shopifyOrderId}
      RETURNING *
    `
    return (result[0] as ShopifyOrder) || null
  }

  static async getOrderByShopifyId(shopifyOrderId: string): Promise<ShopifyOrder | null> {
    const result = await sql`
      SELECT * FROM shopify_orders 
      WHERE shopify_order_id = ${shopifyOrderId}
    `
    return (result[0] as ShopifyOrder) || null
  }

  static async getRecentOrders(limit = 10): Promise<ShopifyOrder[]> {
    const result = await sql`
      SELECT * FROM shopify_orders 
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `
    return result as ShopifyOrder[]
  }

  // Inventory operations
  static async updateInventoryLevel(inventoryItemId: string, locationId: string, available: number): Promise<void> {
    await sql`
      INSERT INTO shopify_inventory_levels (shopify_inventory_item_id, shopify_location_id, available)
      VALUES (${inventoryItemId}, ${locationId}, ${available})
      ON CONFLICT (shopify_inventory_item_id, shopify_location_id)
      DO UPDATE SET
        available = EXCLUDED.available,
        updated_at = CURRENT_TIMESTAMP
    `
  }

  static async getLowStockItems(threshold = 5): Promise<any[]> {
    const result = await sql`
      SELECT sil.*, spv.title, spv.sku, sp.title as product_title
      FROM shopify_inventory_levels sil
      LEFT JOIN shopify_product_variants spv ON sil.shopify_inventory_item_id = spv.shopify_variant_id::text
      LEFT JOIN shopify_products sp ON spv.product_id = sp.id
      WHERE sil.available <= ${threshold}
      ORDER BY sil.available ASC
    `
    return result
  }

  // Webhook logging
  static async logWebhook(log: Omit<WebhookLog, "id" | "processedAt">): Promise<WebhookLog> {
    const result = await sql`
      INSERT INTO webhook_logs (webhook_topic, shopify_id, status, payload, error_message, retry_count)
      VALUES (${log.webhookTopic}, ${log.shopifyId}, ${log.status}, ${JSON.stringify(log.payload)}, ${log.errorMessage}, ${log.retryCount})
      RETURNING *
    `
    return result[0] as WebhookLog
  }

  static async getWebhookLogs(limit = 50): Promise<WebhookLog[]> {
    const result = await sql`
      SELECT * FROM webhook_logs 
      ORDER BY processed_at DESC 
      LIMIT ${limit}
    `
    return result as WebhookLog[]
  }

  static async getWebhookStats(): Promise<any> {
    const result = await sql`
      SELECT 
        webhook_topic,
        status,
        COUNT(*) as count,
        MAX(processed_at) as last_processed
      FROM webhook_logs 
      WHERE processed_at >= NOW() - INTERVAL '24 hours'
      GROUP BY webhook_topic, status
      ORDER BY webhook_topic, status
    `
    return result
  }

  // Analytics
  static async getOrderStats(days = 30): Promise<any> {
    const result = await sql`
      SELECT 
        COUNT(*) as total_orders,
        SUM(total_price) as total_revenue,
        AVG(total_price) as average_order_value,
        COUNT(DISTINCT customer_email) as unique_customers
      FROM shopify_orders 
      WHERE created_at >= NOW() - INTERVAL '${days} days'
    `
    return result[0]
  }

  static async getTopProducts(limit = 10): Promise<any[]> {
    const result = await sql`
      SELECT 
        sp.title,
        sp.handle,
        COUNT(soli.id) as order_count,
        SUM(soli.quantity) as total_quantity,
        SUM(soli.price * soli.quantity) as total_revenue
      FROM shopify_products sp
      JOIN shopify_order_line_items soli ON sp.shopify_product_id = soli.shopify_product_id::text
      JOIN shopify_orders so ON soli.order_id = so.id
      WHERE so.created_at >= NOW() - INTERVAL '30 days'
      GROUP BY sp.id, sp.title, sp.handle
      ORDER BY total_revenue DESC
      LIMIT ${limit}
    `
    return result
  }
}

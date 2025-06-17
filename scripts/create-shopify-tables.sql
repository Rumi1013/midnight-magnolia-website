-- Create database tables for Shopify webhook data

-- Customers table
CREATE TABLE IF NOT EXISTS shopify_customers (
    id BIGINT PRIMARY KEY,
    store_id INTEGER REFERENCES shopify_stores(id) ON DELETE CASCADE,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(50),
    orders_count INTEGER,
    total_spent NUMERIC(10, 2),
    state VARCHAR(50), -- e.g., 'enabled', 'disabled'
    created_at_shopify TIMESTAMP WITH TIME ZONE,
    updated_at_shopify TIMESTAMP WITH TIME ZONE,
    admin_graphql_api_id TEXT,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS shopify_products (
    id BIGINT PRIMARY KEY,
    store_id INTEGER REFERENCES shopify_stores(id) ON DELETE CASCADE,
    title TEXT,
    vendor VARCHAR(255),
    product_type VARCHAR(255),
    status VARCHAR(50),
    created_at_shopify TIMESTAMP WITH TIME ZONE,
    updated_at_shopify TIMESTAMP WITH TIME ZONE,
    published_at_shopify TIMESTAMP WITH TIME ZONE,
    handle VARCHAR(255),
    tags TEXT,
    admin_graphql_api_id TEXT,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product images table
CREATE TABLE IF NOT EXISTS shopify_product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES shopify_products(id) ON DELETE CASCADE,
    shopify_image_id BIGINT NOT NULL,
    src TEXT NOT NULL,
    alt_text VARCHAR(255),
    position INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product variants table
CREATE TABLE IF NOT EXISTS shopify_product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES shopify_products(id) ON DELETE CASCADE,
    shopify_variant_id BIGINT UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    compare_at_price DECIMAL(10,2),
    sku VARCHAR(100),
    inventory_quantity INTEGER DEFAULT 0,
    weight DECIMAL(8,2),
    weight_unit VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS shopify_orders (
    id BIGINT PRIMARY KEY,
    store_id INTEGER REFERENCES shopify_stores(id) ON DELETE CASCADE,
    email VARCHAR(255),
    phone VARCHAR(50),
    total_price NUMERIC(10, 2),
    currency CHAR(3),
    financial_status VARCHAR(50),
    fulfillment_status VARCHAR(50),
    created_at_shopify TIMESTAMP WITH TIME ZONE,
    updated_at_shopify TIMESTAMP WITH TIME ZONE,
    customer_locale VARCHAR(10),
    admin_graphql_api_id TEXT,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order line items table
CREATE TABLE IF NOT EXISTS shopify_order_line_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES shopify_orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES shopify_products(id),
    variant_id INTEGER REFERENCES shopify_product_variants(id),
    shopify_product_id BIGINT,
    shopify_variant_id BIGINT,
    title VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    sku VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inventory levels table
CREATE TABLE IF NOT EXISTS shopify_inventory_levels (
    id SERIAL PRIMARY KEY,
    shopify_inventory_item_id BIGINT NOT NULL,
    shopify_location_id BIGINT NOT NULL,
    available INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(shopify_inventory_item_id, shopify_location_id)
);

-- Webhook logs table for monitoring
CREATE TABLE IF NOT EXISTS webhook_logs (
    id SERIAL PRIMARY KEY,
    webhook_topic VARCHAR(100) NOT NULL,
    shopify_id BIGINT,
    status VARCHAR(20) NOT NULL, -- 'success', 'failed', 'retry'
    payload JSONB,
    error_message TEXT,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    retry_count INTEGER DEFAULT 0
);

-- Customer addresses table
CREATE TABLE IF NOT EXISTS shopify_customer_addresses (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES shopify_customers(id) ON DELETE CASCADE,
    shopify_address_id BIGINT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(100),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(100),
    province VARCHAR(100),
    country VARCHAR(100),
    zip VARCHAR(20),
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shopify_customers_email ON shopify_customers(email);
CREATE INDEX IF NOT EXISTS idx_shopify_customers_shopify_id ON shopify_customers(id);
CREATE INDEX IF NOT EXISTS idx_shopify_products_handle ON shopify_products(handle);
CREATE INDEX IF NOT EXISTS idx_shopify_products_shopify_id ON shopify_products(id);
CREATE INDEX IF NOT EXISTS idx_shopify_orders_customer_email ON shopify_orders(email);
CREATE INDEX IF NOT EXISTS idx_shopify_orders_shopify_id ON shopify_orders(id);
CREATE INDEX IF NOT EXISTS idx_shopify_orders_created_at ON shopify_orders(created_at_shopify);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_topic ON webhook_logs(webhook_topic);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_processed_at ON webhook_logs(processed_at);

CREATE TABLE IF NOT EXISTS shopify_stores (
    id SERIAL PRIMARY KEY,
    shop_domain VARCHAR(255) UNIQUE NOT NULL,
    access_token TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

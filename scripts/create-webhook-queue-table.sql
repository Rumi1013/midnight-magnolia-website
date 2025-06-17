CREATE TABLE IF NOT EXISTS webhook_queue (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    source VARCHAR(100), -- e.g., 'shopify', 'stripe'
    payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 5,
    last_attempted_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    processing_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for faster querying of pending webhooks
CREATE INDEX IF NOT EXISTS idx_webhook_queue_status_attempts ON webhook_queue (status, attempts, last_attempted_at)
WHERE status IN ('pending', 'failed');

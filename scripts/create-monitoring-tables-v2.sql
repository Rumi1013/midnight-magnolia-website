-- This script assumes create-monitoring-tables.sql (v1) has been run or its definitions are included.
-- Adding a new table for system alerts
CREATE TABLE IF NOT EXISTS monitoring_alerts (
    id SERIAL PRIMARY KEY,
    alert_type VARCHAR(100) NOT NULL, -- e.g., 'uptime_down', 'performance_threshold', 'webhook_failure'
    service_name VARCHAR(255),
    message TEXT NOT NULL,
    severity VARCHAR(50) DEFAULT 'warning', -- info, warning, error, critical
    status VARCHAR(50) DEFAULT 'active', -- active, acknowledged, resolved
    details JSONB, -- Additional details about the alert
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Example: Adding a 'details' column to 'uptime_stats' if it doesn't exist (from v1)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = current_schema() -- Ensures it targets the correct schema
          AND table_name = 'uptime_stats'
          AND column_name = 'details' -- Renamed from error_details for clarity if that was the intent
    ) THEN
        ALTER TABLE uptime_stats ADD COLUMN details TEXT;
    END IF;
END $$;

-- Example: Adding a 'component' column to 'performance_logs'
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = current_schema()
          AND table_name = 'performance_logs'
          AND column_name = 'component'
    ) THEN
        ALTER TABLE performance_logs ADD COLUMN component VARCHAR(255);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_status_severity ON monitoring_alerts (status, severity, triggered_at DESC);

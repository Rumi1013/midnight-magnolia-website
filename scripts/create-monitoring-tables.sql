-- Create uptime monitoring table
CREATE TABLE IF NOT EXISTS uptime_checks (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) NOT NULL,
  response_time INTEGER,
  db_response_time INTEGER,
  services_status JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create performance metrics table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page VARCHAR(255) NOT NULL,
  load_time INTEGER,
  dom_content_loaded INTEGER,
  first_contentful_paint INTEGER,
  largest_contentful_paint INTEGER,
  cumulative_layout_shift DECIMAL(5,4),
  first_input_delay INTEGER,
  user_agent TEXT,
  connection_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create monitoring alerts table
CREATE TABLE IF NOT EXISTS monitoring_alerts (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  metadata JSONB,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'acknowledged')),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create uptime stats table
CREATE TABLE IF NOT EXISTS uptime_stats (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL, -- up, down, degraded
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    response_time_ms INTEGER,
    error_details TEXT
);

-- Create performance logs table
CREATE TABLE IF NOT EXISTS performance_logs (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(255) NOT NULL,
    value FLOAT NOT NULL,
    unit VARCHAR(50),
    tags JSONB, -- e.g., {"page": "/home", "region": "us-east-1"}
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_uptime_checks_timestamp ON uptime_checks(timestamp);
CREATE INDEX IF NOT EXISTS idx_uptime_checks_status ON uptime_checks(status);

CREATE INDEX IF NOT EXISTS idx_performance_metrics_timestamp ON performance_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_page ON performance_metrics(page);

CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_timestamp ON monitoring_alerts(timestamp);
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_status ON monitoring_alerts(status);
CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_severity ON monitoring_alerts(severity);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_uptime_stats_service_checked ON uptime_stats (service_name, checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_performance_logs_metric_timestamp ON performance_logs (metric_name, timestamp DESC);

-- Create a view for recent performance summary
CREATE OR REPLACE VIEW recent_performance_summary AS
SELECT 
  page,
  COUNT(*) as page_views,
  AVG(load_time) as avg_load_time,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY load_time) as p95_load_time,
  AVG(first_contentful_paint) as avg_fcp,
  AVG(largest_contentful_paint) as avg_lcp,
  AVG(cumulative_layout_shift) as avg_cls,
  AVG(first_input_delay) as avg_fid
FROM performance_metrics 
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY page
ORDER BY page_views DESC;

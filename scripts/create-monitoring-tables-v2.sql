-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS monitoring_alerts CASCADE;
DROP TABLE IF EXISTS performance_metrics CASCADE;
DROP TABLE IF EXISTS uptime_checks CASCADE;
DROP VIEW IF EXISTS recent_performance_summary CASCADE;

-- Create uptime monitoring table
CREATE TABLE uptime_checks (
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
CREATE TABLE performance_metrics (
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
CREATE TABLE monitoring_alerts (
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

-- Create indexes for better performance
CREATE INDEX idx_uptime_checks_timestamp ON uptime_checks(timestamp);
CREATE INDEX idx_uptime_checks_status ON uptime_checks(status);

CREATE INDEX idx_performance_metrics_timestamp ON performance_metrics(timestamp);
CREATE INDEX idx_performance_metrics_page ON performance_metrics(page);

CREATE INDEX idx_monitoring_alerts_timestamp ON monitoring_alerts(timestamp);
CREATE INDEX idx_monitoring_alerts_status ON monitoring_alerts(status);
CREATE INDEX idx_monitoring_alerts_severity ON monitoring_alerts(severity);

-- Create a view for recent performance summary
CREATE VIEW recent_performance_summary AS
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

-- Insert some sample data for testing
INSERT INTO uptime_checks (status, response_time, db_response_time, services_status) VALUES
('healthy', 150, 25, '{"stripe": "healthy", "shopify": "healthy", "database": "healthy"}'),
('healthy', 145, 30, '{"stripe": "healthy", "shopify": "healthy", "database": "healthy"}'),
('healthy', 160, 28, '{"stripe": "healthy", "shopify": "healthy", "database": "healthy"}');

INSERT INTO performance_metrics (page, load_time, dom_content_loaded, first_contentful_paint, largest_contentful_paint, cumulative_layout_shift, first_input_delay, user_agent, connection_type) VALUES
('/', 1200, 800, 600, 1000, 0.05, 50, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '4g'),
('/services', 1100, 750, 550, 950, 0.03, 45, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '4g'),
('/resources', 1300, 900, 650, 1100, 0.07, 60, 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15', '3g');

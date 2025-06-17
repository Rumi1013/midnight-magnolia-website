CREATE TABLE IF NOT EXISTS error_logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    application_area VARCHAR(100), -- e.g., 'frontend', 'backend_api', 'webhook_processor', 'ai_content_studio'
    type VARCHAR(100), -- e.g., 'react_error', 'api_exception', 'database_error'
    message TEXT NOT NULL,
    stack_trace TEXT,
    severity VARCHAR(50) DEFAULT 'error', -- debug, info, warning, error, critical
    url TEXT, -- URL where the error occurred, if applicable
    user_context JSONB, -- e.g., {"userId": "...", "sessionId": "..."}
    request_context JSONB, -- e.g., {"method": "POST", "path": "/api/...", "params": {...}}
    metadata JSONB -- any other relevant data, e.g., {"componentStack": "...", "errorCode": "..."}
);

CREATE INDEX IF NOT EXISTS idx_error_logs_timestamp_severity ON error_logs (timestamp DESC, severity);
CREATE INDEX IF NOT EXISTS idx_error_logs_application_area ON error_logs (application_area);

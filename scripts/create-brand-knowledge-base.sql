-- Enable the pgvector extension to handle vector data types
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the table to store your brand's knowledge
CREATE TABLE IF NOT EXISTS brand_knowledge (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL, -- e.g., 'products', 'about_page'
  content TEXT NOT NULL, -- The actual text content
  embedding vector(1536) NOT NULL, -- The vector embedding for semantic search (1536 is for OpenAI's text-embedding-3-small)
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for efficient similarity searching
CREATE INDEX IF NOT EXISTS on brand_knowledge USING HNSW (embedding vector_l2_ops);

-- Portfolio sections table for dynamic content management
CREATE TABLE portfolio_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT UNIQUE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolio_sections ENABLE ROW LEVEL SECURITY;

-- Public read policy (anyone can view)
CREATE POLICY "read_portfolio_sections" ON portfolio_sections FOR SELECT
  TO public USING (true);

-- Authenticated write policy
CREATE POLICY "write_portfolio_sections" ON portfolio_sections FOR ALL
  TO authenticated USING (true) WITH CHECK (true);
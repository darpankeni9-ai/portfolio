-- Drop existing policies
DROP POLICY IF EXISTS read_portfolio_sections ON portfolio_sections;
DROP POLICY IF EXISTS write_portfolio_sections ON portfolio_sections;

-- Public read policy (anyone can view)
CREATE POLICY "read_portfolio_sections" ON portfolio_sections FOR SELECT
  TO public USING (true);

-- Authenticated write policy (only logged-in users can modify)
CREATE POLICY "insert_portfolio_sections" ON portfolio_sections FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_portfolio_sections" ON portfolio_sections FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_portfolio_sections" ON portfolio_sections FOR DELETE
  TO authenticated USING (true);

-- Enable email auth
-- Note: Auth is typically enabled via Supabase Dashboard, but we can verify the schema exists
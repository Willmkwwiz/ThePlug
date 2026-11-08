/*
# Create marketplace tables: listings and verified member registrations

Plain-English summary
This migration creates the two data tables that power The Plug & Socket App.
- Listings: items for sale that appear publicly on the marketplace home page.
- Members: Verified Plug registrations (name, neighborhood, mobile money provider, phone). These are private and only visible to the owner dashboard.

1. New Tables
- `listings`
  - `id` (uuid, primary key)
  - `title` (text, 3 to 120 characters)
  - `price_mwk` (integer, positive, in Malawian Kwacha)
  - `category` (text, one of Electronics, Used Cars, Agriculture, Home/Power, Fashion)
  - `area` (text, Lilongwe neighborhood or area)
  - `contact_phone` (text, seller WhatsApp/phone number)
  - `description` (text, up to 500 characters)
  - `image_url` (text, optional small inline image, max about 700 KB)
  - `created_at` (timestamp)
- `members`
  - `id` (uuid, primary key)
  - `full_name` (text)
  - `neighborhood` (text)
  - `provider` (text, Airtel Money or TNM Mpamba)
  - `phone` (text)
  - `status` (text, always Verified)
  - `fee_mwk` (integer, fixed at 10000)
  - `registered_at` (timestamp)

2. Security
- Row level security is enabled on both tables.
- Anyone (anonymous visitors and signed-in users) can read listings, and can publish new listings.
- Anyone can submit a member registration, but nobody except the owner can read member records.
- The owner is identified by the sign-in email address `willmkwwiz@gmail.com`. Only that signed-in account can read the members table.
- No updates or deletes are permitted from the app on either table.

3. Important notes
- Payment is simulated for now, so the fee is recorded as a fixed value rather than charged.
- Phone numbers are validated to contain only digits, plus signs and spaces.
- Indexes are added on the newest-first sort columns and on area and category filters.
*/

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 3 AND 120),
  price_mwk integer NOT NULL CHECK (price_mwk > 0 AND price_mwk <= 1000000000),
  category text NOT NULL CHECK (category IN ('Electronics', 'Used Cars', 'Agriculture', 'Home/Power', 'Fashion')),
  area text NOT NULL CHECK (char_length(btrim(area)) BETWEEN 2 AND 100),
  contact_phone text NOT NULL CHECK (contact_phone ~ '^[0-9+ ]{9,20}$'),
  description text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 1 AND 500),
  image_url text CHECK (image_url IS NULL OR (image_url LIKE 'data:image/%' AND char_length(image_url) <= 700000)),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS listings_created_at_idx ON listings (created_at DESC);
CREATE INDEX IF NOT EXISTS listings_area_idx ON listings (area);
CREATE INDEX IF NOT EXISTS listings_category_idx ON listings (category);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON listings TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_listings" ON listings;
CREATE POLICY "public_select_listings" ON listings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_listings" ON listings;
CREATE POLICY "public_insert_listings" ON listings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(btrim(full_name)) BETWEEN 2 AND 100),
  neighborhood text NOT NULL CHECK (char_length(btrim(neighborhood)) BETWEEN 2 AND 100),
  provider text NOT NULL CHECK (provider IN ('Airtel Money', 'TNM Mpamba')),
  phone text NOT NULL CHECK (phone ~ '^[0-9+ ]{9,20}$'),
  status text NOT NULL DEFAULT 'Verified' CHECK (status = 'Verified'),
  fee_mwk integer NOT NULL DEFAULT 10000 CHECK (fee_mwk = 10000),
  registered_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS members_registered_at_idx ON members (registered_at DESC);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON members TO anon, authenticated;
GRANT SELECT ON members TO authenticated;

DROP POLICY IF EXISTS "public_insert_members" ON members;
CREATE POLICY "public_insert_members" ON members FOR INSERT
  TO anon, authenticated WITH CHECK (status = 'Verified' AND fee_mwk = 10000);

DROP POLICY IF EXISTS "owner_select_members" ON members;
CREATE POLICY "owner_select_members" ON members FOR SELECT
  TO authenticated USING ((auth.jwt() ->> 'email') = 'willmkwwiz@gmail.com');

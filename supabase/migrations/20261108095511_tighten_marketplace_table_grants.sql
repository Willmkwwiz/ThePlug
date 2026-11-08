/*
# Tighten table permissions for listings and members

Plain-English summary
The database allowed visitors' browsers to edit and delete rows, even though the app never does this and the security rules would block it anyway. This migration removes those extra permissions so the database matches the intended design.

1. Modified Tables
- `listings`: visitors and signed-in users can only read and publish listings. Editing and deleting are removed.
- `members`: visitors can only submit registrations. Editing and deleting are removed. Reading is limited to the signed-in owner.

2. Security
- Revokes UPDATE, DELETE and TRUNCATE from the public (anon) and signed-in (authenticated) roles on both tables.
- Revokes SELECT on `members` from the public (anon) role. Only the owner account can read members.
- No data is changed or removed.

3. Important notes
- Re-running this migration is safe; revoking a permission that is already absent does nothing.
*/

REVOKE UPDATE, DELETE, TRUNCATE ON listings FROM anon, authenticated;
REVOKE UPDATE, DELETE, TRUNCATE ON members FROM anon, authenticated;
REVOKE SELECT ON members FROM anon;

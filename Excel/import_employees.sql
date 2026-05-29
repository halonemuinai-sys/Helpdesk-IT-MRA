-- ============================================================
-- IMPORT: All Employee MRA Group
-- Generated: 2026-05-28 16:31
-- Total: 693 employees, 32 companies
-- ============================================================
SET search_path TO ga, public;

-- 1. INSERT COMPANIES (skip existing)
INSERT INTO m_company(name) VALUES ('AAA - Head Office') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('Medical Claim') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('MPI - Head Office') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('MPI - Store Bvlgari Bali') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('MPI - Store Bvlgari Plaza Indonesia') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('MPI - Store Bvlgari Plaza Senayan') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Emera Boga Makmur') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Hourlogy Indah Perkasa - Butik OMEGA Mall Kelapa Gading 3') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Indonesia') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Hourlogy Indah Perkasa - Butik OMEGA Tunjungan Plaza 4 Surabaya') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Hourlogy Indah Perkasa - Head Office') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Hourlogy Inti Semesta - Head Office') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Hourlogy Inti Semesta - Service Center') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Jemma Putri International') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Mugi Rekso Abadi') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Permata Landmarq Abadi') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Radio Antar Nusa Djaja') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Radio Suara Kedjajaan') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT Surya Swara Mediatama') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT.  Rupa Kreasi Anak Bangsa') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Artindo Jakarta Seni Kini') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Emera Digital Indonesia') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Graha Emera Abadi') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Media Insani Abadi') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Paramita Kreasi Abadi') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Rahayu Arumdhani Distribusindo - 1') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Rahayu Arumdhani Distribusindo - 2') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Rahayu Arumdhani Distribusindo - 3') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Rahayu Arumdhani International - 1') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Rahayu Arumdhani International - 2') ON CONFLICT DO NOTHING;
INSERT INTO m_company(name) VALUES ('PT. Rahayu Arumdhani International - 3') ON CONFLICT DO NOTHING;

-- 2. CLEAR OLD DEMO EMPLOYEES
TRUNCATE TABLE m_employee RESTART IDENTITY CASCADE;

-- 3. INSERT EMPLOYEES
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Suryadi', 'HR & GA', 'Office Boy', 'suryabramasta33@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Emera Boga Makmur'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rafael Soedarjo', 'Business Development', 'Buss. Development Manager', 'rafael@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Emera Boga Makmur'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hafidh Ahmad Irfanda', 'Art Jakarta', 'Direktur VIP Relations', 'irfanda20@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'M. Supriyanto', 'Art Jakarta', 'Direktur Artistik', 'Enin@artjakarta.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maya Juniarti Hegar', 'Art Jakarta', 'VIP Relations Executive', 'maya.juniarti@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Teodora Peni Binarwati Daeli', 'Art Jakarta', 'Media Relation Manager', 'pbinarwati@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Vicky Rosalina Silaen', 'Art Jakarta', 'Managing Director', 'vicky.rosalina@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Martin Andrew Aryanto', 'Art Jakarta', 'Assistant Fair Director', 'Andrew@artjakarta.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nucha Ayuningrum', 'Parentalk', 'Direktur', 'nucha@parentalk.id', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Meisza Adilla Herssy', 'Parentalk', 'Senior Community Activation Executive', 'meisza@parentalk.id', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anisah Nur Imani', 'Parentalk', 'Senior Accountant', 'anisah@parentalk.id', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syafira Khairany', 'Parentalk', 'Senior Creative Designer', 'syafira.khairany@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Audrie Rumondang Magdalena', 'Parentalk', 'VP Marketing & Sales', 'audrie@parentalk.id', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Supriyanto', 'General Affair', 'Kurir', 'supriyanto@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rhani Shakurani', 'Redaksi Cosmopolitan', 'Artistic Coordinator', 'rhani@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Filisya Thunggawan', 'Redaksi Cosmopolitan', 'Editor In Chief', 'filisya@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mohamad Afrisal A.', 'Redaksi Cosmopolitan', 'Fashion & Beauty Managing Editor', 'afrisal.algamar@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Merry Joan Emiliani Sahelangi', 'Redaksi Cosmopolitan', 'Senior Sekretaris Redaksi', 'merry.joan@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Astriana Gemiati', 'Redaksi Cosmopolitan', 'Assistant Managing Editor', 'astriana.gemiati@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Giovani Untari', 'Redaksi Cosmopolitan', 'Editor', 'giovani.untari@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kissy Aprilianti', 'Redaksi Cosmopolitan', 'Senior Editor', 'kissy.aprilianti@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Titin Budiman', 'Advertising Sales', 'Advertising Sales Director', 'titin@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dino Suryadi', 'General Affair', 'Senior IT Staff', 'dino@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Theresia Margareth', 'Advertising Sales', 'Advertising Sales Manager', 'theresia.margareth@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Cory Margaretta Syuntha', 'Advertising Sales', 'Account Executive Supervisor', 'cory.margaretta@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'C. Ika Sri Wulandari', 'Finance & Accounting', 'Admin Finance Supervisor', 'ika.sriwulandari@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lingga Adhinagara', 'Redaksi Cosmopolitan', 'Senior Social Media Art Designer', 'lingga.adhinagara@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Shafita Nurul Wijaya', 'Finance & Accounting', 'Accounting Staff', 'shafita.nurul@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Raisa Benaya Ranti', 'Redaksi Casa', 'Assistant Managing Editor', 'raisa.ranti@casaindonesia.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Sofyan', 'Creative Marketing Strategy', 'Senior Creative Designer', 'msofyan@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sutrisno Naftali', 'General Affair', 'Driver', 'sutrisno@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irma Meinila', 'Finance & Accounting', 'Senior Tax Officer', 'irma.meinila@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Avid Narana Putri', 'Advertising Sales', 'Admin Staff', 'avid.narana@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Prastia Hesti Bayu Putra', 'Redaksi Casa', 'Managing Editor', 'prastia.putra@casaindonesia.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Oktavia Ika Putri', 'Redaksi Casa', 'Editor', 'oktavia.putri@casaindonesia.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kiky Septika Anjani', 'Creative Marketing Strategy', 'Senior Creative Designer', 'kikyanjani@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'R. Bayu Hendroatmodjo', 'Creative Marketing Strategy', 'Creative Head', 'bayuhendroatmodjo@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Vista Bella Da Ikha', 'Creative Marketing Strategy', 'Content Writer', 'vista.bella@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Winda Paramita', 'Finance & Accounting', 'Senior Accounting Staff', 'winda.paramita@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Farhan Rafdiansyah', 'Audiovisual', 'Video Editor', 'farhan.rafdiansyah@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maudy Noer Ayuningsih', 'Marketing Communication', 'Marcomm Staff', 'maudy.noer@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tri Wahyuningsih', 'Marketing Communication', 'Admin Staff', 'tri.wahyuningsih@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hanny Dwi Pristianti', 'Finance & Accounting', 'Finance & Accounting Supervisor', 'hanny.pristianty@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irene Gian', 'Creative Marketing Strategy', 'Senior Creative Designer', 'irene.gian@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Erica Arifianda H.', 'Redaksi Harper''s Bazaar', 'Managing Editor', 'erica.arifianda@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Michael Pondaag', 'Redaksi Harper''s Bazaar', 'Fashion Director', 'michaelpondaag@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Erlissa Florencia', 'Redaksi Harper''s Bazaar', 'Senior Reporter', 'erlissa.florensia@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maria Irianti Rachmawati', 'Redaksi Harper''s Bazaar', 'Director of Editorial Strategy', 'ria.lirungan@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yudith Natalia Kindangen', 'Redaksi Harper''s Bazaar', 'Assistant Managing Editor', 'yudith.kindangen@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mohammad Somad', 'Redaksi Harper''s Bazaar', 'Senior Art Designer', 'm.somad@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Janice Mae', 'Redaksi Harper''s Bazaar', 'Editor', 'janice.mae@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Chindya Maharani', 'Advertising Sales', 'Account Executive', 'chindya.maharani@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hadi Cahyono', 'Studio Photography', 'Assistant Photographers Coordinator', 'hd@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ananda Fieki Amalia', 'Marketing Communication', 'Marcomm Supervisor', 'ananda.fieki@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adam Riyadi', 'Advertising Sales', 'Senior Advertising Sales Manager', 'adam.riyadi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rudy Ferdian', 'Audiovisual', 'Audiovisual Coordinator', 'rudy.ferdianrus@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fidelia Dea Puspitarani', 'Audiovisual', 'Video Editor', 'fidelia.dea@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wirman', 'General Affair', 'Office Boy', 'wirman@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sopacua Afia Stenia', 'Management', 'Executive Secretary', 'afia@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putri Hanifa', 'Audiovisual', 'Senior Videographer', 'putri.hanifa@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sonia Sianturi', 'Advertising Sales', 'Senior Admin Staff', 'sonia.sianturi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Iman Syayogya', 'Audiovisual', 'Senior Videographer', 'iman.syayogia@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nur Fajariyah', 'Human Resources', 'HRIS & Admin Specialist', 'nur.fajariyah@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sonny Wicaksono', 'Creative Marketing Strategy', 'Creative Marketing Coordinator', 'sonny.wicaksono@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ramli Junaidi Sirait', 'General Affair', 'General Affair Business Partner', 'ramli.junaidi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Vonda Nabilla Sari', 'Redaksi Mother & Beyond', 'Senior Reporter', 'vonda.nabilla@motherandbeyond.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tiffany Warrantyasri', 'Redaksi Mother & Beyond', 'Assistant Managing Editor', 'tiffany.warrantyasri@motherandbeyond.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Riana Tri Fitriyani', 'Finance & Accounting', 'Accounting Staff', 'riana@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Henry Brown Nathalia', 'Marketing Communication', 'Marcomm Lead', 'henry.brown@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Prinidiati Savitri', 'Advertising Sales', 'Advertising Sales Manager', 'prinidiati.savitri@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Karel K. I. Langi', 'Audiovisual', 'Senior Videographer', 'karel.langi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wiryanti', 'Finance & Accounting', 'Finance Staff', 'wiryanti@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fitri Astuti', 'Finance & Accounting', 'Senior Finance Staff', 'fitri.astuti@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ummy Shalihat', 'Audiovisual', 'Videographer', 'ummy.shalihat@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Achmad Rivai', 'General Affair', 'Messenger', 'achmad.rivai@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kiki Riama Priskila', 'Redaksi Her World', 'Managing Editor', 'kikipriskila@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Zamira Mahardini', 'Redaksi Her World', 'Artistic Coordinator', 'zamira.mahardini@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bimo Nusa Permadi', 'Redaksi Her World', 'Assistant Managing Editor', 'bimo.permadi@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anastasia Maria', 'Human Resources', 'Human Resources Business Partner', 'anastasia.maria@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'S. Bagus Ragamanyu Herlambang', 'Studio Photography', 'Senior Digital Imaging Staff', 'bagus.ragamanyu@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Stephanie Karina Tanggara', 'Redaksi Her World', 'Editor', 'stephanie.karina@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putri Arifa Malik', 'Redaksi Her World', 'Assistant Managing Editor', 'putri.arifa@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Vanessa Masli', 'Redaksi Her World', 'Editor', 'vanessa.masli@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rosa Merisca', 'Marketing Communication', 'Marcomm Supervisor', 'rosa.merisca@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Girah Ababyl Masgartha K', 'Redaksi Her World', 'Fashion Reporter', 'girah.ababyl@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Gustama Pandu Pawenang', 'Studio Photography', 'Photographer', 'gustama.pandu@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rayoga Akbar Firdaus', 'Redaksi Cosmopolitan', 'Lifestyle Editor', 'rayoga@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Abdi Winoto', 'Häagen-Dazs-Retail', 'Retail Admin', 'abdiwinoto0903@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Abdul Rachman', 'Häagen-Dazs-Operation', 'Captain', 'abdulrachman@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Abdul Rohim', 'Häagen-Dazs-Operation', 'Operational Staff', 'abdulrohim091001@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Achmad Fauzi', 'Häagen-Dazs-Operation', 'Operational Staff', 'fauzidoank313@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ade Irma Susanti', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'adeirmasusanti87@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adi Hidayat', 'Häagen-Dazs-Operation', 'Operational Staff', 'adieadiera.ak@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adisha Aulia Pradina', 'Häagen-Dazs-Operation', 'Operational Staff', 'adishaaulia89@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Agus Purnomo', 'Häagen-Dazs-Operation', 'Captain', 'aguspurnomo@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ahmad Mustaqim Abrianto', 'Häagen-Dazs-Operation', 'Café Supervisor', 'abrianto@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aini Prihatini', 'Häagen-Dazs-Operation', 'Operational Staff', 'ainipritini69@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Al Fadhila', 'Häagen-Dazs-Operation', 'Café Supervisor', 'alfadila@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aldo Handoval', 'Häagen-Dazs-Operation', 'Operational Staff', 'alldoo0362@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Alina Watie', 'Häagen-Dazs-Operation', 'Captain', 'Alina@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Andrean Fernando', 'Häagen-Dazs-Retail', 'Acting Sales Merchandiser', 'andreanfernando27@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ardhianto Sukmawan', 'Häagen-Dazs-Supply Chain', 'Driver', 'ARDHI.SUKMA85@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Artia Dheamas', 'Häagen-Dazs-Operation', 'Operational Staff', 'artiadheamas05@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Astri Ayu Nurcahyani', 'Häagen-Dazs-Operation', 'Operational Staff', 'astriayu.nc@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Awik Nurdiantono', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'AWIKNURDIANTONO92@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Chairunnisa', 'Häagen-Dazs-Operation', 'Operational Staff', 'Nisachairun471@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Chevy Satya Nazar', 'Häagen-Dazs-Finance & Accounting', 'Accounting Staff', 'chevy@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Deddy Aditya', 'Häagen-Dazs-Operation', 'Captain', 'deddy@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dhimas Aji Sasongko', 'Häagen-Dazs-HR & GA', 'Office Assistant', 'dhimasajisasongko00@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dian Yunita Sari', 'Häagen-Dazs-Operation', 'Operational Staff', 'iphyndud@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dina Lestari', 'Häagen-Dazs-Operation', 'Operational Staff', 'dinalestari8686@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Edo Yahya Veris Mahgruzar', 'Häagen-Dazs-Operation', 'Operational Staff', 'dhoofreaky@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Evi Seftiana', 'Häagen-Dazs-Finance & Accounting', 'Senior Accounting', 'evi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Firmansyah', 'Häagen-Dazs-Operation', 'Operational Staff', 'fiirmansyahh59@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Gede Agus Bayu Andi Sucipta', 'Häagen-Dazs-HR & GA', 'Messenger', 'agusbayusucipta98@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Iffah Fitrianah', 'Häagen-Dazs-Retail', 'Area Sales Manager', 'iffah@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Imelda Dwi Apriliani', 'Häagen-Dazs-Retail', 'Section Head of Department Key Account', 'imelda@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ipung Sujatmiko', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'IPUNGSUJATMIKO81@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ivan Fadilah', 'Häagen-Dazs-Operation', 'Operational Staff', 'ivanfdlh030503@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Junita Sariyanti S', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'JUNITASARIYANTI.JS@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Leni Astuti', 'Häagen-Dazs-Operation', 'Operational Staff', 'lenyastuti2014@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'M. Esga Tayo', 'Häagen-Dazs-Retail', 'Sales Admin', 'esgatayo1@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhamad Ghilmanudin', 'Häagen-Dazs-Operation', 'Operational Staff', 'ghilmanudin09@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhamad Imam Saputro', 'Häagen-Dazs-Operation', 'Operational Staff', 'imamsaputro90@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhamad Nurrohman', 'Häagen-Dazs-Operation', 'Operational Staff', 'muhammadnurrohman133@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Mashari', 'Häagen-Dazs-Retail', 'Section Head of Department Sales Merchandiser', 'mashari@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Rifaldi Al Hakim', 'Häagen-Dazs-Operation', 'Operational Staff', 'dialhakimr@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Rizky Pahlevi', 'Häagen-Dazs-Operation', 'Operational Staff', 'phlvrizky@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rijki Fauzi Maulana', 'Häagen-Dazs-Operation', 'Operational Staff', 'rizkifauzimaulana9@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rizki Nugroho', 'Häagen-Dazs-Operation', 'Operational Staff', 'rizki.nugrh99@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rohman Hidayat', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'rohmanhidayat@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rosiani Putri', 'Häagen-Dazs-Operation', 'Operational Staff', 'ibnurivadi01@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rusdi', 'Häagen-Dazs-Operation', 'Captain', 'rusdicaptain@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sasti Nada Insani', 'Häagen-Dazs-Operation', 'Operational Staff', 'sastinada77@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Septian Pratama', 'Häagen-Dazs-Operation', 'Operational Staff', 'pratama.septian090@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sugeng Supriyanto', 'Häagen-Dazs-Supply Chain', 'Technician', 'SUGENGSUPRIANTO689@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Suherna', 'Häagen-Dazs-Operation', 'Operational Staff', 'ernabory87@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Suvi Juliana', 'Häagen-Dazs-Retail', 'Area Sales Manager', 'suvi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syairoji', 'Häagen-Dazs-HR & GA', 'Messenger', 'OJIPARK@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Teza Anugrah Pradana', 'Häagen-Dazs-Operation', 'Operational Staff', 'teza.ap87@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tommy Wijaya', 'Häagen-Dazs-Retail', 'Sales Merchandiser Coordinator', 'tommy@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Trisno Pranoto', 'Häagen-Dazs-Operation', 'Operational Staff', 'ninoagung91@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ucok Parulian Manik', 'Häagen-Dazs-Finance & Accounting', 'Accounting Staff', 'ucok@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Weni Lestari', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'WENILESTARI11@YAHOO.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yenita Devi Andriana', 'Häagen-Dazs-Finance & Accounting', 'Accounting Staff', 'yenita@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yova Harya Nesya', 'Häagen-Dazs-Operation', 'Operational Staff', 'yovaharya@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ade Astari Muhamad', 'Häagen-Dazs-HR & GA', 'General Affair Business Partner', 'ade@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Emera Boga Makmur'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adi Amsyah', 'Häagen-Dazs-Operation', 'Operational Staff', 'adiamsyah@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aditya Putra S', 'Häagen-Dazs-Operation', 'Operational Staff', 'adhitya93@hotmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adrian Gunanta', 'Human Resources', 'Talent Management Specialist', 'adrian@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Afang Fauzi Al Fahri', 'Häagen-Dazs-Supply Chain', 'Driver', 'fauzi.alfari@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Agung Dwi Dismawanto', 'Häagen-Dazs-Operation', 'Operational Staff', 'agungdwidis@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Agustin Mardiana Jawa Doren', 'Häagen-Dazs-Supply Chain', 'Logistics Staff', 'mardianajawaunpam@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ahmad Fauzi', 'Häagen-Dazs-Operation', 'Operational Staff', 'ojiee1987@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ahmad Irfani', 'Häagen-Dazs-Operation', 'Café Supervisor', 'irfan@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ahmad Sahal', 'Häagen-Dazs-Management', 'Quality Regulatory Operational', 'sahal@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Akbar Filayadi', 'Häagen-Dazs-Operation', 'Operational Staff', 'akbarfilayadi@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Alan Adik Kusumah', 'Häagen-Dazs-Operation', 'Pastry Staff', 'sialanadikkusumah@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Amanda Kesha Avelyne Loupatty', 'Häagen-Dazs-Finance & Accounting', 'Finance Staff', 'amanda@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ambarsari Nur Ramaningsih', 'Häagen-Dazs-Management', 'Secretary', 'ambarsari@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Amirul Mukminin', 'Häagen-Dazs-Operation', 'Café Supervisor', 'amirul@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Andika Kameswara', 'Häagen-Dazs-Operation', 'Captain', 'andika@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Angga Andhika Yudianza', 'Häagen-Dazs-Operation', 'Café Supervisor', 'angga@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Angga Aria Sejati', 'Häagen-Dazs-Operation', 'Operational Staff', 'anggaari2104@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anggie Alicia Khatidjah', 'Häagen-Dazs-Finance & Accounting', 'Section Head of Accounting', 'anggie@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anisa Dwi Pridanti', 'Häagen-Dazs-Operation', 'Operational Staff', 'anisapridantii@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ansori', 'Häagen-Dazs-Operation', 'Operational Staff', 'anshory.z10@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aprizal Nurisya', 'Häagen-Dazs-Operation', 'Operational Staff', 'Viezalrizal@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ara Febra Ilham', 'Häagen-Dazs-Operation', 'Captain', 'ara@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ardana Mulia', 'Häagen-Dazs-Operation', 'Operational Staff', 'ardanamuliasaja@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ari Setyo Budi', 'Häagen-Dazs-Operation', 'Operational Staff', 'ariesetyobudi32@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aswad Mahdy Rahardjo SR', 'Häagen-Dazs-Operation', 'Captain', 'aswadrahardjo19@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Augnandrew Suherman', 'Häagen-Dazs-Operation', 'Café Supervisor', 'augnandrew@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aziz Muslihin', 'Häagen-Dazs-Operation', 'Operational Staff', 'muslihin537@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bambang Febrian Teguh Armanto', 'Häagen-Dazs-Operation', 'Café Supervisor', 'bambang@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Boy Malik Abdul Azis', 'Häagen-Dazs-Finance & Accounting', 'Inventory & Cost Control Staff', 'boymalik@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Budiyono', 'Häagen-Dazs-HR & GA', 'Driver - HO', 'rizkyananda798@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Christin Agvionita Hutagaol', 'Häagen-Dazs-Tax', 'Tax Coordinator', 'christin@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ciki Fitria Nusantari', 'Häagen-Dazs-Finance & Accounting', 'Accounting Staff', 'ciki@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Cut Mutiahrahmi', 'Häagen-Dazs-Operation', 'Captain', 'mutia@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Damas Yudhistira', 'Häagen-Dazs-Marketing', 'Graphic Designer', 'damas@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'David Arnol', 'Häagen-Dazs-Operation', 'Operational Staff', 'arnoldvianti@yahoo.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Davva Refy Pandita', 'Häagen-Dazs-Operation', 'Operational Staff', 'Dp12rf@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dede Juanda', 'Häagen-Dazs-Operation', 'Café Supervisor', 'dede@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dedi Setiono', 'Häagen-Dazs-Operation', 'Operational Staff', 'dedisetiono53@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dendy Catur Ariyanto', 'Häagen-Dazs-Operation', 'Operational Staff', 'dendynadira@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Denny Kurniawan', 'Häagen-Dazs-Supply Chain', 'Stock Keeper', 'dennykrnwn99@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dhany Dwi Hartanto', 'Häagen-Dazs-Planning & Business Development', 'Head of Planning & Business Development', 'dhany@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dia Ma''rofah', 'Häagen-Dazs-Operation', 'Operational Staff', 'diamarofah@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Didik Arisnandar', 'Häagen-Dazs-Operation', 'Operational Staff', 'dikaris799@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Diki Permana', 'Häagen-Dazs-IT', 'IT Staff', 'diki@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dio Rizky Ramadhan', 'Häagen-Dazs-Operation', 'Captain', 'dio@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Eka Vivi Agustin', 'Häagen-Dazs-Operation', 'Operational Staff', 'ekavivi01@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Eko Ramadansyah', 'Häagen-Dazs-Operation', 'Captain', 'ekoramadansyah@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Eko Ziarutko', 'Häagen-Dazs-Operation', 'Café Supervisor', 'eko@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fahmi', 'Häagen-Dazs-Operation', 'Café Supervisor', 'fahmicaptain@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fahruroji', 'Häagen-Dazs-Finance & Accounting', 'Collector', 'abahusna1984@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fajar Guntoro', 'Häagen-Dazs-Operation', 'District Manager', 'fajar@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fajar Okyandi', 'Häagen-Dazs-Operation', 'Café Supervisor', 'okyandi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fajrin', 'Häagen-Dazs-Operation', 'Operational Staff', 'Mefajrin@outlook.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ferry Ferdiansyah', 'Häagen-Dazs-Operation', 'Operational Staff', 'Ferryferdiansyah90@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fikhy Ridwansyah', 'Häagen-Dazs-Operation', 'Operational Staff', 'fikhyridwan@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fiqran Septiadi', 'Häagen-Dazs-Marketing', 'Graphic Designer', 'fiqran@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Firdza Rachmawati Oktavianty', 'Häagen-Dazs-Operation', 'Operational Administration Support', 'icha@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fitria Jala Dewi', 'Häagen-Dazs-Operation', 'Operational Staff', 'fitriajala.fj@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Frisca Avilla Syaharani', 'Häagen-Dazs-Operation', 'Operational Staff', 'avillafrisca@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Govita Candra Ordigosa', 'Häagen-Dazs-Operation', 'Captain', 'govita.candra305@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'H. Moh. Rozak', 'Häagen-Dazs-Operation', 'Operational Staff', 'coolkzor@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hairul Janwar', 'Häagen-Dazs-Operation', 'District Manager', 'hairul@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Harrys Juliansyah', 'Häagen-Dazs-Operation', 'Operational Staff', 'harisj30@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Helen Tri Lesmana', 'Häagen-Dazs-Operation', 'Captain', 'helentri@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Helmi', 'Häagen-Dazs-Operation', 'Acting Café Supervisor', 'helmi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hendrick Parulian', 'Häagen-Dazs-Operation', 'Captain', 'hendrick@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Heri Nurdin', 'Häagen-Dazs-Operation', 'Operational Staff', 'heryelkhoeir12@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Herlinda Hadi Widianingrum', 'Häagen-Dazs-Marketing', 'Brand Executive Coordinator', 'herlinda@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Heru Purnomo', 'Häagen-Dazs-Operation', 'Captain', 'heru@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hinggar Eri Prasetiya', 'Häagen-Dazs-Operation', 'Operational Staff', 'hinggarrambu@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Gede Astika Yasa', 'Häagen-Dazs-Operation', 'Captain', 'astika@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ikhsan Noor Hidayat', 'Häagen-Dazs-Operation', 'Pastry Staff', 'Ikhsan.hidayat3300@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Imam Cahyadi', 'Häagen-Dazs-Finance & Accounting', 'Collector', 'imamcahyadi1975@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Indri Paramita', 'Häagen-Dazs-Operation', 'Operational Staff', 'indriparamita14@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irdayanti', 'Häagen-Dazs-Operation', 'Operational Staff', 'irdamirza02@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irtha Fahtatih', 'Häagen-Dazs-Operation', 'Operational Staff', 'irthairsyah@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irwan Syahputra', 'Häagen-Dazs-Operation', 'Captain', 'Irwan@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Iskandar', 'Häagen-Dazs-Operation', 'Operational Staff', 'iskandarcayut46@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ita Raehana', 'Häagen-Dazs-Operation', 'Operational Staff', 'raehana.ita@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Julius Budi Purwanto', 'Häagen-Dazs-Operation', 'Café Supervisor', 'juliusbudi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Khurniawan', 'Häagen-Dazs-Supply Chain', 'Logistic Coordinator', 'awan@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kiki Widayati', 'Häagen-Dazs-Operation', 'Demi Chef', 'kiki@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kristanti Widaratna', 'Häagen-Dazs-Operation', 'Operational Staff', 'kristantiratna006@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kukuk Nurcahyono', 'Häagen-Dazs-Tax', 'Head of Department Tax', 'kukuk@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Liana Hardiyanti', 'Häagen-Dazs-Operation', 'Operational Staff', 'lianahardiyanti831@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lingkar', 'Häagen-Dazs-Operation', 'Café Supervisor', 'lingkar@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lukman Hakim', 'Häagen-Dazs-Operation', 'Pastry Staff', 'lukmanbaba333@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mahesha Julian', 'Häagen-Dazs-Operation', 'Operational Staff', 'mahesajulian95@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maria Uli', 'Häagen-Dazs-Operation', 'People & Benefit Supervisor', 'maria@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Marisa Cahyaningsih', 'Häagen-Dazs-Operation', 'Operational Staff', 'marisacahya3658@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Marshalita Kusuma Dewi S', 'Häagen-Dazs-Finance & Accounting', 'Accounting Staff', 'marshalita@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Miawati Nugraha Ardi', 'Häagen-Dazs-Supply Chain', 'Purchasing Coordinator', 'miawati@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Michael Thomas Sitanggang', 'Häagen-Dazs-Operation', 'Operational Staff', 'mychaelromance@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Moch. Choerul Fadli', 'Häagen-Dazs-HR & GA', 'Security', 'khoerul.fadli.kf@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Monika Budianto', 'Häagen-Dazs-Marketing', 'Head of Department Marketing', 'monika@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhamad Maja', 'Häagen-Dazs-Operation', 'Captain', 'maja@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Arrizal Kurniawan', 'Häagen-Dazs-HR & GA', 'Office Assistant', 'Arrizalkurniawan16@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Irsyad', 'Häagen-Dazs-Operation', 'Captain', 'irsyadsby@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Maulana Abizard Muslim', 'Häagen-Dazs-Operation', 'Operational Staff', 'maulanabzrd@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Rizky Fajar', 'Häagen-Dazs-Operation', 'District Manager', 'rizkyfajar@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Rusdi', 'Häagen-Dazs-Operation', 'District Manager', 'rusdi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Taufiq', 'Häagen-Dazs-Operation', 'Captain', 'taufik@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Yusuf', 'Häagen-Dazs-Operation', 'Operational Staff', 'ucupls95@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhtadin', 'Häagen-Dazs-Finance & Accounting', 'Inventory & Cost Control Coordinator', 'muhtadin@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mukhlis', 'Häagen-Dazs-Supply Chain', 'Section Head of Purchasing & Import', 'mukhlis@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Novi Yolanda', 'Häagen-Dazs-Operation', 'Operational Staff', 'novi.yolanda@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Noviana', 'Häagen-Dazs-Operation', 'Operational Staff', 'novianyadaffa@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Novyanti Debby Agatha Wullur', 'Häagen-Dazs-Operation', 'Operational Staff', 'debbywullur05@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nurseha', 'Häagen-Dazs-Operation', 'Operational Staff', 'Nurseha1919@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nurul Iman Anwar', 'Häagen-Dazs-Operation', 'District Manager', 'iman@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nurul Sahara', 'Häagen-Dazs-Operation', 'Operational Staff', 'syaraaudya@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Oki Dwi Saputro', 'Häagen-Dazs-Operation', 'Captain', 'okidwi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Oki Tri Wahyuni', 'Häagen-Dazs-Finance & Accounting', 'AP & AR Coordinator', 'okitriwahyuni@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Okky Melanton', 'Häagen-Dazs-Operation', 'Operational Staff', 'okkyrai@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Oktivia Putri Kuntarti', 'Häagen-Dazs-Operation', 'Operational Staff', 'oktivia22@yahoo.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Pitrianingsih', 'Häagen-Dazs-Supply Chain', 'Purchasing Staff', 'pitri@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Pramudita S Soedarjo', 'Häagen-Dazs-Marketing', 'Head of Department Social Media', 'ditasoedarjo@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Puji Rahayu', 'Häagen-Dazs-Operation', 'Operational Staff', 'harpietyamecca@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putri Kumala Sari', 'Häagen-Dazs-Operation', 'Operational Staff', 'Pu3.imuts@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putri Naumi', 'Häagen-Dazs-Operation', 'Operational Staff', 'ptrnaumi20@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Raenaldi Achmad Fauzi', 'Häagen-Dazs-Operation', 'Captain', 'raenaldi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rahma Dewi', 'Häagen-Dazs-Operation', 'Operational Staff', 'rahmadewi992@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rahmad Setiadi', 'Häagen-Dazs-Operation', 'Captain', 'rahmad@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rahmat Hidayat', 'Häagen-Dazs-Operation', 'Captain', 'rahmathidayat@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rendy Tyas', 'Häagen-Dazs-HR & GA', 'Security', 'RENDITYAS4@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rian Herdiansyah', 'Häagen-Dazs-Operation', 'Operational Staff', 'Juventinirian07@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ricky Hermawan', 'Häagen-Dazs-Operation', 'Operational Staff', 'rickyhermawan902@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ridho Shofiyana Nurzein', 'Häagen-Dazs-Operation', 'Operational Staff', 'ridhoshofiyana12@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rifki', 'Häagen-Dazs-Operation', 'Captain', 'rifki@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rima Andary', 'Häagen-Dazs-Operation', 'Operational Staff', 'rymaandary09@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rina Nirmala', 'Häagen-Dazs-Operation', 'Operational Staff', 'rina2008.rn@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rina Setyaningsih', 'Häagen-Dazs-Supply Chain', 'Section Head of Logistic', 'rina@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rio Pramonojati', 'Häagen-Dazs-Operation', 'Operational Staff', 'jatipramonorio29@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Riscvira Gyene', 'Häagen-Dazs-HR & GA', 'Office Assistant', 'riscvira@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rivaldi Aditya', 'Häagen-Dazs-Operation', 'Operational Staff', 'rivaldiaditya55@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Romei Nur Afip', 'Häagen-Dazs-Operation', 'Captain', 'romei@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Saiful Bahri', 'Häagen-Dazs-Operation', 'Captain', 'saiful@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Samsul Fajar', 'Häagen-Dazs-Operation', 'Captain', 'samsul@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sandi Tias', 'Häagen-Dazs-HR & GA', 'Messenger', 'varidasandi125@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Savitri Aulia Indah Puspita', 'Häagen-Dazs-Operation', 'Operational Staff', 'savitriaaaul@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Shindy Sarlita Amadea', 'Häagen-Dazs-Tax', 'Tax Staff', 'Shindy@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sigit Junaedi', 'Häagen-Dazs-Operation', 'Captain', 'sigit@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Siti Karmilah', 'Häagen-Dazs-Operation', 'Operational Staff', 'sitie.karmilah@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sony Liston', 'Häagen-Dazs-Operation', 'Café Supervisor', 'sonny@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sukamto', 'Häagen-Dazs-Supply Chain', 'Import Staff', 'sukamto@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sunarso', 'Häagen-Dazs-Operation', 'Captain', 'sunarso@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Susilawati Silaban', 'Häagen-Dazs-Operation', 'Operational Staff', 'Susie.lawaty@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syah Andi Saputra', 'Häagen-Dazs-Operation', 'Café Supervisor', 'syahandi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tengku Zuhrina Zulkarnain', 'Häagen-Dazs-Operation', 'Operational Staff', 'tengkuzuhrinazulkarnain@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tyas Rahmani', 'Häagen-Dazs-Operation', 'Operational Staff', 'tyas_rahmani@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tyas Romadhony', 'Häagen-Dazs-Operation', 'Captain', 'tyas@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Umi Musaropah', 'Häagen-Dazs-Operation', 'Operational Staff', 'umimusa610@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wawan Setiaji', 'Häagen-Dazs-Operation', 'Café Supervisor', 'wawan@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Welis Khairil', 'Häagen-Dazs-Operation', 'Operational Staff', 'weliskhairil30@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wendy Nabilah', 'Häagen-Dazs-Operation', 'Operational Staff', 'wndynblh@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Weny Sulis Tyowati', 'Häagen-Dazs-Operation', 'Café Supervisor', 'weny@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wiki Dwi Susanto', 'Häagen-Dazs-Finance & Accounting', 'Section Head of Inventory & Cost Control', 'wiki@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wilantika', 'Häagen-Dazs-Operation', 'Acting Captain', 'Wilantika0505@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yovanda Alia', 'Häagen-Dazs-Operation', 'Operational Staff', 'Aliayovanda@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yudha Aji Prasetya', 'Häagen-Dazs-Operation', 'Café Supervisor', 'yudha@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yuyun Yuliawati', 'Häagen-Dazs-Finance & Accounting', 'Section Head of Finance', 'yuyun@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Zakaria', 'Häagen-Dazs-Operation', 'Operational Staff', 'zaka17ria@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Indra Tjahya Hudaya', 'Marketing Communication', 'Marcomm Supervisor', 'indra.tjahya@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putrie Primacitra', 'Digital', 'Digital Video Content', 'putrie@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wisnu Wardhana', 'Research & Development', 'Program Development Executive', 'wisnu.wardhana@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Arie Puswitasari', 'Human Resources', 'Talent Management Lead', 'arie.puswitasari@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fadhli Rizal', 'Program', 'Production Operator', 'faigerhana@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lina Widyawati', 'Marketing', 'Traffic Staff', 'linawidya@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Livia Ramadhita', 'Public Relation & Business Communication', 'Senior Public Relation & Business Communication', 'livia.ramadhita@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nesya Augustari Angre', 'Finance & Accounting', 'Treasury Supervisor', 'nesya@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Gede Adi Suwardana', 'Program', 'Program Director', 'dana@hardrockfm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Ketut Gede Agung Pradana', 'Program', 'Broadcast Operator', 'gung.pradana28@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ida Bagus Astaran', 'Program', 'Broadcast Operator', 'guscakmy@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Qairani Yasinta', 'Marketing', 'Client Services', 'raniyasinta@hardrockfm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ricardo Christian Leonard K', 'Management', 'Operations Manager', 'ricardo@hardrockfm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lie Fuk Kin', 'Management', 'Sales & Operation Coordinator', 'fukkin@hardrockfm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Agil Santoso', 'Program', 'Creative Assistant', 'agil.santoso@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Atta Noor Akhdiyat', 'Finance & Accounting', 'Finance Administration Staff', 'atta@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bima Hartawiyana', 'IT & Teknik', 'Technician', 'bima@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hari Prastowo', 'General Affair', 'Security', '82hprastowo@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Indah Widayanti', 'Program', 'Assistant Account Manager', 'indah@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kaniarani Mutiara Sasitami', 'Marketing', 'Account Executive', 'kania@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mahmud Hidayat', 'Marketing & Communication', 'Program Coordinator', 'mada@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ruri Oktovira', 'Management', 'Operations Manager', 'ruri@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Surmiyanto', 'General Affair', 'General Affair Staff', 'yanto@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Triyanto', 'Program', 'Broadcast Operator', 'ratupetruk60@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Asmadi', 'General Affair', 'Messenger', 'adijulek@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Deni Andika', 'General Affair', 'Driver', 'denykuclluk85@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dina Mariza Said', 'Marketing', 'Senior Account Executive', 'dina@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mohammad Indra Fadilah', 'Program', 'Broadcast Operator', 'nda.portnoy@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mohammad Ikhsan', 'Program', 'Creative Assistant', 'moc.ichsan@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rana Irawan', 'IT & Teknik', 'Technician', 'rana@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sita Mahaputri', 'Management', 'Executive Secretary', 'sita@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Vitali Ridho Imansyah', 'Marketing Communication', 'Planner and Strategic Event Manager', 'didot@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ainun Nur Oktaviani A', 'Program', 'Creative Assistant Digital', 'ainun@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Febrina Fadliana Faisal', 'Finance & Accounting', 'Chief Accountant', 'febrina@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kamarudin', 'General Affair', 'Office Boy', 'bibifadil@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'M. Taufiq', 'Program', 'Broadcast Operator', 'taufik@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nara Dwitya Baskara', 'Management', 'Operations Manager', 'nara@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Risdiansyah', 'Marketing', 'Senior Account Executive', 'risdiansyah@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rizka Kemala Rabiah', 'Program', 'Secretary', 'rizkemala@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tajuddin', 'General Affair', 'Office Boy', 'teje.lulu@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Feby Kurniya', 'Program', 'Program Coordinator', 'feby@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adi Pebrian Rahman', 'Program', 'Creative Assistant', 'adirahman@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Agnes Fina Rugun Doritua Nainggolan', 'Program', 'Account Executive', 'agnes@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Arif Riza Hidayat', 'Program', 'Broadcast Operator', 'dayatarif755@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Christina Surati', 'Finance & Accounting', 'Admin Finance', 'christina@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Fitri', 'Program', 'Broadcast Operator', 'yogginusatia@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'M. Hamnie Rofiq', 'General Affair', 'Office Boy', 'm.h4mnier0fiq@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'M. Iqbal Hary Aditya Maulana', 'Program', 'Broadcast Operator', 'iqbaladitya09@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Afif Aziya', 'Management', 'Operations Manager', 'afif.aziya@iradiofm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dedy Koswara', 'Marketing Communication', 'Senior Marcomm Manager', 'dedy.koswara@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dila Fiona Wiharto', 'Public Relation & Business Communication', 'Asst. PR Manager', 'dylla@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Edy Soeroso', 'IT & Teknik', 'Chief Technician', 'edy@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Elisabeth N Pasaka', 'Management', 'Head Of Sales', 'elsa.pasaka@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hendrawan Wahyudianto', 'Creative Marketing Strategy', 'Creative Director', 'hendrawan.wahyudianto@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Marco Anjasmoro Taranggono', 'Management', 'Group Station Manager', 'marco@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Paramita A Soedarjo', 'Management', 'Head of MRA Publisher', 'mita@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rastria Dwi Shinta', 'Finance & Accounting', 'Tax Manager', 'rastria.shinta@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rita Novi Yanti', 'Finance & Accounting', 'Finance & Accounting Manager', 'rita@mrafb.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Emera Boga Makmur'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Asep Foerwanto', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'asep@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Nyoman Ardiana', 'IT & Teknik', 'Senior Technician', 'komang@hardrockfm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Audrey Josephine', 'Public Relation & Business Communication', 'PRBC Staff', 'audrey@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anastasia Yumika Putri', 'General Affair', 'Procurement & Vendor Management', 'anastasia.putri@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Josepri Padang', 'Häagen-Dazs-Marketing', 'IT Staff', 'josepri@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Eghi Satria Adipraja', 'Häagen-Dazs-HR & GA', 'Security', 'eghisatriaadipraja@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Alaric Benjamin T''sidkenu Ardania', 'Marketing Communication', 'Marcomm Staff', 'alaric.benjamin@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dhea Rahmawati Putri', 'Finance & Accounting', 'Accounting Staff', 'dhea.putri@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Erlangga Namaskoro', 'Studio Photography', 'Digital Imaging Staff', 'erlangga.namaskoro@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nadia Dwiyanti', 'Finance & Accounting', 'Tax Officer', 'nadia.dwiyanti@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ellena Azisia Dianny Putri', 'Redaksi Cosmopolitan', 'Digital Writer', 'ellena.azisia@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Suggesti Alifya', 'Advertising Sales', 'Account Executive', 'suggesti.alifya@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Audhya Ananda Putri', 'Parentalk', 'Sales Manager', 'audhyananda.parentalk@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Firman Desrianto', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'desriantofirman@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Husein Asshiddiq', 'Marketing Communication', 'Admin Staff', 'muhammad.husein@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fina Putri Nabilah', 'Häagen-Dazs-Finance & Accounting', 'Accounting Staff', 'finna@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Zalfa Anka Aprilianti', 'Häagen-Dazs-Marketing', 'Acting Sales & Event Coordinator', 'zalfa@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dewi Ratna Febrianty', 'Marketing Communication', 'Marcomm Lead', 'dewi.ratna@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ricky S Mangisi', 'Häagen-Dazs-Operation', 'Head of Department Operational & Shop Development', 'ricky@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Haidir Muslim Juanda', 'Finance & Accounting', 'Tax Supervisor', 'haidir@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Andi Widya Natari Syam', 'Häagen-Dazs-Planning & Business Development', 'Project Development Manager', 'andiwidya@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Herudin', 'Häagen-Dazs-Operation', 'Pastry Staff', 'herudin510@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syanti Dewi', 'Häagen-Dazs-Management', 'General Manager', 'syanti@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Gracia Nathanya Djodi', 'Redaksi Her World', 'Art Designer', 'gracia.nathanya@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Randy Siskandar', 'Public Relation & Business Communication', 'PRBC Supervisor', 'randy_siskandar@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mochamad Pulung Raharjanto', 'Art Jakarta', 'Assistant Show Management', 'pulung@artjakarta.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Samantha Jolene Sujantono', 'Art Jakarta', 'Graphic Designer', 'design@artjakarta.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ratna Neli Agustin', 'Häagen-Dazs-Operation', 'Operational Staff', 'ratnaneli99@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tri Widowati', 'Human Resources', 'Human Resources Business Partner', 'wido@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Emera Boga Makmur'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lintang Cahya Dewinta Afdellyn', 'Häagen-Dazs-Marketing', 'Acting Corporate Partnership Coordinator', 'lintang@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Arief Fachrudhin', 'IT & Teknik', 'Technician', 'fachrudhinarief@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Edy Ardaya', 'General Affair', 'Security Pemancar', 'ediardaya@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Thomas', 'IT & Teknik', 'Technician', 'radiothomas879@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Diah Pithaloka', 'Marketing Communication', 'Marcomm Staff', 'diah.pithaloka@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Santana Krisna', 'General Affair', 'Security', 'santanakrisna62@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Endang Komar', 'General Affair', 'Security', 'endangkomar72@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ana Supriatna', 'General Affair', 'Security', 'anasupriatna1474@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rhido Pratama', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'dhopra77@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rianti Fajar Ningsih', 'Redaksi Mother & Beyond', 'Editor', 'rianti.fajar@motherandbeyond.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adelia Riyan Nandini', 'Advertising Sales', 'Account Executive', 'adelia.riyan@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Amanda Layla Pradipta', 'Redaksi Her World', 'Social Media Reporter', 'amanda.layla@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Gifari Nahar', 'Häagen-Dazs-Supply Chain', 'Supply Chain Analyst & Controller', 'gifari@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adzkia Asakiinah', 'Redaksi Harper''s Bazaar', 'Graphic Designer', 'adzkia.asakiinah@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wardiman', 'Häagen-Dazs-Operation', 'Pastry Staff', 'Wardiman2110@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tri Suryo Nugroho', 'Finance & Accounting', 'Billing & Collection Staff', 'tio@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tauhid Djasa Haditya', 'Häagen-Dazs-Retail', 'Sales Data Analyst', 'tauhid@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rachma Mutiara', 'Häagen-Dazs-Finance & Accounting', 'Finance Staff', 'rachma@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Miolin Dwi Feiby Limbong', 'Häagen-Dazs-Finance & Accounting', 'Finance & Accounting Staff', 'miolin@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aleyda Nashia Hakim', 'Redaksi Harper''s Bazaar', 'Senior Digital Writer', 'aleyda.nashia@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adrian Jeihansyah Umar', 'Häagen-Dazs-Finance & Accounting', 'Finance Controller', 'adrian.umar@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Crussita Yusuf', 'Häagen-Dazs-Operation', 'Pastry Staff', 'crussitayusuf24@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Insan Kalami', 'Häagen-Dazs-Retail', 'Food Service Supervisor', 'insan@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fikri Mauludin', 'Häagen-Dazs-Operation', 'Operational Staff', 'fikrimaul31@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ocha Rossawita Lestari', 'Marketing Communication', 'Marcomm Supervisor', 'ocha.rossawita@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Vira Ardhia Pramesthi Jayanti', 'Häagen-Dazs-Finance & Accounting', 'Finance Staff', 'vira@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lintang Sukmana Wahyudi', 'Studio Photography', 'Photographer', 'lintang.sukmana@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Siti Aisyah Nurhasanah', 'Häagen-Dazs-Operation', 'Operational Staff', 'aisyahnh2312@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adam Femy Siswanto', 'Digital', 'Audiovisual Supervisor', 'adam@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ivan Hardianto', 'Häagen-Dazs-Operation', 'Operational Staff', 'ivanhardian647@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Santi Rubianti', 'Häagen-Dazs-Retail', 'Section Head of Department Sales Merchandiser', 'santi.rubianti@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sinta Giri Suputri', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'sintagiri49@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Deva Wulan Ifada', 'Parentalk', 'Admin & General Affair', 'deva.parentalk@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mukhsiful Amhar', 'Häagen-Dazs-Operation', 'Operational Staff', 'mukhsifula@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Resnu Dwi Andika', 'Parentalk', 'Senior Videographer & Editor', 'resnu.parentalk@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Claresta Ansliene', 'Häagen-Dazs-Operation', 'Pastry Coordinator', 'ansliene@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adji Tenggerdjati Pringga Ranander', 'Häagen-Dazs-Operation', 'Operational Staff', 'adji.tenggerdjati@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Zefania Alex Owen Sinaga', 'Häagen-Dazs-Planning & Business Development', 'Project Development Staff', 'owen@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Emirat Joesua', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'jsalendu1@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hilda Noviarti Miraj', 'Häagen-Dazs-Operation', 'Operational Staff', 'hildanovmir@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Achmad Syaiful', 'Häagen-Dazs-HR & GA', 'Security', 'achmadsyaiful099@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jelti Jesye Makahekung', 'Häagen-Dazs-Operation', 'Operational Staff', 'jjmakahekung@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Elizabeth Alicia Terisno', 'Redaksi Cosmopolitan', 'Digital Writer', 'elizabeth.alicia@cosmopolitan.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Reza Desandy Asyar', 'Marketing Communication', 'Production Manager', 'reza.desandy@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tiara Fitri Salsabillah', 'Häagen-Dazs-Operation', 'Operational Staff', 'tiarafs17102021@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rade Dimas Pangestu', 'Häagen-Dazs-Operation', 'Admin Pastry', 'radedhimaz@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ahmad Reza Alfian', 'Häagen-Dazs-Supply Chain', 'Purchasing Staff', 'reza@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wisnu Saputra', 'Audiovisual', 'Video Editor', 'wiznuruha@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fenny Marandita', 'Marketing', 'Account Executive', 'fenny@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rafli Nayaka Wahyu Ardiaz', 'Program', 'Creative Assistant', 'rafli@therockinlife.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Firnad Alhadi', 'Häagen-Dazs-Supply Chain', 'Driver', 'firnadalhadi@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Henheryana Suci Sundara', 'Finance & Accounting', 'Finance Controller', 'henhen@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kandida Rani Nyaribunyi', 'Art Jakarta', 'Assistant Exhibitor Manager', 'bunyi@artjakarta.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Shafa Salsabila', 'Art Jakarta', 'Assistant Partnership', 'write.shafa@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ryan Theo Jonathan', 'Art Jakarta', 'Assistant Artistic', 'jryantheo@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kartika Indriani', 'Program', 'Assistant Program Director', 'kartika@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rizky Setiawan', 'Häagen-Dazs-Operation', 'Operational Staff', 'rizkysxxxxxxx2705@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Nasir', 'IT & Teknik', 'Technician', 'nasir_masri@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Gusti Agung Ayu Friska Devia', 'Häagen-Dazs-Retail', 'Sales Merchandiser', 'friskadevia@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Doni Wirawan', 'Häagen-Dazs-Retail', 'Head of Department Retail & Sales', 'doni@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Rizky Prasetya', 'Häagen-Dazs-Retail', 'Sales Merchandiser HORECA', 'kikykprasetya@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yanuar Sugiharto', 'Häagen-Dazs-Planning & Business Development', 'Training Manager', 'yanuar@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jimmy Martin', 'Häagen-Dazs-Operation', 'Operational Staff', 'jimmy.martin4.9.21@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bagus Widiyanto', 'Häagen-Dazs-Operation', 'Operational Staff', 'baguswidiyanto2000@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Allan Budi Wijaya', 'Digital', 'Videographer', 'allan@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rizky Oktavia', 'Häagen-Dazs-Operation', 'Operational Staff', 'rzkyoktavia31@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aries Ramdhan', 'Häagen-Dazs-Operation', 'Operational Staff', 'ariesramadhan111@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Gheofanny Arlen Tambunan', 'Redaksi Harper''s Bazaar', 'Fashion Editor', 'gheofanny@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dhika Ayu Syafira', 'General Affair', 'Procurement & Vendor Management', 'dhika.ayu@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Alif Asyraf Ryandiputra', 'Program', 'Broadcast Operator', 'alifryandiputra@GMAIL.COM', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hol Ardi Ferdi', 'General Affair', 'Office Boy', 'ardy310197@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Rizwan', 'MRA Digital', 'Full Stack Developer', 'm.rizwan@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Randi Darmasaputra', 'MRA Digital', 'Performance Marketing Manager', 'randi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dennis Alexandry', 'MRA Digital', 'Data & Monetization Manager', 'dennis@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ni Made Andyani Pratiwi', 'Digital', 'Production Podcast Officer', 'andyani.pratiwi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ridho Al Amin', 'Parentalk', 'Videographer & Editor Staff', 'ridho.parentalk@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Didid Cindarbumi', 'MRA Digital', 'Digital Growth Manager', 'didid@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Farhadad Isa Djafar', 'Häagen-Dazs-Supply Chain', 'Driver', 'farhadaddjafar12@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Zeid Abdul Kadir', 'Häagen-Dazs-HR & GA', 'Security', 'zheidkadir@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nur Hafidah', 'Finance & Accounting', 'Finance Administration Staff', 'nurhafidah@therockinlife.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bryan Bianconeri Giat', 'Häagen-Dazs-Planning & Business Development', 'Business Planning Analyst', 'bryan@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nisrina Tahadatul A''is', 'MRA Digital', 'Admin', 'nisrina@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rizky Andiarto', 'MRA Digital', 'Jr Full Stack Developer', 'rizky.andiarto@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Vania Ramadhani Prayogi', 'Marketing Communication', 'Marcomm Staff', 'vania.ramadhani@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Verrel Najmi Aflah A', 'Häagen-Dazs-Operation', 'Operational Staff', 'verrelnajmi64@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'GT Aditya Medika Permana', 'Redaksi Harper''s Bazaar', 'Managing Editor', 'aditya.medika@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adrian Alifullah', 'Häagen-Dazs-Planning & Business Development', 'Project Development Staff', 'adrian.alifullah@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rhenaldo Partogi Gultom', 'Häagen-Dazs-Operation', 'Operational Staff (Training)', 'gultomrenaldo@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sri Yudha Fitria Dwi Cahyono', 'Management', 'Operations Manager', 'sriyudha@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Denny Hidayat', 'Management', 'Operations Manager', 'denny@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kelana', 'Program', 'Broadcast Operator', 'kelana@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hayati Sondang Pasaribu', 'Finance & Accounting', 'Finance Administration Staff', 'sondang@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hamka Haris', 'Program', 'Broadcast & Production Operator', 'hamka@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jul Yadi', 'Program', 'Broadcast Operator', 'julyadi@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Farida Firdani', 'Parentalk', 'Content Lead', 'firda.parentalk@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Emera Digital Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hashfi Muhammad Hadyan', 'Advertising Sales', 'Assistant Account Manager', 'hashfi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fikri Amaludin', 'Häagen-Dazs-Operation', 'Operational Staff', 'fikriamaludin08@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Segy Nopaldy', 'Häagen-Dazs-Operation', 'Operational Staff', 'segynovaldy006@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Julia Citra Hutauruk', 'Häagen-Dazs-Operation', 'Operational Staff', 'citrajuliahutauruk@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Ghessa Pratama', 'Häagen-Dazs-Operation', 'Operational Staff', 'ghessaprtma291103@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sultan Harris', 'Häagen-Dazs-Operation', 'Operational Staff', 'sultanh5702@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Andre Wisnu Putra K', 'Program', 'Production Operator', 'andrewisnu475@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Silvia Rianto', 'Häagen-Dazs-Operation', 'Operational Staff', '20silviarianto@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maulina Dwi Yuniasih', 'Häagen-Dazs-Operation', 'Pastry Staff', 'maulinadwiyuniasih@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Fikri Ihsan', 'Häagen-Dazs-Operation', 'Operational Staff', 'muuhiis1@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Masrina', 'Häagen-Dazs-Operation', 'Operational Staff (Training)', 'masrinaanjani12@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syafrizal Rizky', 'Häagen-Dazs-Operation', 'Pastry Staff', 'syafrizalrizky99@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rizky Asbari', 'Häagen-Dazs-Supply Chain', 'Driver', 'asbarigani@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dimas Bagus Ferdiansyah', 'Häagen-Dazs-Operation', 'Pastry Staff', 'dimsbagusfe@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aurelia Maharani Tedja', 'Program', 'Creative Assistant Digital', 'aurelia.tedja@therockinlife.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Syeran Aliansyah', 'Marketing Communication', 'Marcomm Staff', 'syeran.aliansyah@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Cascia Friska', 'Digital', 'Podcast Creative', 'cascia.friska@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Asatria Putra Prasadana', 'Program', 'Broadcast Operator', 'asatriaputra95@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'RD. Media Retnosari', 'Häagen-Dazs-Finance & Accounting', 'Finance & Accounting Manager', 'medi@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irwan Setiawan', 'General Affair', 'Security', 'irwansetiawan.dummy@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Dewa Nyoman Aditya Permana', 'Häagen-Dazs-Supply Chain', 'Logistics Admin', 'idewanyoman460@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rizky Akbar Rukmana', 'Häagen-Dazs-Operation', 'Steward', 'rizkyakbarrukmana9c@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maura Livia Amanda', 'Program', 'Creative Assistant', 'maura@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ni Putu Wimas Lestari Dewi', 'Häagen-Dazs-Retail', 'Retail Admin', 'wimasld38@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hamad Etok Parta Kusuma', 'Häagen-Dazs-Operation', 'Chef de Partie Pastry', 'hamad@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Astri Krismawati', 'Häagen-Dazs-Operation', 'Operational Staff', 'low.jobdesk@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Natasya Fitrianda Putri', 'Redaksi Her World', 'Beauty Writer', 'natasya@herworld.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Naura Tri Kamilla', 'Redaksi Harper''s Bazaar', 'Digital Writer', 'naura.kamila@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muh. Ikzar Najib', 'General Affair', 'Security', 'ikzarnajib271101@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fara Safitri', 'Finance & Accounting', 'Assistant Finance Manager', 'fara.safitri@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Surya Swara Mediatama'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Handito Lava Daenova', 'Marketing Communication', 'Marcomm Staff', 'handito.daenova@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dimas Saputra', 'Marketing Communication', 'Marcomm Staff', 'dimas.saputra@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Deri Restu Nugraha', 'Audiovisual', 'Video Editor', 'derygimbal@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Astri Cintavaty Akmal', 'Redaksi Cosmopolitan', 'Digital Writer', 'astri.akmal@cosmopolita.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Puti Emily Naima Sukawati', 'Redaksi Harper''s Bazaar', 'Digital Writer', 'puti.sukawati@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sulthan Taqi Rabbani', 'MRA Digital', 'Full Stack Developer', 'sulthan.rabbani@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rahmatunisa', 'Program', 'Admin Staff', 'rahmatunisa@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maulana Indraguna Sutowo', 'Director', 'Chief Executive Officer', 'indraguna@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Shopani  Utami', 'Finance & Accounting', 'Staff Accounting', 'shopani@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dwi Aristianto', 'Finance & Accounting', 'Finance Controller', 'aristianto@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Indhira  Nurika', 'Finance & Accounting', 'Financial Planning Analyst', 'indhira@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tedy  Rostedy', 'Tax & Audit', 'Corporate Tax Manager', 'odiel@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dewi  Fefriyanti', 'Tax & Audit', 'Tax Officer', 'dewi@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irwan  Yuniar', 'Information & Technology', 'Technical Support', 'irwan@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kustia Herawan', 'Information & Technology', 'Programmer', 'kustia@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Umar Khatab', 'Information & Technology', 'Programmer', 'umar@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mulyono', 'General Affair', 'Driver', 'myono389@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lies Hanum Indrayani', 'General Affair', 'Compliance Manager', 'lies@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putri Rahayu Soedarjo', 'Director', 'Director', 'putri@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fachruddin', 'General Affair', 'Office Boy', 'Fachruddin2975@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rusmiati', 'General Affair', 'Office Girl', 'miarusmiati0586@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Titi Nastiti', 'Corporate Administration', 'Jr. Secretary', 'titi@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dinnar Sylviani', 'Finance & Accounting', 'Senior Accounting', 'dinaramli7@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fera Fiorita', 'Finance & Accounting', 'Senior Tax', 'fera_mahadewi@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Deddy Freddy', 'HRGA', 'Driver', 'deddyfreddy42@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rani Yultri Harce', 'HRGA', 'Office Girl', 'rany.yultriharce007@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhamad Kadafi', 'HRGA', 'Office Boy', 'muhamadkadafi576@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anisa Paramitha W', 'Marketing & Communication', 'Advertising & Media Relations Sr. Asst. Mgr.', 'paramithasasa@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sri Dewi Yulianti', 'Merchandise', 'Asst. Mgr Logistic', 'sdyulianti@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hartoyo', 'Service Center', 'Asst. Wholesales & Service Center Mgr.', 'hartoyo23@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Willy Ferdiand', 'Service Center', 'Technician', 'willy.ferdiand@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yulia Fizriyan Eka Putri', 'Finance & Accounting', 'Senior Finance', 'fizriyany@yahoo.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lira Sihaloho', 'Merchandise', 'Logistics & Merchandising Specialist', 'lira.sihaloho47@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yudith Chitraresmi', 'Finance & Accounting', 'Chief Accounting', 'ychitraresmi@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hidayah Indriastuti', 'Finance & Accounting', 'Finance & Accounting Mgr', 'ndi_hy@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Herdiansyah', 'Sales', 'Supervisor', 'herdy.anggra@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bedi Hariyanto', 'Sales', 'Senior Sales Staff', 'bdy05mei@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Teddy Fitrian Ardiyanto', 'Sales', 'Senior Sales Staff', 'teddyfitrian@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lutfia Syafitri', 'Sales', 'Senior Sales Staff', 'lutfiasyaffitri@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Siska Nurhalimah', 'Sales', 'VIP Client Advisor', 'siskanurhalimah854@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Irma Rizki Setyawati', 'Sales', 'Senior Sales Staff', 'irmarizky15@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sang Ayu Putu Dwimarini', 'Sales', 'Supervisor', 'kezia_ayu@hotmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Bali'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dini Wilyasari', 'Sales', 'Sales Staff', 'diniwilyasari@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Arif Nugraha', 'Sales', 'Sales Staff', 'arif.mss101@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syandy Maulana', 'Sales', 'Senior Sales Staff', 'syandym@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ajeng Mustika Furi', 'Sales', 'Sales Staff', 'ajenk.azka@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dian Permata Sari', 'Sales', 'Senior VM Specialist', 'dian@mogems.co.id', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tomy Triawan', 'Sales', 'Sales Staff', 'tomytriawan@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Bali'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ari Kurniawan', 'Sales', 'Sales Staff', 'arikurniawan0903@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'I Made Yoga Satriawan', 'Sales', 'Sales Staff', 'yogasatriawan26@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Bali'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jousli Natalia', 'Finance & Accounting', 'Finance Controller', 'natalia@mraretail.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Permata Landmarq Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yunizar Ichsan', 'Finance & Accounting', 'Tax Manager', 'yunizar.ichsan@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT Permata Landmarq Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tinny', 'General Affair', 'General Affair Business Partner', 'maria@mogems.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Permata Landmarq Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Stefanie Soewono', 'Marketing & Communication', 'Vice President Marketing & Communication', 'tefi0903@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Permata Landmarq Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Derry Arianto', 'Service Center', 'Workshop Manager & Head Technician', 'derryarianto91@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Service Center'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Erick Winata', 'Wholesale Department', 'Sales Manager', 'erickwinata3082@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kamil Kusmandani', 'Finance & Accounting Department', 'Logistics Manager', 'k.kusmandani@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maryadi', 'Sales and Operations Department', 'Tenaga Ahli Poles', 'mrydtpse@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Service Center'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhamad Isnan NB', 'Finance & Accounting Department', 'Kurir Logistik', 'qinanuwew@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Privanka Dhimitra', 'Marketing Department', 'Marketing Staff', 'anka@hourlogy.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syahrul Rahmat Salim', 'Service Center', 'Junior Technician', 'syahrulrahmat81@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Service Center'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wahyudin Lukmana Yusup', 'Finance & Accounting Department', 'Logistics Staff', 'lukmanayusup@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Andrianto', 'Sales and Operations Department', 'Sales Associate', 'andreanto5915@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anna Pratiwi', 'Sales and Operations Department', 'Sales Associate', 'itsauthorlewis@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Tunjungan Plaza 4 Surabaya'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bachtiyar Rahmadona', 'Sales and Operations Department', 'Supervisor Boutique', 'rahmadonatiar@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ega Nur Mawarni', 'Sales and Operations Department', 'Sales Associate', 'egamawarni10@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ferdi Restian', 'Sales and Operations Department', 'Sales Associate', 'restianferdi89@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Tunjungan Plaza 4 Surabaya'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Firmansyah', 'Finance & Accounting Department', 'IT Support', 'firmansyahh231@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lidya Ayu Susanti', 'Sales and Operations Department', 'Sales Associate', 'lidiaayu0811@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nina Ayu Triana', 'Finance & Accounting Department', 'Accounting & Tax Staff', 'ninayu.triana@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Orchidarina Pranatio', 'Human Resource', 'Secretary of President Director', 'orchid1345ume@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Moh Fajarudin', 'Sales and Operations Department', 'Office Boy', 'guttzer71@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Susanti', 'Finance & Accounting Department', 'Finance & Accounting Manager', 'susantiserenity85@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Renaldi Martin Hutasoit', 'Direktur Utama', 'Direktur Utama', 'renaldihutasoit@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Susi Bong', 'Corporate Administration', 'Chief Operating Officer', 'susib@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Soetikno Soedarjo', 'Komisaris', 'Komisaris', 'soetikno@mradummy.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Teguh Widi Suseno', 'General Affair', 'Building & Facility Management', 'teguh@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Graha Emera Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aris Setiyono', 'Information & Technology', 'IT Assistant Manager', 'csv.ares@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Permata Landmarq Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kristinus Ndruru', 'Finance & Accounting Department', 'Logistics Staff', 'kristinusndruru@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Marco Jeremia Laoh', 'Customer Relationship Management', 'Customer Relation Officer', 'marcojeremia9@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Renaldi Martin Hutasoit', 'Management', 'Director Operational', 'renaldi@mraretail.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Permata Landmarq Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hafis Hidayati', 'Corporate Administration', 'Personal Assistant', 'hafis@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jessica Hartanto', 'Sales', 'Operations Manager', 'brscjessica@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Tripin Indrayani', 'Sales and Operations Department', 'Sales Associate', 'indrayani.3pin87@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dino Arifiadi Nugraha', 'Sales and Operations Department', 'Sales Associate', 'dinonugroho910@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Tunjungan Plaza 4 Surabaya'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Andi Supriyanto', 'Service Center', 'Polisher', 'andyslash50@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jonhardi Candra', 'Sales', 'Sales Staff', 'jonhardi.candra12@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Elsa Paramitha', 'Corporate Administration', 'Group Business Financial Analyst', 'elsa@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Thomas Arya Aditya', 'Marketing Department', 'Social Media Specialist', 'thomasaryaaditya@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ricky Darmansyah', 'Service Center', 'Sales Associate', 'darmansyahriq@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Mall Kelapa Gading 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Andreas Wisnu Bharata', 'Service Center', 'Technician', 'andreas.wisnubig@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Service Center'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Astri Hirdaningtyas', 'Marketing Department', 'PR & Marketing Manager', 'hirdaningtyas.a@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Listy Inezia Amanda Tedjo', 'Sales', 'Store Manager', 'ineziaamanda@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Bali'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rahman', 'Human Resource', 'Driver', 'Rahman240278@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fajar Tri Pitoyo', 'Sales and Operations Department', 'Sales Associate', 'tripitoyofajar@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dimas Andriyanto', 'Marketing & Communication', 'Event & Promotion Assistant Manager', 'dimasandrynt@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aditya Reza Pratama', 'Sales and Operations Department', 'Sales Associate', 'adityarezapratama1998@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Anisa Moniq Febriani', 'Sales', 'Store Manager', 'anisamoniqfebriani@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bagus Nugraha', 'Finance & Accounting', 'Finance & Accounting Supervisor', 'bagus_nugraha99@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hana Maria Veronika', 'Operational', 'Admin Marketplace & Sosial Media', 'hanasilalahi20@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Maryadi', 'HRGA', 'Office Boy', 'maryadiyadi393@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Alvin', 'Sales', 'Sales Staff', 'alvinsjarif@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nadira Elysia Putri', 'Marketing & Communication', 'Brand Marketing Executive', 'nadira.elysia04@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Egi Priyana', 'Sales and Operations Department', 'Sales Associate', 'egipriyana391@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Mall Kelapa Gading 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dewi Youlanda Motoh', 'Marketing & Communication', 'Pop Up Store & Podium Manager', 'youlanda.motoh@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Daniel Aditya Harso', 'Sales and Operations Department', 'Retail Operations Manager', 'daniel.aditya@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ananda Maulana Hakim', 'Human Resource', 'Office Boy', 'maoelhakim@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Luluk Fauziah', 'Sales and Operations Department', 'Supervisor Boutique', 'luluk@hourlogy.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nurredza Kusuma Putra', 'Sales and Operations Department', 'Supervisor Boutique', 'nurredza1990@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Mall Kelapa Gading 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Christi Martha Ayudiah Damanik', 'HRGA', 'Front Office Administration', 'christimartha00@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Jemma Putri International'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Richie Bagoes Wahyoe', 'Sales', 'Sales Staff', 'richiebagus9@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Bali'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Indira Prabawati M', 'Sales and Operations Department', 'Boutique Manager', 'indiramahendra25@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Febi Ramadani', 'Operational', 'E-Commerce & Web Staff', 'cvs.febi@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Ferry Alfariza', 'General Affair', 'General Affair (GA) Manager', 'ferry@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ade Ines Rahmawati Naibaho', 'Sales and Operations Department', 'Sales Associate', 'inesk973@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Mall Kelapa Gading 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Adimas Panji', 'Service Center', 'Customer Service Supervisor', 'panjiadimas@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Service Center'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ariel Alonzo Untung', 'Sales and Operations Department', 'Boutique Manager', 'arielalonzountung@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Mall Kelapa Gading 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'John Patrick Louhanapessy', 'Sales and Operations Department', 'Sales Associate', 'john19mazdajaktim@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nadya Deninda Rachman', 'Finance & Accounting', 'Junior Accounting', 'denindanadya@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Medical Claim', 'Human Resource', 'Medical', 'medicalclaimmra@gmail.com', 'Active',
         id FROM m_company WHERE name = 'Medical Claim'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhamad Agus Saepul Nugraha', 'Sales', 'Sales Staff', 'muhamadagussaepulnugraha02@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dwi Woelan R', 'Finance & Accounting', 'Finance & Accounting Manager', 'woelan@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Graha Emera Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rinta Asri Nurwindiastuti', 'Marketing & Communication', 'Podium & Pop-ups Activation Manager', 'asri.rinta@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Pambudi Laksono', 'Sales and Operations Department', 'Sales Associate', 'ebing3pam@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Tunjungan Plaza 4 Surabaya'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syeila Dwinta Amadea', 'General Affair', 'Legal & Corporate Affairs Jr. Manager', 'syeila@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Imelda Junita', 'Sales', 'Sales Staff', 'imeldajunitaa22@gmail.com', 'Active',
         id FROM m_company WHERE name = 'MPI - Store Bvlgari Plaza Indonesia'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Erin Dwi Fayola', 'Marketing & Communication', 'OmniChannel Activation Officer', 'erinfayolaa@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aji Fradika', 'Sales and Operations Department', 'Sales Associate', 'ajifradika0@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fitriani Suci Sujana', 'Human Resources', 'C&B, OD & PM Lead', 'fitri@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Eldwita Rizky Oktari', 'Human Resources', 'HRIS & Admin Lead', 'tata@mogems.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kezia Abelina', 'Human Resource', 'HR Administrator', 'keziaabelina@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Libora Swasti', 'Human Resources', 'Human Resources Business Partner', 'liboralibora05@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Permata Landmarq Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Marchelynow Alfa Christian', 'Human Resources', 'Human Capital Management', 'alfa@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Aenur Rofik', 'Häagen-Dazs-Operation', 'Technician Coordinator', 'rofikaenur2507@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Restu Fitrah Rihadi', 'Häagen-Dazs-Operation', 'Technician', 'restufitrahr17@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lamya Citra Suprana', 'Häagen-Dazs-Marketing', 'E-commerce & Support', 'citra@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Kirana Putri Adinda', 'Häagen-Dazs-HR & GA', 'Receptionist', 'kiranaputria29@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Syafei', 'Program', 'Creative Assistant Digital', 'muhammad.syafei@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putri Handayani', 'Program', 'Creative Assistant Digital', 'putri.handayani@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Geraldine Vania Carissa Metekohy', 'Marketing Communication', 'Marcomm Executive', 'geraldin.metekohy@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Veronica Melischa Al Jaidi', 'Marketing Communication', 'Assistant Marcomm Manager', 'veronica.aljaidi@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ari Pungki Priandana', 'Häagen-Dazs-HR & GA', 'Office Assistant', 'pradanaary6@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jennifer Marshiela', 'Redaksi Harper''s Bazaar', 'Digital Writer', 'jenni@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Wijdaan Fadhlurrohman', 'Marketing Communication', 'Marcomm Staff', 'wijdaan@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mohammad Virgo Agasi', 'Marketing', 'Senior Account Executive', 'virgokilmster@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yahyar Gunawan', 'General Affair', 'Security Pemancar', 'dummy.yahyargunawan60@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Mia Agustien', 'Program', 'Account Manager', 'dummy.mia@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ridwan Saputra', 'Program', 'Production Operator', 'dummy.ridwansaputra@hardrockfm.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Hendra Maulana', 'Program', 'Broadcast Operator', 'dummy.hendra29maul@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fellysia Tika Ishi Kawanti S', 'Service Center', 'Customer Service & Administrasi', 'fellysiatika88@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Inti Semesta - Service Center'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Putra Surya Jaya Togatorop', 'MRA Digital', 'Data Engineer', 'putra.surya@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Lintang Larasati Ananto', 'Häagen-Dazs-Marketing', 'Social Media Specialist & Content Creator', 'larasati@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Yudistiro Wibowo Gharaizs', 'Häagen-Dazs-Planning & Business Development', 'Field Trainer', 'yudistiro@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Widya Cahyono', 'Sales and Operations Department', 'Sales Associate', 'widya_cahyono@yahoo.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Tunjungan Plaza 4 Surabaya'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sabrina Adini Sulaiman', 'Redaksi Harper''s Bazaar', 'Assistant Managing Editor', 'sabrina.sulaiman@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Rachma Deyana', 'Corporate Administration', 'Internal Audit Jr. Manager', 'rachma@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Fani Ainurohmah', 'Sales and Operations Department', 'Sales Associate', 'fanitinuut@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Mall Kelapa Gading 3'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Ken Devina', 'MRA Digital', 'SEO Specialist', 'ken.devina@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT.  Rupa Kreasi Anak Bangsa'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jauhar Ma''ruf', 'General Affair', 'Asset Management', 'jauhar@mra.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Mugi Rekso Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Celine Ayu Krishnasathya', 'Advertising Sales', 'Senior Account Executive', 'celine.ayu@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Jovanka Yunitalia', 'Marketing & Communication', 'Retail Officer', 'jovankayunitalia01@gmail.com', 'Active',
         id FROM m_company WHERE name = 'AAA - Head Office'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Galantzy Ramadhan Cassidy', 'Graphic Design', 'Graphic Design', 'galantzy@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Sabrina Bela Safitri', 'Redaksi Harper''s Bazaar', 'Editorial Support', 'sabrina.bela@harpersbazaar.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Media Insani Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Nova Nurdiansyah Irawan Putra', 'Operational', 'Trainer Manager', 'nova.nurdiansyah@mrafb.co.id', 'Active',
         id FROM m_company WHERE name = 'PT Emera Boga Makmur'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Abigail Kendra', 'Digital', 'Social Media', 'abigail.kendra@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Dhela Via Astuti', 'Marketing', 'Account Executive', 'dhela@therockinlife.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Antar Nusa Djaja'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Albert Tjong', 'Sales and Operations Department', 'Boutique Manager', 'albertemmanuel2009@gmail.com', 'Active',
         id FROM m_company WHERE name = 'PT Hourlogy Indah Perkasa - Butik OMEGA Plaza Senayan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Bernardine Putri Emilia', 'Häagen-Dazs-Marketing', 'R&D Pastry Chef', 'nadine@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani International - 1'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Liza Markus', 'Art Jakarta', 'Community Manager', 'lizamarkus@rocketmail.com', 'Active',
         id FROM m_company WHERE name = 'PT. Artindo Jakarta Seni Kini'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Muhammad Faiz Abdel Wadud', 'Marketing Communication', 'Marcomm Supervisor', 'faiz@mramedia.com', 'Active',
         id FROM m_company WHERE name = 'PT. Paramita Kreasi Abadi'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Syahrul Ramadhan', 'Marketing', 'Account Executive', 'syahrul@iswaranetwork.com', 'Active',
         id FROM m_company WHERE name = 'PT Radio Suara Kedjajaan'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;
INSERT INTO m_employee(name, department, role, email, status, company_id)
  SELECT 'Elisa Wulandari', 'Häagen-Dazs-Finance & Accounting', 'Accounting Staff', 'elisa@rai.co.id', 'Active',
         id FROM m_company WHERE name = 'PT. Rahayu Arumdhani Distribusindo - 2'
  ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name, department=EXCLUDED.department, role=EXCLUDED.role, company_id=EXCLUDED.company_id;

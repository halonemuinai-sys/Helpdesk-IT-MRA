-- ============================================================
-- DATABASE: mra_helpdesk
-- DBMS    : PostgreSQL 13+
-- Author  : MRA IT Helpdesk System
-- Note    : Run in Laragon -> psql / DBeaver / pgAdmin
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA IF NOT EXISTS ga;
SET search_path TO ga, public;

-- ============================================================
-- A. MASTER / LOOKUP TABLES
-- ============================================================

CREATE TABLE m_company (
    id           SERIAL PRIMARY KEY,
    code         VARCHAR(20) UNIQUE,
    name         VARCHAR(150) NOT NULL,
    npwp         VARCHAR(30),
    address      TEXT,
    is_active    BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE m_division (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(80) UNIQUE NOT NULL
);

CREATE TABLE m_location (
    id          SERIAL PRIMARY KEY,
    building    VARCHAR(100),
    floor       VARCHAR(20),
    room        VARCHAR(80),
    full_name   VARCHAR(200) GENERATED ALWAYS AS
                (COALESCE(building,'') || ' ' || COALESCE(floor,'') || ' ' || COALESCE(room,'')) STORED
);

CREATE TABLE m_user (
    id          SERIAL PRIMARY KEY,
    full_name   VARCHAR(120) NOT NULL,
    email       VARCHAR(120) UNIQUE NOT NULL,
    phone       VARCHAR(30),
    department  VARCHAR(80),
    position    VARCHAR(80),
    role        VARCHAR(30) DEFAULT 'support', -- admin, support, staff
    password    VARCHAR(255) NOT NULL, -- password hash or plain text for local dev (e.g. admin123)
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE m_employee (
    id          SERIAL PRIMARY KEY,
    company_id  INT REFERENCES m_company(id),
    name        VARCHAR(120) NOT NULL,
    role        VARCHAR(80),
    department  VARCHAR(80),
    email       VARCHAR(120) UNIQUE,
    status      VARCHAR(30) DEFAULT 'Active',
    location    VARCHAR(150),
    join_date   DATE,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE m_master_data (
    id          SERIAL PRIMARY KEY,
    category    VARCHAR(50) NOT NULL, -- 'HD_Kategori', 'HD_Source', 'HD_Dampak'
    value       VARCHAR(100) NOT NULL,
    UNIQUE (category, value)
);

-- ============================================================
-- B. TRANSACTIONAL TABLES
-- ============================================================

CREATE TABLE helpdesk_tickets (
    id            VARCHAR(30) PRIMARY KEY, -- HD-YYYYMMDD-XXX
    reporter_name VARCHAR(150) NOT NULL,
    ticket_source VARCHAR(50) NOT NULL,
    ticket_date   DATE NOT NULL DEFAULT CURRENT_DATE,
    ticket_time   TIME NOT NULL DEFAULT CURRENT_TIME,
    location      VARCHAR(150) NOT NULL,
    category      VARCHAR(100) NOT NULL,
    issue_title   VARCHAR(200) NOT NULL,
    description   TEXT NOT NULL,
    priority      VARCHAR(20) NOT NULL DEFAULT 'Medium', -- Low, Medium, High, Critical
    status        VARCHAR(30) NOT NULL DEFAULT 'Open', -- Open, In Progress, Pending Vendor, Resolved, Closed
    response_date DATE,
    response_time TIME,
    resolved_date DATE,
    resolved_time TIME,
    sla_status    VARCHAR(20), -- Achieved, Breached
    impact_level  VARCHAR(50), -- Sistem Down, Sistem Lambat, Beroperasi Normal
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tickets_status ON helpdesk_tickets(status);
CREATE INDEX idx_tickets_date ON helpdesk_tickets(ticket_date);

CREATE TABLE audit_log (
    id          BIGSERIAL PRIMARY KEY,
    table_name  VARCHAR(50),
    record_id   VARCHAR(50),
    action      VARCHAR(10),  -- INSERT/UPDATE/DELETE
    old_data    JSONB,
    new_data    JSONB,
    user_id     INT REFERENCES m_user(id),
    created_at  TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- C. SEED DATA
-- ============================================================

-- Companies
INSERT INTO m_company(name, code) VALUES
 ('Mugi Rekso Abadi, PT', 'MRA'),
 ('Hourlogy Indah Perkasa, PT', 'HIP'),
 ('Hourlogy Inti Semesta, PT', 'HIS'),
 ('Mogems Putri International, PT', 'MPI'),
 ('Media Insan Abadi, PT', 'MIA'),
 ('Paramita Kreasi Abadi, PT', 'PKA');

-- Divisions
INSERT INTO m_division(name) VALUES 
 ('Retail'),
 ('Media'),
 ('Publisher'),
 ('Operasional'),
 ('IT Support');

-- Locations
INSERT INTO m_location(building, floor, room) VALUES
 ('Head Office MRA Retail', 'Floor 3', 'IT Room'),
 ('Plaza Indonesia', 'Floor 1', 'Bvlgari Boutique'),
 ('Plaza Senayan', 'Floor 1', 'Bvlgari Boutique'),
 ('Bali', 'Floor 1', 'Bvlgari Boutique Bali');

-- Master Dropdowns
-- Categories
INSERT INTO m_master_data(category, value) VALUES
 ('HD_Kategori', 'Hardware (Kerusakan Fisik)'),
 ('HD_Kategori', 'Software / OS'),
 ('HD_Kategori', 'Jaringan / Internet'),
 ('HD_Kategori', 'Retailsoft / POS'),
 ('HD_Kategori', 'Email & Collaboration'),
 ('HD_Kategori', 'Printer & Scanner'),
 ('HD_Kategori', 'Maintenance Rutin'),
 ('HD_Kategori', 'Lainnya');

-- Sources
INSERT INTO m_master_data(category, value) VALUES
 ('HD_Source', 'WhatsApp'),
 ('HD_Source', 'Portal Helpdesk'),
 ('HD_Source', 'Email'),
 ('HD_Source', 'Phone Call'),
 ('HD_Source', 'Walk-in');

-- Impacts
INSERT INTO m_master_data(category, value) VALUES
 ('HD_Dampak', 'Sistem Down'),
 ('HD_Dampak', 'Sistem Lambat'),
 ('HD_Dampak', 'Beroperasi Normal');

-- IT Team Users (for auth)
-- Passwords are plain text for simple local development, or admin123
INSERT INTO m_user(full_name, email, role, password, department) VALUES
 ('Admin IT Helpdesk', 'admin@mra.co.id', 'admin', 'admin123', 'IT Support'),
 ('Support Agent 1', 'support@mra.co.id', 'support', 'support123', 'IT Support');

-- Employees / Reporters (sync options)
INSERT INTO m_employee(name, email, department, company_id, location) VALUES
 ('Ahmad Fauzi', 'ahmad@mra.co.id', 'Retail Operations', 1, 'Head Office MRA Retail'),
 ('Siti Rahma', 'siti@mra.co.id', 'Finance & Accounting', 1, 'Head Office MRA Retail'),
 ('Budi Santoso', 'budi@mra.co.id', 'Sales Boutique', 2, 'Plaza Indonesia'),
 ('Dewi Lestari', 'dewi@mra.co.id', 'Sales Boutique', 2, 'Plaza Senayan'),
 ('Made Widiarsa', 'made@mra.co.id', 'Sales Boutique', 3, 'Bali');

-- Initial Demo Tickets
INSERT INTO helpdesk_tickets (id, reporter_name, ticket_source, ticket_date, ticket_time, location, category, issue_title, description, priority, status, impact_level) VALUES
 ('HD-20260528-001', 'Budi Santoso', 'WhatsApp', '2026-05-28', '09:15:00', 'Plaza Indonesia', 'Retailsoft / POS', 'POS Tidak Bisa Print Struk', 'Mesin printer thermal POS tidak merespon saat cetak struk penjualan, status printer ready.', 'High', 'Open', 'Sistem Lambat'),
 ('HD-20260528-002', 'Siti Rahma', 'Email', '2026-05-28', '10:30:00', 'Head Office MRA Retail', 'Email & Collaboration', 'Gagal Login Outlook', 'Muncul error password salah saat login Outlook desktop, login webmail normal.', 'Medium', 'In Progress', 'Beroperasi Normal'),
 ('HD-20260527-001', 'Dewi Lestari', 'Phone Call', '2026-05-27', '14:20:00', 'Plaza Senayan', 'Jaringan / Internet', 'Koneksi Internet Boutique Terputus', 'Modem internet mati total, lampu indikator LOS menyala merah. Seluruh staff tidak bisa akses POS online.', 'Critical', 'Resolved', 'Sistem Down');

UPDATE helpdesk_tickets SET 
 response_date = '2026-05-27', response_time = '14:25:00',
 resolved_date = '2026-05-27', resolved_time = '15:15:00',
 status = 'Resolved', sla_status = 'Achieved'
WHERE id = 'HD-20260527-001';

-- Cloudflare D1 SQL Schema for Career & Resume Suite
-- Tables: career_clients, intakes, resumes, linkedin_profiles, target_jobs, invoices

CREATE TABLE IF NOT EXISTS career_clients (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    is_export INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS intakes (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    current_title TEXT NOT NULL,
    target_role TEXT NOT NULL,
    target_salary TEXT,
    key_wins TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES career_clients(id)
);

CREATE TABLE IF NOT EXISTS resumes (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    version_label TEXT DEFAULT 'v1.0-ATS',
    ats_score INTEGER DEFAULT 90,
    markdown_content TEXT NOT NULL,
    is_approved INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES career_clients(id)
);

CREATE TABLE IF NOT EXISTS linkedin_profiles (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    headline TEXT NOT NULL,
    about_section TEXT NOT NULL,
    skills_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES career_clients(id)
);

CREATE TABLE IF NOT EXISTS target_jobs (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    job_title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    job_description TEXT NOT NULL,
    keyword_match_score REAL DEFAULT 85.0,
    FOREIGN KEY (client_id) REFERENCES career_clients(id)
);

CREATE TABLE IF NOT EXISTS career_invoices (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    package_name TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    status TEXT DEFAULT 'PAID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES career_clients(id)
);

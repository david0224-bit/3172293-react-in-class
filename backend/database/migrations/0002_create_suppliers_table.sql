CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    supplier_email VARCHAR(150) UNIQUE NOT NULL,
    supplier_phone VARCHAR(20),
    supplier_document_type VARCHAR(20),
    supplier_document_number VARCHAR(50) UNIQUE,
    supplier_password TEXT NOT NULL,
    supplier_address VARCHAR(100) NOT NULL,
    observations TEXT,
    supplier_image TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

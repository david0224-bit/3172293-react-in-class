CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_id INTEGER NOT NULL,
    product_quantity INTEGER NOT NULL,
    product_supplier_names VARCHAR(150) NOT NULL,
    product_supplier_nit VARCHAR(50) NOT NULL,
    product_description TEXT,
    product_price NUMERIC(12, 2) NOT NULL,
    product_entry_date DATE NOT NULL,
    product_image TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_staff BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

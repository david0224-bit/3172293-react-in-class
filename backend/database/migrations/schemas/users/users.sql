CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) UNIQUE NOT NULL,
    confirm_email VARCHAR(150) NOT NULL,
    user_phone VARCHAR(20),
    user_address VARCHAR(100) NOT NULL,
    user_document_types VARCHAR(20),
    user_document_number VARCHAR(50) UNIQUE,
    user_password TEXT NOT NULL,
    user_image TEXT,
    is_staff BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_superuser BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
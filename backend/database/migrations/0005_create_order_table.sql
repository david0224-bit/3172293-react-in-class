CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    table_number INTEGER NOT NULL,
    waiter_id INTEGER NOT NULL REFERENCES users(id),
    dishes JSONB NOT NULL,
    observations TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Abierta',
    created_at TIMESTAMP DEFAULT NOW()
);
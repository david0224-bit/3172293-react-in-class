ALTER TABLE suppliers
ADD COLUMN supplied_products JSONB NOT NULL DEFAULT '[]'::jsonb;
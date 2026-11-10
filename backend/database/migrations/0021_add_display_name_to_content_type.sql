-- database/migrations/add_display_name_to_content_type.sql
-- Corrección: nombre amigable para mostrar módulos

ALTER TABLE content_type
ADD COLUMN display_name VARCHAR(100) NOT NULL DEFAULT '';
INSERT INTO permissions (permission_name, permission_codename, content_type_id)
SELECT 'Deshabilitar usuarios', 'disable_user', content_type_id
FROM content_type WHERE app_label = 'users' AND model = 'user'
ON CONFLICT (permission_codename) DO NOTHING;
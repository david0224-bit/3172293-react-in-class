INSERT INTO public.permissions (
    permission_name,
    permission_codename,
    content_type_id
)
SELECT
    p.permission_name,
    p.permission_codename,
    ct.content_type_id
FROM (
    VALUES
        ('Listar productos', 'list_product'),
        ('Crear productos', 'create_product'),
        ('Editar productos', 'update_product'),
        ('Eliminar productos', 'delete_product'),
        ('Generar reporte de productos', 'report_product')
) AS p(permission_name, permission_codename)
JOIN public.content_type ct
    ON ct.app_label = 'products'
WHERE NOT EXISTS (
    SELECT 1
    FROM public.permissions existing
    WHERE existing.permission_codename = p.permission_codename
);
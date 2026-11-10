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
        -- Proveedores
        ('Listar proveedores', 'list_supplier', 'suppliers'),
        ('Crear proveedores', 'create_supplier', 'suppliers'),
        ('Editar proveedores', 'update_supplier', 'suppliers'),
        ('Eliminar proveedores', 'delete_supplier', 'suppliers'),
        ('Generar reporte de proveedores', 'report_supplier', 'suppliers'),

        -- Órdenes
        ('Listar órdenes', 'list_order', 'orders'),
        ('Crear órdenes', 'create_order', 'orders'),
        ('Editar órdenes', 'update_order', 'orders'),
        ('Eliminar órdenes', 'delete_order', 'orders'),
        ('Generar reporte de órdenes', 'report_order', 'orders'),

        -- Inventario
        ('Listar inventario', 'list_inventory', 'inventory'),
        ('Crear inventario', 'create_inventory', 'inventory'),
        ('Editar inventario', 'update_inventory', 'inventory'),
        ('Eliminar inventario', 'delete_inventory', 'inventory'),
        ('Generar reporte de inventario', 'report_inventory', 'inventory')

) AS p(permission_name, permission_codename, app_label)

INNER JOIN public.content_type ct
    ON ct.app_label = p.app_label

WHERE NOT EXISTS (
    SELECT 1
    FROM public.permissions existing
    WHERE existing.permission_codename = p.permission_codename
);
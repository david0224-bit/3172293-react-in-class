export const PERMISSION_MODULES = [
  {
    id: "users",
    title: "Gestión Usuarios",
    icon: "👥",
    actions: [
      { id: "users_create", label: "Crear usuarios" },
      { id: "users_read", label: "Visualizar usuarios" },
      { id: "users_update", label: "Actualizar usuarios" },
      { id: "users_list", label: "Listar usuarios" },
      { id: "users_toggle", label: "Activar / Desactivar usuario" },
      { id: "users_report", label: "Generar reporte de usuarios" },
    ],
  },
  {
    id: "suppliers",
    title: "Gestión Proveedores",
    icon: "🚚",
    actions: [
      { id: "suppliers_create", label: "Crear proveedores" },
      { id: "suppliers_read", label: "Visualizar proveedores" },
      { id: "suppliers_update", label: "Actualizar proveedores" },
      { id: "suppliers_list", label: "Listar proveedores" },
      { id: "suppliers_toggle", label: "Activar / Desactivar proveedor" },
      { id: "suppliers_report", label: "Generar reporte de proveedores" },
    ],
  },
  {
    id: "inventory",
    title: "Gestión Inventario",
    icon: "📦",
    actions: [
      { id: "inventory_create", label: "Crear Inventario" },
      { id: "inventory_read", label: "Visualizar inventarios" },
      { id: "inventory_update", label: "Actualizar inventarios" },
      { id: "inventory_list", label: "Listar inventarios" },
      { id: "inventory_toggle", label: "Activar / Desactivar inventario" },
      { id: "inventory_report", label: "Generar reporte de inventarios" },
    ],
  },
  {
    id: "menu",
    title: "Gestión Menu",
    icon: "📋",
    actions: [
      { id: "menu_create", label: "Crear menu" },
      { id: "menu_read", label: "Visualizar menu" },
      { id: "menu_update", label: "Actualizar menu" },
      { id: "menu_list", label: "Listar menus" },
      { id: "menu_toggle", label: "Activar / Desactivar menu" },
      { id: "menu_report", label: "Generar reporte del menu" },
    ],
  },
];
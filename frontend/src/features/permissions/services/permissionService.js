export const getPermissionGroups = async () => {
  return [
    { value: "admin", label: "Administradores" },
    { value: "waiter", label: "Meseros" },
    { value: "supplier", label: "Proveedores" },
    { value: "users", label: "Usuarios" },
  ];
};

export const getIndividualUsers = async () => {
  return [
    { value: "1", label: "Jacobo Agudelo Lopez" },
    { value: "2", label: "David Suarez" },
    { value: "3", label: "Victor Manuel Cortez Castrillon" },
    { value: "4", label: "Edwar Velasquez" },
    { value: "5", label: "Nicolas Echeverry" },
  ];
};

export const savePermissions = async (data) => {
  console.log("Guardando permisos:", data);
  return { success: true };
};
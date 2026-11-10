// frontend/src/features/access/components/PermissionModule.jsx
// Corrección: se usa estado global desde AccessPage

import { Checkbox, Button, IconButton } from "@/shared"
import { Pencil } from "lucide-react";

export default function PermissionModule({
    selectedGroupName,
    isEditing,
    allPermissions = [],
    permissionsDraft = [],
    setPermissionsDraft,
    onEdit,
    onCancel,
    onSave,
}) {
    const hasPermission = (codename) => {
        return permissionsDraft.some(
            (permission) => permission.permission_codename === codename,
        );
    }

    const handlePermissionChange = (permission, checked) => {
        if (!checked) {
            setPermissionsDraft((prev) =>
                prev.filter(
                    (item) => item.permission_codename !== permission.permission_codename,
                ),
            );
            return;
        }
        setPermissionsDraft((prev) => [...prev, permission])
    };

    // Agrupar permisos por módulo
    const permissionsByModule = allPermissions.reduce((groupedPermissions, permission) => {
        const moduleName = permission.display_name; // Clave de agrupación
        
        // Inicializa el arreglo si el módulo no existe
        if (!groupedPermissions[moduleName]) {
            groupedPermissions[moduleName] = [];
        }
        
        groupedPermissions[moduleName].push(permission); // Agrega el permiso al módulo
        
        return groupedPermissions; // Retorna el acomulador en cada iteración
    }, {}); // {} = objeto inicial
    
    return (
        <section className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm text-neutral-500">Grupo</p>
                    <h2 className="text-lg font-semibold">
                        {selectedGroupName || "Seleccione un grupo"}
                    </h2>
                </div>
                {!isEditing && selectedGroupName && (
                    <IconButton ariaLabel="Editar permisos" onClick={onEdit}>
                        <Pencil size={20} />
                    </IconButton>
                )}
            </div>

            <div className="space-y-8">
                {Object.entries(permissionsByModule).map(
                    ([moduleName, permissions]) => (
                        <div key={moduleName} className="border-b-2 pb-6">
                            <h3 className="font-medium mb-4">Módulo {moduleName}</h3>
                            <div className="flex flex-wrap gap-6">
                                {permissions.map((permission) => (
                                    <Checkbox
                                        key={permission.permission_id}
                                        id={permission.permission_codename}
                                        name={permission.permission_codename}
                                        label={permission.permission_name}
                                        checked={hasPermission(permission.permission_codename)}
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            handlePermissionChange(permission, e.target.checked)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ),
                )}
                {/* Otros Módulos */}
                <div>
                    <h3 className="font-medium mb-4">Otros módulos</h3>
                </div>
            </div>
            
            {isEditing && (
                <div className="flex justify-end gap-3 mt-8">
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="button" variant="primary" onClick={onSave}>
                        Guardar
                    </Button>
                </div>
            )}
        </section>
    )
}
// frontend/src/features/access/pages/AccessPage.jsx
// Corrección: estado compartido entre Sidebar y PermissionModule
// Corrección: el estado de edición pasa a AccessPage

import { useEffect, useState } from "react";
import { Navbar } from "../../../shared";
import AccessSidebar from "../../../shared/components/AccessSidebar";
import PermissionModule from "../components/PermissionModule";
import { getAllPermissions } from "../services/permissionService";
import { updateGroupPermissions } from "../services/groupService";

export default function AccessPage() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");

  // Catálogo completo de permisos (PostgreSQL)
  const [allPermissions, setAllPermissions] = useState([])

  // Permisos asignados al grupo seleccionado
  const [groupPermissions, setGroupPermissions] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [permissionsDraft, setPermissionsDraft] = useState([]);
  
  useEffect(() => {
    getAllPermissions().then(setAllPermissions).catch(console.error);
  }, [])

  useEffect(() => {
    setPermissionsDraft(groupPermissions);
    setIsEditing(false);
  }, [groupPermissions]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setPermissionsDraft(groupPermissions);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {      
      const permissionIds = permissionsDraft.map(
        (permission) => permission.permission_id,
      );
  
      await updateGroupPermissions(selectedGroup, permissionIds);
  
      setGroupPermissions(permissionsDraft);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("No se pudieron guardar los permisos");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 flex gap-10">
          <AccessSidebar
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            setSelectedGroupName={setSelectedGroupName}
            setGroupPermissions={setGroupPermissions} 
            />
        
          <div className="flex-1">
            <h1 className="text-xl font-semibold mb-6">Gestión de permisos</h1>
            <PermissionModule
              selectedGroupName={selectedGroupName}
              isEditing={isEditing}
              allPermissions={allPermissions}
              permissionsDraft={permissionsDraft}
              setPermissionsDraft={setPermissionsDraft}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              />
          </div>
        </div>
    </div>
  );
}
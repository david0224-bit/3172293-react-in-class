import { useState, useEffect } from "react";
import { Button, Navbar } from "@/shared";
import PermissionSelector from "../components/PermissionSelector";
import PermissionSection from "../components/PermissionSection";
import { PERMISSION_MODULES } from "../constants/permissionModules";
import { permissionSchema } from "../schemas/permissionSchema";
import {
  getPermissionGroups,
  getIndividualUsers,
  savePermissions,
} from "../services/permissionService";
import backgroundImage from "@/assets/images/restaurant.jpg";

export default function PermissionManagement() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [permissions, setPermissions] = useState({});
  const [errors, setErrors] = useState({});

  const [groupOptions, setGroupOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    getPermissionGroups().then(setGroupOptions);
    getIndividualUsers().then(setUserOptions);
  }, []);

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    if (e.target.value) setSelectedUser("");
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    if (e.target.value) setSelectedGroup("");
  };

  const handlePermissionChange = (actionId, checked) => {
    setPermissions((prev) => ({
      ...prev,
      [actionId]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userGroup: selectedGroup,
      individualUser: selectedUser,
      permissions,
    };

    const result = permissionSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await savePermissions(formData);
      alert("Permisos guardados correctamente");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

 return (
  <div 
    className="min-h-screen flex flex-col font-sans bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <Navbar />

    <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Encabezado */}
        <div className="flex items-center justify-between border-b-4 border-[var(--color-primary-950)] pb-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() => window.history.back()}
          >
            ← Atrás
          </Button>

          <h1 className="text-[var(--color-primary-950)] font-bold text-xl uppercase tracking-wider">
          ⚙️ Gestión de permisos
          </h1>

          <div className="w-16"></div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-4">
            <PermissionSelector
              selectedGroup={selectedGroup}
              selectedUser={selectedUser}
              groupOptions={groupOptions}
              userOptions={userOptions}
              onGroupChange={handleGroupChange}
              onUserChange={handleUserChange}
              error={errors.selectionError}
            />
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-200 space-y-6 shadow-sm">
            {PERMISSION_MODULES.map((module, idx) => (
              <div key={module.id} className="space-y-4">
                <PermissionSection
                  module={module}
                  permissions={permissions}
                  onPermissionChange={handlePermissionChange}
                />
                {idx < PERMISSION_MODULES.length - 1 && (
                  <hr className="border-gray-200" />
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200 flex justify-end gap-4">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={() => {
                  setSelectedGroup("");
                  setSelectedUser("");
                  setPermissions({});
                }}
                onClick={() => window.history.back()}
              >
                Cancelar
              </Button>

              <Button variant="primary" size="md" type="submit">
                Guardar permisos
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
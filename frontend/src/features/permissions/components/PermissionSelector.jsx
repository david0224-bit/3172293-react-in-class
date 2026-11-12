import { Select } from "@/shared";

export default function PermissionSelector({
  selectedGroup,
  selectedUser,
  groupOptions,
  userOptions,
  onGroupChange,
  onUserChange,
  error,
}) {
  return (
    <aside className="bg-panel rounded-xl p-6 shadow-sm border border-border space-y-8">
      <div className="space-y-3">
        <h2 className="text-text-primary font-bold text-base border-b-2 border-border-strong pb-1 inline-block">
          Grupos usuarios
        </h2>
        <Select
          name="userGroup"
          value={selectedGroup}
          onChange={onGroupChange}
          options={groupOptions}
          placeholder="Seleccione un grupo de usuario"
        />
      </div>

      <hr className="border-t border-border" />

      <div className="space-y-3">
        <h2 className="text-text-primary font-bold text-base border-b-2 border-border-strong pb-1 inline-block">
          Usuario individual
        </h2>
        <Select
          name="individualUser"
          value={selectedUser}
          onChange={onUserChange}
          options={userOptions}
          placeholder="Seleccione un usuario"
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
    </aside>
  );
}
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
    <aside className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-gray-100)] space-y-8">
      <div className="space-y-3">
        <h2 className="text-[var(--color-gray-900)] font-bold text-base border-b-2 border-black pb-1 inline-block">
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

      <hr className="border-t border-[var(--color-gray-100)]" />

      <div className="space-y-3">
        <h2 className="text-[var(--color-gray-900)] font-bold text-base border-b-2 border-black pb-1 inline-block">
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
        <p className="text-xs text-[var(--color-secondary-950)] font-medium">
          {error}
        </p>
      )}
    </aside>
  );
}
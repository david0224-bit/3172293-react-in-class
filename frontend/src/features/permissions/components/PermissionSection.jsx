import { Checkbox } from "@/shared";

export default function PermissionSection({ module, permissions, onPermissionChange }) {
  return (
    <div className="space-y-3">
      {/* Cabecera ícono */}
      <div className="flex items-center gap-2 text-[var(--color-primary-950)] font-bold text-base">
        <span>{module.icon}</span>
        <h3>{module.title}</h3>
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {module.actions.map((action) => (
          <div key={action.id} className="flex items-center min-h-[32px]">
            <Checkbox
              id={action.id}
              name={action.id}
              label={action.label}
              checked={!!permissions[action.id]}
              onChange={(e) => onPermissionChange(action.id, e.target.checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
import { Checkbox } from "@/shared";

export default function CheckboxGroup({
  label,
  name,
  options,
  value = [],
  onChange,
  error,
}) {
  return (
    <div className="flex flex-col gap-3">

      <label className="font-semibold text-gray-700">
        {label}
      </label>

      <div className="grid grid-cols-2 gap-3">

        {options.map((option) => (
          <Checkbox
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={onChange}
          />
        ))}

      </div>

      {error && (
        <span className="text-red-500 text-xs">
          {error}
        </span>
      )}

    </div>
  );
}
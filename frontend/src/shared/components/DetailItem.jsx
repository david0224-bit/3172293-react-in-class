export default function DetailItem({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-border py-3">
      <span className="font-semibold text-text-secondary">
        {label}
      </span>

      <span className="text-text-secondary text-right">
        {value}
      </span>
    </div>
  );
}
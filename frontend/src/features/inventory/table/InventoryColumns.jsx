import InventoryRowActions from "../components/InventoryRowActions";

export const inventoryColumns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "product_name",
    header: "Producto",
  },
  {
    accessorKey: "product_id",
    header: "ID del producto",
  },
  {
    accessorKey: "product_quantity",
    header: "Stock actual",
    cell: ({ row }) => {
      const quantity = Number(row.original.product_quantity || 0);

      return (
        <span className={quantity <= 5 ? "text-red-600 font-semibold" : ""}>
          {quantity}
          {quantity <= 5 && " (bajo)"}
        </span>
      );
    },
  },
  {
    accessorKey: "product_price",
    header: "Precio",
    cell: ({ row }) => {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(Number(row.original.product_price || 0));
    },
  },
  {
    accessorKey: "product_supplier_names",
    header: "Proveedor",
    cell: ({ row }) => row.original.product_supplier_names || "Sin proveedor",
  },
  {
  accessorKey: "product_entry_date",
  header: "Fecha de entrada",
  cell: ({ row }) => {
    const date = row.original.product_entry_date;

    if (!date) return "Sin fecha";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return "Sin fecha";

    return parsedDate.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  },
},
  {
    id: "actions",
    cell: ({ row }) => <InventoryRowActions item={row.original} />,
  },
];
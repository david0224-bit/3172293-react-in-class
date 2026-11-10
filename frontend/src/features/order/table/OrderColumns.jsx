
import OrderRowActions from "../components/OrderRowActions";

export const orderColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "table_number",
    header: "Mesa",
  },
  {
    accessorKey: "waiter_id",
    header: "Mesero",
  },
  {
    accessorKey: "dishes",
    header: "Productos",
    cell: ({ row }) => {
      const dishes = row.original.dishes;

      return Array.isArray(dishes)
        ? dishes.reduce(
            (total, dish) => total + Number(dish.quantity || 0),
            0
          ) + " unidades"
        : "Sin productos";
    },
  },
  {
    accessorKey: "total",
    header: "Valor total",
    cell: ({ row }) => {
      const value = Number(row.original.total || 0);

      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }) => {
      const date = row.original.created_at;

      return date
        ? new Date(date).toLocaleDateString("es-CO")
        : "Sin fecha";
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <OrderRowActions order={row.original} />,
  },
];

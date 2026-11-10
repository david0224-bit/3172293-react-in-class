import { StatusSwitch } from "@/shared";
import UserRowActions from "../components/UserRowActions";
import { updateStatusSwitch } from "../services/userServices";

export const UserColumns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "user_name",
    header: "Nombre",
  },
  {
    accessorKey: "user_email",
    header: "Email",
  },
  {
    accessorKey: "user_phone",
    header: "Teléfono",
  },
  {
    accessorKey: "user_document_types",
    header: "Tipo de documento",
  },
  {
    accessorKey: "user_document_number",
    header: "Número de documento",
  },
  {
    accessorKey: "is_active", // Busca el valor de cada usuario en la bd
    header: "Estado",
    cell: ({ row }) => {
      return (
        <StatusSwitch
        checked={row.original.is_active} // Define como debe verse el icono segun su valor
        onChange={async (value) => {
          await updateStatusSwitch(row.original.id, value) // Cuando se hace click atrapa el nuevo valor junto a la id, llama a la funcion guarda todo y actualiza la bd
        }}  // Función que maneja el cambio
        />
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];
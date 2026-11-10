import ProductRowActions from "../components/ProductRowActions";

export const productColumns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "product_name",
    header: "Producto",
  },
  {
    accessorKey: "product_category",
    header: "Categoría",
  },
  {
    accessorKey: "product_price",
    header: "Precio",
    cell: ({ row }) => {
      const price = Number(row.original.product_price || 0);

      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(price);
    },
  },
  {
    accessorKey: "product_description",
    header: "Descripción",
  },
  {
    accessorKey: "product_image",
    header: "Imagen",
    cell: ({ row }) => {
      const product = row.original;
      const image = product.product_image;

      return image && typeof image === "string" && image.startsWith("http") ? (
        <img
          src={image}
          alt={product.product_name}
          className="h-10 w-10 rounded object-contain"
        />
      ) : (
        <span className="text-sm text-gray-500">Sin imagen</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ProductRowActions product={row.original} />
    ),
  },
];
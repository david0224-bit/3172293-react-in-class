import { getAllProducts } from "@/features/products/services/productServices.js";

export const getOrderProducts = async () => {
  const products = await getAllProducts();

  return products.map((product) => ({
    value: product.id,
    label: product.product_name,
  }));
};
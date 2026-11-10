import { productService } from "./product.service.js";

export const productController = {
  async create(req, res) {
    console.log("BODY RECIBIDO:", req.body);

    try {
      const product = await productService.createProduct(req.body);

      res.status(201).json({
        message: "Producto creado correctamente",
        productId: product.id,
      });
    } catch (err) {
      console.error("ERROR BACKEND:", err);

      res.status(500).json({
        error: err.message,
      });
    }
  },

  async getAll(req, res) {
    try {
      const products = await productService.getAllProducts();

      return res.status(200).json(products);
    } catch (err) {
      console.error("ERROR AL OBTENER PRODUCTOS:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const product = await productService.updateProduct(id, req.body);

      if (!product) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        message: "Producto actualizado correctamente",
        product,
      });
    } catch (err) {
      console.error("ERROR AL ACTUALIZAR PRODUCTO:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  },
};
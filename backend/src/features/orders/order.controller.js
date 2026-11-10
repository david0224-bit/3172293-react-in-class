import { orderService } from "./order.service.js";

export const orderController = {
  async create(req, res) {
    try {
      const order = await orderService.createOrder(req.body);

      return res.status(201).json({
        message: "Orden creada correctamente",
        orderId: order.id,
        total: order.total,
        dishes: order.dishes,
      });
    } catch (err) {
      console.error("ERROR BACKEND:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  },

  async getAll(req, res) {
    try {
      const orders = await orderService.getAllOrders();

      return res.status(200).json(orders);
    } catch (err) {
      console.error("ERROR BACKEND:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const order = await orderService.updateOrder(id, req.body);

      if (!order) {
        return res.status(404).json({
          error: "Orden no encontrada",
        });
      }

      return res.status(200).json({
        message: "Orden actualizada correctamente",
        order,
      });
    } catch (err) {
      console.error("ERROR AL ACTUALIZAR ORDEN:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  },
};
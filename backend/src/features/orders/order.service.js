import { orderRepository } from "./order.repository.js";

export const orderService = {
  async createOrder(data) {
    return await orderRepository.create(data);
  },

  async getAllOrders() {
    const orders = await orderRepository.findAll();
    return orders;
  },

  async updateOrder(id, data) {
    return await orderRepository.update(id, data);
  },
};
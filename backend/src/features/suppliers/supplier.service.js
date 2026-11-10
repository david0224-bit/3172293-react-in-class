import bcrypt from "bcrypt";
import { supplierRepository } from "./supplier.repository.js";

export const supplierService = {
  async createSupplier(data) {
    const hashedPassword = await bcrypt.hash(data.supplierPassword, 10);

    const supplierData = {
      ...data,
      supplierPassword: hashedPassword,
    };

    return await supplierRepository.create(supplierData);
  },

  async getAllSuppliers() {
    const suppliers = await supplierRepository.findAll();
    return suppliers;
  },

  async updateSupplier(id, data) {
    let hashedPassword = null;

    if (data.supplierPassword && data.supplierPassword.trim() !== "") {
      hashedPassword = await bcrypt.hash(data.supplierPassword, 10);
    }

    const supplierData = {
      ...data,
      supplierPassword: hashedPassword,
    };

    return await supplierRepository.update(id, supplierData);
  },

  async updateSupplierStatus(id, is_active) {
    const updated = await supplierRepository.updateStatus(id, is_active);
    return updated;
  },
};
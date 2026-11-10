
import { pool } from "../../config/db.js";

export const inventoryRepository = {
  async create(inventoryData) {
    const {
      productName,
      productId,
      productQuantity,
      productSupplierNames,
      productSupplierNit,
      productDescription,
      productPrice,
      productEntryDate,
      productImage,
      isActive,
      isStaff,
    } = inventoryData;

    const query = `
      INSERT INTO inventory (
        product_name,
        product_id,
        product_quantity,
        product_supplier_names,
        product_supplier_nit,
        product_description,
        product_price,
        product_entry_date,
        product_image,
        is_active,
        is_staff
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id;
    `;

    const values = [
      productName,
      Number(productId),
      Number(productQuantity),
      productSupplierNames,
      productSupplierNit,
      productDescription || null,
      Number(productPrice),
      productEntryDate,
      productImage || null,
      isActive,
      isStaff,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT *
      FROM inventory
      ORDER BY id ASC;
    `;

    const result = await pool.query(query);

    return result.rows;
  },

  async update(id, inventoryData) {
    const {
      productName,
      productId,
      productQuantity,
      productSupplierNames,
      productSupplierNit,
      productDescription,
      productPrice,
      productEntryDate,
      productImage,
      isActive,
      isStaff,
    } = inventoryData;

    const query = `
      UPDATE inventory
      SET
        product_name = $1,
        product_id = $2,
        product_quantity = $3,
        product_supplier_names = $4,
        product_supplier_nit = $5,
        product_description = $6,
        product_price = $7,
        product_entry_date = $8,
        product_image = COALESCE($9, product_image),
        is_active = $10,
        is_staff = $11
      WHERE id = $12
      RETURNING *;
    `;

    const values = [
      productName,
      Number(productId),
      Number(productQuantity),
      productSupplierNames,
      productSupplierNit,
      productDescription || null,
      Number(productPrice),
      productEntryDate,
      productImage || null,
      isActive,
      isStaff,
      id,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  },
};

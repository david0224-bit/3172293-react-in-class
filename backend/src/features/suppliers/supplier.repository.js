import { pool } from "../../config/db.js";

export const supplierRepository = {
  async create(supplierData) {
    const {
      supplierName,
      supplierEmail,
      supplierPhone,
      supplierDocumentType,
      supplierDocumentNumber,
      supplierPassword,
      supplierAddress,
      observations,
      supplierImage,
      isActive,
      suppliedProducts,
    } = supplierData;

    const query = `
      INSERT INTO suppliers (
        supplier_name,
        supplier_email,
        supplier_phone,
        supplier_document_type,
        supplier_document_number,
        supplier_password,
        supplier_address,
        observations,
        supplier_image,
        is_active,
        supplied_products
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id;
    `;

    const values = [
      supplierName,
      supplierEmail,
      supplierPhone,
      supplierDocumentType,
      supplierDocumentNumber,
      supplierPassword,
      supplierAddress,
      observations || null,
      supplierImage || null,
      isActive,
      JSON.stringify(suppliedProducts || []),
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT *
      FROM suppliers
      ORDER BY id ASC;
    `;

    const result = await pool.query(query);

    return result.rows;
  },

  async update(id, supplierData) {
    const {
      supplierName,
      supplierEmail,
      supplierPhone,
      supplierDocumentType,
      supplierDocumentNumber,
      supplierPassword,
      supplierAddress,
      observations,
      isActive,
      suppliedProducts,
    } = supplierData;

    const query = `
      UPDATE suppliers
      SET
        supplier_name = $1,
        supplier_email = $2,
        supplier_phone = $3,
        supplier_document_type = $4,
        supplier_document_number = $5,
        supplier_password = COALESCE($6, supplier_password),
        supplier_address = $7,
        observations = $8,
        is_active = $9,
        supplied_products = $10
      WHERE id = $11
      RETURNING
        id,
        supplier_name,
        supplier_email,
        supplier_phone,
        supplier_document_type,
        supplier_document_number,
        supplier_address,
        observations,
        supplier_image,
        is_active,
        supplied_products;
    `;

    const values = [
      supplierName,
      supplierEmail,
      supplierPhone,
      supplierDocumentType,
      supplierDocumentNumber,
      supplierPassword,
      supplierAddress,
      observations || null,
      isActive,
      JSON.stringify(suppliedProducts || []),
      id,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  },

  async updateStatus(id, is_active) {
    const query = `
      UPDATE suppliers
      SET is_active = $1
      WHERE id = $2
      RETURNING *;
    `;

    const values = [is_active, id];

    const result = await pool.query(query, values);

    return result.rows[0];
  },
};
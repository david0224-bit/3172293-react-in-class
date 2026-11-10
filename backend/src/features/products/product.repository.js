import { pool } from "../../config/db.js";

export const productRepository = {
  async create(productData) {
    const {
      productName,
      productCategory,
      productPrice,
      productDescription,
      productId,
      productSupplierNames,
      productQuantity,
      shippingDate,
      nuevo,
      incluido,
      agotable,
      oferta,
      envio,
      activo,
      destacado,
      importado,
      devoluciones,
      productImage,
    } = productData;

    const query = `
      INSERT INTO products (
        product_name,
        product_category,
        product_price,
        product_description,
        product_code,
        product_supplier_names,
        product_quantity,
        shipping_date,
        nuevo,
        incluido,
        agotable,
        oferta,
        envio,
        activo,
        destacado,
        importado,
        devoluciones,
        product_image
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17, $18
      )
      RETURNING id;
    `;

    const values = [
      productName,
      productCategory,
      Number(productPrice),
      productDescription || null,
      productId,
      productSupplierNames || null,
      Number(productQuantity || 0),
      shippingDate || null,
      nuevo ?? false,
      incluido ?? false,
      agotable ?? false,
      oferta ?? false,
      envio ?? false,
      activo ?? true,
      destacado ?? false,
      importado ?? false,
      devoluciones ?? false,
      productImage || null,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT *
      FROM products
      ORDER BY id DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  },

  async update(id, productData) {
    const {
      productName,
      productCategory,
      productPrice,
      productDescription,
      productId,
      productSupplierNames,
      productQuantity,
      shippingDate,
      nuevo,
      incluido,
      agotable,
      oferta,
      envio,
      activo,
      destacado,
      importado,
      devoluciones,
      productImage,
    } = productData;

    const query = `
      UPDATE products
      SET
        product_name = $1,
        product_category = $2,
        product_price = $3,
        product_description = $4,
        product_code = $5,
        product_supplier_names = $6,
        product_quantity = $7,
        shipping_date = $8,
        nuevo = $9,
        incluido = $10,
        agotable = $11,
        oferta = $12,
        envio = $13,
        activo = $14,
        destacado = $15,
        importado = $16,
        devoluciones = $17,
        product_image = COALESCE($18, product_image)
      WHERE id = $19
      RETURNING *;
    `;

    const values = [
      productName,
      productCategory,
      Number(productPrice),
      productDescription || null,
      productId,
      productSupplierNames || null,
      Number(productQuantity || 0),
      shippingDate || null,
      nuevo ?? false,
      incluido ?? false,
      agotable ?? false,
      oferta ?? false,
      envio ?? false,
      activo ?? true,
      destacado ?? false,
      importado ?? false,
      devoluciones ?? false,
      productImage || null,
      id,
    ];

    const result = await pool.query(query, values);

    return result.rows[0] || null;
  },
};
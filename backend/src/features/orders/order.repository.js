import { pool } from "../../config/db.js";

export const orderRepository = {
  async create(orderData) {
    const {
      tableNumber,
      waiter,
      dishes,
      observations,
      status,
    } = orderData;

    const client = await pool.connect();

    try {
      if (!Array.isArray(dishes) || dishes.length === 0) {
        throw new Error("La orden debe contener al menos un producto.");
      }

      await client.query("BEGIN");

      const productIds = [
        ...new Set(dishes.map((dish) => Number(dish.productId))),
      ];

      if (
        productIds.some((id) => !Number.isInteger(id) || id <= 0)
      ) {
        throw new Error("Uno o más productos tienen un ID inválido.");
      }

      const productsQuery = `
        SELECT id, product_name, product_price
        FROM products
        WHERE id = ANY($1::int[]);
      `;

      const productsResult = await client.query(
        productsQuery,
        [productIds]
      );

      const productsMap = new Map(
        productsResult.rows.map((product) => [
          product.id,
          product,
        ])
      );

      const orderDishes = dishes.map((dish) => {
        const productId = Number(dish.productId);
        const quantity = Number(dish.quantity);
        const product = productsMap.get(productId);

        if (!product) {
          throw new Error(
            `No se encontró el producto con ID ${productId}.`
          );
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
          throw new Error(
            `La cantidad del producto ${product.product_name} no es válida.`
          );
        }

        const unitPriceInCents = Math.round(
          Number(product.product_price) * 100
        );

        const subtotalInCents = unitPriceInCents * quantity;

        return {
          productId,
          productName: product.product_name,
          quantity,
          unitPrice: unitPriceInCents / 100,
          subtotal: subtotalInCents / 100,
        };
      });

      const totalInCents = orderDishes.reduce(
        (total, dish) =>
          total + Math.round(dish.subtotal * 100),
        0
      );

      const total = totalInCents / 100;

      const query = `
        INSERT INTO orders (
          table_number,
          waiter_id,
          dishes,
          observations,
          status,
          total
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, total;
      `;

      const values = [
        Number(tableNumber),
        Number(waiter),
        JSON.stringify(orderDishes),
        observations || null,
        status || "Abierta",
        total,
      ];

      const result = await client.query(query, values);

      await client.query("COMMIT");

      return {
        ...result.rows[0],
        dishes: orderDishes,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async findAll() {
    const query = `
      SELECT *
      FROM orders
      ORDER BY id ASC;
    `;

    const result = await pool.query(query);

    return result.rows;
  },

  async update(id, orderData) {
    const {
      tableNumber,
      waiter,
      dishes,
      observations,
      status,
    } = orderData;

    const client = await pool.connect();

    try {
      if (!Array.isArray(dishes) || dishes.length === 0) {
        throw new Error("La orden debe contener al menos un producto.");
      }

      await client.query("BEGIN");

      const productIds = [
        ...new Set(dishes.map((dish) => Number(dish.productId))),
      ];

      if (
        productIds.some((id) => !Number.isInteger(id) || id <= 0)
      ) {
        throw new Error("Uno o más productos tienen un ID inválido.");
      }

      const productsQuery = `
        SELECT id, product_name, product_price
        FROM products
        WHERE id = ANY($1::int[]);
      `;

      const productsResult = await client.query(
        productsQuery,
        [productIds]
      );

      const productsMap = new Map(
        productsResult.rows.map((product) => [
          product.id,
          product,
        ])
      );

      const orderDishes = dishes.map((dish) => {
        const productId = Number(dish.productId);
        const quantity = Number(dish.quantity);
        const product = productsMap.get(productId);

        if (!product) {
          throw new Error(
            `No se encontró el producto con ID ${productId}.`
          );
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
          throw new Error(
            `La cantidad del producto ${product.product_name} no es válida.`
          );
        }

        const unitPriceInCents = Math.round(
          Number(product.product_price) * 100
        );

        const subtotalInCents = unitPriceInCents * quantity;

        return {
          productId,
          productName: product.product_name,
          quantity,
          unitPrice: unitPriceInCents / 100,
          subtotal: subtotalInCents / 100,
        };
      });

      const totalInCents = orderDishes.reduce(
        (total, dish) =>
          total + Math.round(dish.subtotal * 100),
        0
      );

      const total = totalInCents / 100;

      const query = `
        UPDATE orders
        SET
          table_number = $1,
          waiter_id = $2,
          dishes = $3,
          observations = $4,
          status = $5,
          total = $6
        WHERE id = $7
        RETURNING *;
      `;

      const values = [
        Number(tableNumber),
        Number(waiter),
        JSON.stringify(orderDishes),
        observations || null,
        status || "Abierta",
        total,
        Number(id),
      ];

      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        await client.query("ROLLBACK");
        return null;
      }

      await client.query("COMMIT");

      return {
        ...result.rows[0],
        dishes: orderDishes,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};
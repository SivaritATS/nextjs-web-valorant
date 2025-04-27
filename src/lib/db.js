import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      timezone: "+07:00",
      decimalNumbers: true,
    });
  }
  return pool;
}


// สร้างคำสั่งซื้อใหม่
export async function createDirectOrder(customerData, cartItems) {
  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 1. บันทึกข้อมูลคำสั่งซื้อหลัก

    const [orderResult] = await conn.query(
      `INSERT INTO orders SET
      customer_name = ?,
      customer_email = ?,
      customer_phone = ?,
      shipping_address = ?,
      total_amount = ?,
      payment_status = 'pending',
      created_at = NOW()`,
      [
        customerData.name,
        customerData.email,
        customerData.phone,
        customerData.address,
        totalAmount,
      ]
    );

    const orderId = orderResult.insertId;

    // 2. บันทึกรายการสินค้า
    for (const item of cartItems) {
      await conn.query(
        `INSERT INTO order_items SET
        order_id = ?,
        product_id = ?,
        quantity = ?,
        price = ?,
        product_name = ?`,
        [orderId, item.id, item.quantity, item.price, item.name]
      );

      // 3. อัปเดตสต็อกสินค้า
      await conn.query(
        `UPDATE products 
        SET stock = stock - ? 
        WHERE id = ? AND stock >= ?`,
        [item.quantity, item.id, item.quantity]
      );
    }

    await conn.commit();
    return orderId;
  } catch (error) {
    await conn.rollback();
    console.error("Error creating order:", error);
    throw new Error("Failed to create order: " + error.message);
  } finally {
    conn.release();
  }
}

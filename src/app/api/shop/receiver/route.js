import { getPool } from '@/lib/db'; // ปรับ path ให้ถูกถ้า lib/db.js อยู่ที่อื่น

export async function POST(req) {
  const pool = getPool();
  const conn = await pool.getConnection();

  try {
    const body = await req.json();
    const { customer, items, totalAmount } = body;

    await conn.beginTransaction();

    // 1. Insert into orders
    const [orderResult] = await conn.query(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, total_amount, payment_status, created_at)
       VALUES (?, ?, ?, ?, ?, 'pending', NOW())`,
      [
        customer.name,
        customer.email,
        customer.phone,
        customer.address,
        totalAmount
      ]
    );
    const orderId = orderResult.insertId;

    // 2. Insert into order_items
    for (const item of items) {
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price, product_name)
         VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          item.id,
          item.quantity,
          item.price,
          item.name
        ]
      );

      // 3. Update stock in products
      await conn.query(
        `UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`,
        [item.quantity, item.id, item.quantity]
      );
    }

    await conn.commit();

    return new Response(JSON.stringify({ success: true, orderId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    await conn.rollback();
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    conn.release();
  }
}

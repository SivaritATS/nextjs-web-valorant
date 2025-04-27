import { getPool } from '@/lib/db';

export async function GET(req) {
  const pool = getPool();
  try {
    const [rows] = await pool.query(`
      SELECT id, name, description, price, stock, image_url, type 
      FROM products 
    `);
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to load products" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
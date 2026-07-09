import { getProducts } from '@/lib/db';

export async function GET(req) {
  try {
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
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
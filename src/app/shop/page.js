import ProductList from "@/components/ProductList"; 
import { getPool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  let products = [];

  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT id, name, description, price, stock, image_url, type 
      FROM products 
    `);
    products = JSON.parse(JSON.stringify(rows));
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <div className="alert alert-error my-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>โหลดสินค้าจากฐานข้อมูลไม่สำเร็จ</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">สินค้าทั้งหมด</h1>
      <ProductList products={products} />
    </div>
  );
}


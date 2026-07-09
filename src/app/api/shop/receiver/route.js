import { createOrder } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { customer, items, totalAmount } = body;

    const orderId = await createOrder(customer, items, totalAmount);

    return new Response(JSON.stringify({ success: true, orderId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


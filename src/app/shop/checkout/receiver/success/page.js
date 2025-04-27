"use client";
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');  // ดึง `order_id` จาก URL

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="alert alert-success max-w-lg mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-bold text-lg">สั่งซื้อสำเร็จ!</h3>
          <p className="py-2">เลขที่คำสั่งซื้อ: {orderId}</p>
          <p>ขอบคุณที่ใช้บริการ VALORANT LL</p>
        </div>
      </div>
      <button
        onClick={() => window.location.href = "/shop"}
        className="btn btn-primary mt-4"
      >
        กลับไปหน้าร้าน
      </button>
    </div>
  );
}

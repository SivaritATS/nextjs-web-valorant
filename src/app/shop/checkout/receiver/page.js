"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link"; // ใช้ Link เพื่อเปลี่ยนหน้า

export default function ReceiverPage() {
  const { cart, clearCart, totalPrice, isLoaded } = useCart();
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "credit_card",
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (cart.length > 0) {
      setOrderItems(cart);
      setOrderTotal(totalPrice);
    }
  }, [cart, totalPrice, isLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      alert("ตะกร้าสินค้าว่างเปล่า");
      return;
    }

    try {
      const response = await fetch("/api/shop/receiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: orderItems,
          totalAmount: orderTotal,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${text}`);
      }

      const result = await response.json();
      if (result.success) {
        alert(`สั่งซื้อสำเร็จ! เลขที่คำสั่งซื้อ: ${result.orderId}`);
        clearCart();
        // หลังจากยืนยันการสั่งซื้อแล้ว เราจะไปหน้าความสำเร็จ
        window.location.href = `/shop/checkout/receiver/success?orderId=${result.orderId}`; // ใช้ window.location.href
      } else {
        alert("เกิดข้อผิดพลาด: " + result.error);
      }
    } catch (error) {
      alert("การเชื่อมต่อล้มเหลว: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-white bg-valorant-red p-4 rounded-lg">
        กรอกข้อมูลผู้รับ
      </h1>

      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title text-white">สรุปคำสั่งซื้อ</h2>
          <div className="divider"></div>
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-white">
              <span>{item.name} x {item.quantity}</span>
              <span>฿{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="divider"></div>
          <div className="flex justify-between text-lg font-bold text-green-300">
            <span>รวมทั้งหมด</span>
            <span>฿{orderTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body space-y-4">
            <h2 className="card-title text-white">ข้อมูลการจัดส่ง</h2>

            {[{ label: "ชื่อ-นามสกุล", name: "name" }, 
              { label: "อีเมล", name: "email" }, 
              { label: "เบอร์โทรศัพท์", name: "phone" }, 
              { label: "ที่อยู่จัดส่ง", name: "address", isTextarea: true }]
              .map(({ label, name, isTextarea }) => (
                <div className="form-control" key={name}>
                  <label className="label">
                    <span className="label-text text-white">{label}</span>
                  </label>
                  {isTextarea ? (
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="textarea textarea-bordered h-24"
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="input input-bordered"
                      required
                    />
                  )}
                </div>
              ))}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">วิธีการชำระเงิน</span>
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="select select-bordered"
              >
                <option value="credit_card">บัตรเครดิต/เดบิต</option>
                <option value="bank_transfer">โอนเงินผ่านธนาคาร</option>
                <option value="cod">ชำระเงินปลายทาง</option>
              </select>
            </div>

            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary w-full">
                ยืนยันการสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

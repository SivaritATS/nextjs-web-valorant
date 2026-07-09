"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Create custom SweetAlert mixin for Valorant theme
const valorantAlert = Swal.mixin({
  background: "#0F1923",
  color: "#FFFFFF",
  confirmButtonColor: "#FF4655",
  cancelButtonColor: "#4B5563",
  customClass: {
    popup: "border-2 border-[#ff4655] rounded-none font-sans shadow-2xl",
    title: "text-white font-bold tracking-wider uppercase font-sans text-xl border-b border-gray-800 pb-3",
    htmlContainer: "text-gray-300 font-sans my-4 text-sm",
    confirmButton: "bg-[#ff4655] text-white px-6 py-2.5 rounded-none hover:bg-[#ff5865] transition uppercase font-bold tracking-wider text-xs focus:outline-none mx-2",
    cancelButton: "bg-gray-700 text-white px-6 py-2.5 rounded-none hover:bg-gray-600 transition uppercase font-bold tracking-wider text-xs focus:outline-none mx-2"
  },
  buttonsStyling: false
});

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      valorantAlert.fire({
        title: "ตะกร้าสินค้าว่างเปล่า",
        text: "กรุณาเลือกซื้อสินค้าก่อนทำรายการชำระเงิน",
        icon: "warning"
      });
      return;
    }

    setIsSubmitting(true);

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
        valorantAlert.fire({
          title: "สั่งซื้อสำเร็จ!",
          html: `เลขที่คำสั่งซื้อของคุณคือ <span class="text-yellow-400 font-bold font-mono text-lg">#${result.orderId}</span><br><span class="text-xs text-gray-400">ระบบกำลังนำคุณไปยังหน้าแจ้งผลการสั่งซื้อ...</span>`,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          allowOutsideClick: false
        }).then(() => {
          clearCart();
          window.location.href = `/shop/checkout/receiver/success?orderId=${result.orderId}`;
        });
      } else {
        valorantAlert.fire({
          title: "เกิดข้อผิดพลาด",
          text: result.error,
          icon: "error"
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      valorantAlert.fire({
        title: "การเชื่อมต่อล้มเหลว",
        text: error.message,
        icon: "error"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl text-white font-sans min-h-screen py-10">

      {/* Header */}
      <div className="relative mb-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#ff4655]"></div>
        <div className="pl-6 py-2">
          <span className="text-[#ff4655] text-xs font-bold tracking-widest uppercase block mb-1">
            Secure Checkout
          </span>
          <h1 className="text-3xl font-extrabold tracking-wider uppercase">
            กรอกข้อมูลผู้รับ
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="bg-[#111923] border border-[#202c38] p-6 lg:p-8 relative">

              {/* Valorant design corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-800 pointer-events-none"></div>

              <h2 className="text-xl font-bold tracking-wider uppercase mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ff4655] inline-block"></span>
                ข้อมูลการจัดส่ง
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    ชื่อ-นามสกุล <span className="text-[#ff4655]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ชื่อ - นามสกุล"
                    className="w-full bg-[#080d13] border border-[#202c38] text-white px-4 py-3 rounded-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655] focus:outline-none transition-all duration-200 placeholder-gray-600 text-sm font-medium"
                    required
                  />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      อีเมล <span className="text-[#ff4655]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@valorant.com"
                      className="w-full bg-[#080d13] border border-[#202c38] text-white px-4 py-3 rounded-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655] focus:outline-none transition-all duration-200 placeholder-gray-600 text-sm font-medium"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      เบอร์โทรศัพท์ <span className="text-[#ff4655]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812345678"
                      className="w-full bg-[#080d13] border border-[#202c38] text-white px-4 py-3 rounded-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655] focus:outline-none transition-all duration-200 placeholder-gray-600 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    ที่อยู่จัดส่ง <span className="text-[#ff4655]">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="กรอกที่อยู่สำหรับรับสินค้าอย่างละเอียด..."
                    className="w-full bg-[#080d13] border border-[#202c38] text-white px-4 py-3 rounded-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655] focus:outline-none transition-all duration-200 h-28 placeholder-gray-600 resize-none text-sm font-medium"
                    required
                  />
                </div>

                {/* Payment Method */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    วิธีการชำระเงิน <span className="text-[#ff4655]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full bg-[#080d13] border border-[#202c38] text-white px-4 py-3 rounded-none focus:border-[#ff4655] focus:outline-none appearance-none transition-all duration-200 text-sm font-medium cursor-pointer"
                    >
                      <option value="credit_card">💳 บัตรเครดิต/เดบิต</option>
                      <option value="bank_transfer">🏦 โอนเงินผ่านธนาคาร</option>
                      <option value="cod">📦 ชำระเงินปลายทาง</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting || orderItems.length === 0}
                  className={`relative group overflow-hidden w-full py-4 px-6 font-bold uppercase tracking-widest transition-all duration-300 text-sm border border-transparent ${isSubmitting || orderItems.length === 0
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-[#ff4655] text-white hover:bg-[#ff5865] cursor-pointer active:translate-y-0.5"
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        กำลังดำเนินการ...
                      </>
                    ) : (
                      <>
                        ยืนยันการสั่งซื้อ
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>

            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111923] border border-[#202c38] p-6 relative">
            <h2 className="text-xl font-bold tracking-wider uppercase mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[#ff4655] inline-block"></span>
              สรุปคำสั่งซื้อ
            </h2>

            {orderItems.length > 0 ? (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-[#080d13] p-3 border border-[#1b2530]">
                    <div className="w-16 h-16 bg-[#0F1923] flex-shrink-0 flex items-center justify-center p-1 border border-[#202c38]">
                      <img
                        src={item.image_url || item.image}
                        alt={item.name}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.target.src = "/placeholder-product.png";
                        }}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-sm tracking-wide truncate">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">{item.type || "Weapon"}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-[#202c38] px-2 py-0.5 text-gray-300 font-semibold font-mono">
                          QTY: {item.quantity}
                        </span>
                        <span className="font-bold text-sm text-[#ff4655]">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                ไม่มีสินค้าในตะกร้า
              </div>
            )}

            <div className="border-t border-[#202c38] mt-6 pt-6 space-y-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span>ราคาสินค้ารวม</span>
                <span className="font-mono">฿{orderTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>ค่าบริการจัดส่ง</span>
                <span className="text-green-400 font-bold uppercase tracking-wider">FREE</span>
              </div>
              <div className="border-t border-dashed border-[#202c38] pt-3 flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider">รวมทั้งหมด</span>
                <span className="text-2xl font-extrabold text-[#ff4655] font-mono">
                  ฿{orderTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6 border-t border-[#202c38] pt-4">
              <Link href="/shop" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#ff4655] transition-colors flex items-center justify-center gap-2 font-bold py-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                กลับไปเลือกสินค้าเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

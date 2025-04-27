"use client";
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { cart, removeFromCart, totalPrice, isLoaded } = useCart();

  // แสดง loading state ถ้าตะกร้ายังไม่โหลดเสร็จ
  if (!isLoaded) {
    return (
      <div className="container mx-auto p-4 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>กำลังโหลดตะกร้าสินค้า...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white bg-valorant-red p-4 rounded-lg">
        VALORANT LL CHECKOUT
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-red-600 uppercase font-bold">Your cart is empty</p>
          <Link href="/shop" className="btn btn-primary mt-4">
            Back to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="card bg-base-200 shadow-xl">
                <div className="card-body flex flex-row">
                  <figure className="w-1/3">
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-full h-32 object-contain rounded-lg"
                    />
                  </figure>
                  <div className="w-2/3 pl-4">
                    <h2 className="card-title text-white">{item.name}</h2>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold text-primary">
                        ฿{item.price.toLocaleString()}
                      </span>
                      <div className="badge badge-outline text-white">
                        x {item.quantity}
                      </div>
                    </div>
                    <div className="card-actions justify-end mt-2">
                      <button 
                        className="btn btn-sm btn-error hover:bg-red-600 text-white"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card bg-base-200 shadow-xl h-fit sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-white">Order Summary</h2>
              <div className="divider"></div>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-white">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="divider"></div>
              <div className="flex justify-between text-lg font-bold text-green-300">
                <span>Total</span>
                <span className="text-primary">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>
              <Link 
                href="/shop/checkout/receiver"
                className="btn btn-primary mt-4"
              >
                Proceed to Payment
               
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
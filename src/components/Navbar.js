"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-black dark:text-white">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-300 text-red-500 text-3xl font-bold"
          >
            VALORANT LL
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/character"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Character
          </Link>
          <Link
            href="/map"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Map
          </Link>
          <Link
            href="/weapon"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Weapon
          </Link>
          <Link
            href="/shop"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Contact
          </Link>
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-accent animate-ping"></div>
            <div className="status status-accent"></div>
          </div>
          <Link
            href="/shop/checkout"
            className="relative text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
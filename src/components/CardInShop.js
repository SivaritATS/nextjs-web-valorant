"use client";
import { useCart } from "@/context/CartContext";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const valorantToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  background: "#0F1923",
  color: "#FFFFFF",
  customClass: {
    popup: "border-l-4 border-[#ff4655] rounded-none font-sans shadow-lg border border-gray-800",
    title: "text-sm font-bold uppercase tracking-wider text-white"
  }
});

export default function CardInShop({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
      valorantToast.fire({
        icon: "success",
        title: `${product.name} Added to Cart!`
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full shadow-sm hover:shadow-md text-white transition duration-200 ease-in-out">
      <figure className="px-4 pt-4">
        <img
          src={product.image_url || product.image}
          alt={product.name}
          className="rounded-xl w-full h-48 object-contain bg-white"
          onError={(e) => {
            e.target.src = "/placeholder-product.png";
          }}
        />
      </figure>

      {/* ข้อมูล */}
      <div className="card-body p-4">
        {product.type && (
          <div className="badge badge-info badge-outline uppercase font-bold">
            {product.type}
          </div>
        )}

        <h2 className="card-title text-lg">{product.name}</h2>

        {/* สต็อกและราคา */}
        <div className="flex justify-between items-center mt-2">
          <span
            className={`badge ${
              product.stock > 0 ? "badge-success" : "badge-error"
            }`}
          >
            {product.stock > 0
              ? `In Stock: ${product.stock}`
              : "Out of Stock"}
          </span>
          <span className="font-bold text-primary">฿{product.price}</span>
        </div>

        {/* Add to Cart */}
        <div className="card-actions mt-3">
          <button
            className={`btn btn-block btn-sm ${
              product.stock > 0 ? "btn-primary" : "btn-disabled"
            }`}
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            {product.stock > 0 ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

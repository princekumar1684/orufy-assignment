import { Trash } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product, onEdit, onDelete, onToggle }) => {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">
      <div className="relative border rounded-xl p-3">
        <img
          src={product.images?.[currentImage]}
          alt={product.name}
          className="w-full h-48 object-contain"
        />

        {product.images?.length > 1 && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white border rounded-full px-2 py-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentImage === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h2 className="mt-4 font-semibold text-lg">{product.name}</h2>

      <div className="mt-3 text-gray-500 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Product Type</span>
          <span>{product.type}</span>
        </div>

        <div className="flex justify-between">
          <span>Quantity Stock</span>
          <span>{product.quantity}</span>
        </div>

        <div className="flex justify-between">
          <span>MRP</span>
          <span>₹ {product.mrp}</span>
        </div>

        <div className="flex justify-between">
          <span>Selling Price</span>
          <span>₹ {product.price}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Images</span>
          <span>{product.images?.length || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Exchange Eligible</span>
          <span>{product.isExchangeable ? "YES" : "NO"}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onToggle(product)}
          className={`flex-1 py-2 rounded-lg text-white ${
            product.status === "published" ? "bg-green-500" : "bg-blue-600"
          }`}
        >
          {product.status === "published" ? "Unpublish" : "Publish"}
        </button>

        <button
          onClick={() => onEdit(product)}
          className="flex-1 border rounded-lg py-2"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product)}
          className="w-12 border rounded-lg"
        >
          <Trash className="mx-auto text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

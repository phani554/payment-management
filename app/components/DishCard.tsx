import { Dish } from "../models/dish";
import { addToCart } from "../utils/cart";
import { useState } from "react";

interface DishCardProps {
  dish: Dish;
  onAddToCart?: () => void;
}

export default function DishCard({ dish, onAddToCart }: DishCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(dish, quantity);
    
    // Trigger event to update cart count in header
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
    
    // Reset quantity and show success feedback
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
      if (onAddToCart) onAddToCart();
    }, 500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gray-200 relative">
        {dish.image ? (
          <img 
            src={dish.image} 
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for missing images
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=South+Indian+Dish";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-800">
            {dish.name}
          </div>
        )}
        
        {!dish.available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{dish.name}</h3>
        <p className="text-gray-600 text-sm mt-1 h-12 overflow-hidden">
          {dish.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-orange-600 font-bold">₹{dish.price}</span>
          
          {dish.available ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`px-3 py-1 rounded text-white transition ${
                  isAdding 
                    ? "bg-green-500" 
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {isAdding ? "Added!" : "Add"}
              </button>
            </div>
          ) : (
            <button
              disabled
              className="px-3 py-1 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

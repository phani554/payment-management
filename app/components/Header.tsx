import { Link } from "@remix-run/react";
import { useState } from "react";
import { getCurrentUser, isAdmin } from "../models/user";
import { getCart } from "../utils/cart";

export default function Header() {
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window !== "undefined") {
      return getCart().reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  });

  const user = getCurrentUser();

  // Update cart count when component mounts and when cart changes
  useState(() => {
    const updateCartCount = () => {
      setCartCount(getCart().reduce((total, item) => total + item.quantity, 0));
    };

    // Initial count
    updateCartCount();

    // Listen for storage events (cart updates)
    if (typeof window !== "undefined") {
      window.addEventListener("storage", updateCartCount);
      return () => window.removeEventListener("storage", updateCartCount);
    }
  });

  return (
    <header className="bg-orange-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          South Indian Delights
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/menu" className="hover:text-orange-200 transition">
            Menu
          </Link>
          
          {isAdmin() && (
            <Link to="/admin" className="hover:text-orange-200 transition">
              Admin Dashboard
            </Link>
          )}
          
          <Link to="/cart" className="relative hover:text-orange-200 transition">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span>{user.name}</span>
              <button 
                onClick={() => {
                  // In a real app, this would call a logout function
                  window.location.href = "/login";
                }}
                className="bg-orange-700 px-3 py-1 rounded hover:bg-orange-800 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-orange-700 px-4 py-2 rounded hover:bg-orange-800 transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

import { CartItem } from "../models/order";
import { Dish } from "../models/dish";

// Cart storage key
const CART_STORAGE_KEY = "south_indian_cart";

// Get cart from localStorage
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  if (!cartData) return [];
  
  try {
    return JSON.parse(cartData);
  } catch (error) {
    console.error("Failed to parse cart data:", error);
    return [];
  }
}

// Save cart to localStorage
export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Add item to cart
export function addToCart(dish: Dish, quantity: number = 1): CartItem[] {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.dish.id === dish.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({ dish, quantity });
  }
  
  saveCart(cart);
  return cart;
}

// Remove item from cart
export function removeFromCart(dishId: string): CartItem[] {
  const cart = getCart().filter(item => item.dish.id !== dishId);
  saveCart(cart);
  return cart;
}

// Update item quantity
export function updateCartItemQuantity(dishId: string, quantity: number): CartItem[] {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.dish.id === dishId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
    }
  }
  
  saveCart(cart);
  return cart;
}

// Clear cart
export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
}

// Calculate cart total
export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + (item.dish.price * item.quantity), 0);
}

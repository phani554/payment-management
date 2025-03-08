import { Dish } from "./dish";

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

// Mock data for orders
export const orders: Order[] = [
  {
    id: "order1",
    items: [
      { dish: { id: "1", name: "Masala Dosa", description: "Crispy rice crepe filled with spiced potato filling", price: 120, image: "/images/masala-dosa.jpg", category: "Dosa", available: true }, quantity: 2 },
      { dish: { id: "9", name: "Filter Coffee", description: "Traditional South Indian coffee with frothy milk", price: 40, image: "/images/filter-coffee.jpg", category: "Beverage", available: true }, quantity: 2 }
    ],
    totalAmount: 320,
    customerName: "Raj Kumar",
    customerEmail: "raj@example.com",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 84600000)
  },
  {
    id: "order2",
    items: [
      { dish: { id: "3", name: "Idli Sambar", description: "Steamed rice cakes served with lentil soup and chutney", price: 60, image: "/images/idli-sambar.jpg", category: "Idli", available: true }, quantity: 1 },
      { dish: { id: "4", name: "Medu Vada", description: "Crispy fried lentil donuts served with sambar and chutney", price: 70, image: "/images/medu-vada.jpg", category: "Vada", available: true }, quantity: 1 }
    ],
    totalAmount: 130,
    customerName: "Priya Singh",
    customerEmail: "priya@example.com",
    status: "preparing",
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date(Date.now() - 3000000)
  },
  {
    id: "order3",
    items: [
      { dish: { id: "5", name: "Sambar Rice", description: "Rice mixed with lentil soup and vegetables", price: 90, image: "/images/sambar-rice.jpg", category: "Rice", available: true }, quantity: 1 },
      { dish: { id: "8", name: "Payasam", description: "Sweet milk pudding with vermicelli and nuts", price: 70, image: "/images/payasam.jpg", category: "Dessert", available: true }, quantity: 1 }
    ],
    totalAmount: 160,
    customerName: "Anand Verma",
    customerEmail: "anand@example.com",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

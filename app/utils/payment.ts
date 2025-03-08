import { CartItem } from "../models/order";

// Mock payment processing
export async function processPayment(amount: number, customerEmail: string): Promise<{
  success: boolean;
  transactionId?: string;
  error?: string;
}> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, always succeed
  return {
    success: true,
    transactionId: `txn_${Date.now()}`
  };
}

// Generate order ID
export function generateOrderId(): string {
  return `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

// Create a new order
export async function createOrder(
  items: CartItem[],
  totalAmount: number,
  customerName: string,
  customerEmail: string
): Promise<{ orderId: string; success: boolean }> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const orderId = generateOrderId();
  
  // In a real app, this would save to a database
  console.log("Order created:", {
    id: orderId,
    items,
    totalAmount,
    customerName,
    customerEmail,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  return {
    orderId,
    success: true
  };
}

import { useState, useEffect } from "react";
import { MetaFunction, redirect } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCart, updateCartItemQuantity, removeFromCart, calculateCartTotal, clearCart } from "../utils/cart";
import { CartItem } from "../models/order";
import { processPayment, createOrder } from "../utils/payment";

export const meta: MetaFunction = () => {
  return [
    { title: "Your Cart - South Indian Delights" },
    { name: "description", content: "Review and checkout your order." },
  ];
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  // Load cart on component mount
  useEffect(() => {
    const cartItems = getCart();
    setCart(cartItems);
    setTotal(calculateCartTotal(cartItems));
  }, []);
  
  // Handle quantity change
  const handleQuantityChange = (dishId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(dishId);
      return;
    }
    
    const updatedCart = updateCartItemQuantity(dishId, newQuantity);
    setCart(updatedCart);
    setTotal(calculateCartTotal(updatedCart));
  };
  
  // Handle remove item
  const handleRemoveItem = (dishId: string) => {
    const updatedCart = removeFromCart(dishId);
    setCart(updatedCart);
    setTotal(calculateCartTotal(updatedCart));
    
    // Trigger event to update cart count in header
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
  };
  
  // Handle checkout
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) return;
    
    setPaymentStatus("processing");
    
    try {
      // Process payment (mock)
      const paymentResult = await processPayment(total, customerEmail);
      
      if (paymentResult.success) {
        // Create order
        const orderResult = await createOrder(
          cart,
          total,
          customerName,
          customerEmail
        );
        
        if (orderResult.success) {
          setOrderId(orderResult.orderId);
          setPaymentStatus("success");
          clearCart();
          
          // Trigger event to update cart count in header
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("storage"));
          }
          
          // Redirect to success page after a delay
          setTimeout(() => {
            navigate("/order-success");
          }, 3000);
        } else {
          setPaymentStatus("error");
        }
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setPaymentStatus("error");
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
          
          {paymentStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-2xl mx-auto text-center">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Order Successful!</h2>
              <p className="text-green-700 mb-4">
                Thank you for your order, {customerName}. Your order has been placed successfully.
              </p>
              <p className="text-green-700 mb-6">
                Order ID: <span className="font-bold">{orderId}</span>
              </p>
              <p className="text-sm text-green-600 mb-4">
                You will be redirected to the order success page shortly...
              </p>
              <Link 
                to="/menu" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {cart.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Link 
                    to="/menu" 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-bold transition inline-block"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Cart items */}
                  <div className="lg:w-2/3">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-4 text-left">Item</th>
                            <th className="py-3 px-4 text-center">Quantity</th>
                            <th className="py-3 px-4 text-right">Price</th>
                            <th className="py-3 px-4 text-right">Total</th>
                            <th className="py-3 px-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => (
                            <tr key={item.dish.id} className="border-b border-gray-200">
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <img 
                                    src={item.dish.image || "https://via.placeholder.com/80?text=Dish"} 
                                    alt={item.dish.name}
                                    className="w-16 h-16 object-cover rounded mr-4"
                                  />
                                  <div>
                                    <h3 className="font-bold text-gray-800">{item.dish.name}</h3>
                                    <p className="text-sm text-gray-600">{item.dish.category}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center justify-center">
                                  <button 
                                    onClick={() => handleQuantityChange(item.dish.id, item.quantity - 1)}
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-l"
                                  >
                                    -
                                  </button>
                                  <span className="px-4">{item.quantity}</span>
                                  <button 
                                    onClick={() => handleQuantityChange(item.dish.id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-r"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-right">₹{item.dish.price}</td>
                              <td className="py-4 px-4 text-right font-bold">
                                ₹{item.dish.price * item.quantity}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <button 
                                  onClick={() => handleRemoveItem(item.dish.id)}
                                  className="text-red-500 hover:text-red-700"
                                  aria-label="Remove item"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Order summary */}
                  <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                      
                      <div className="border-t border-b border-gray-200 py-4 mb-4">
                        <div className="flex justify-between mb-2">
                          <span>Subtotal</span>
                          <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Delivery Fee</span>
                          <span>₹0</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>₹{total}</span>
                        </div>
                      </div>
                      
                      {isCheckingOut ? (
                        <form onSubmit={handleCheckout}>
                          <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                            <input
                              type="text"
                              id="name"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              required
                              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                              placeholder="Your full name"
                            />
                          </div>
                          
                          <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                            <input
                              type="email"
                              id="email"
                              value={customerEmail}
                              onChange={(e) => setCustomerEmail(e.target.value)}
                              required
                              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                              placeholder="Your email address"
                            />
                          </div>
                          
                          <button
                            type="submit"
                            disabled={paymentStatus === "processing"}
                            className={`w-full py-3 rounded-lg font-bold text-white ${
                              paymentStatus === "processing"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-600 hover:bg-orange-700"
                            }`}
                          >
                            {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
                          </button>
                          
                          {paymentStatus === "error" && (
                            <p className="text-red-500 text-center mt-4">
                              There was an error processing your payment. Please try again.
                            </p>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => setIsCheckingOut(false)}
                            className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
                          >
                            Back to Cart
                          </button>
                        </form>
                      ) : (
                        <button
                          onClick={() => setIsCheckingOut(true)}
                          disabled={cart.length === 0}
                          className={`w-full py-3 rounded-lg font-bold text-white ${
                            cart.length === 0
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-orange-600 hover:bg-orange-700"
                          }`}
                        >
                          Proceed to Checkout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

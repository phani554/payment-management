import { useState, useEffect } from "react";
import { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderStatusBadge from "../components/OrderStatusBadge";
import { dishes, Dish, categories } from "../models/dish";
import { orders, Order, OrderStatus } from "../models/order";
import { getCurrentUser, isAdmin } from "../models/user";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard - South Indian Delights" },
    { name: "description", content: "Manage your restaurant." },
  ];
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"orders" | "menu">("orders");
  const [localOrders, setLocalOrders] = useState<Order[]>([]);
  const [localDishes, setLocalDishes] = useState<Dish[]>([]);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  
  const navigate = useNavigate();
  
  // Check if user is admin
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
    
    // Initialize local state
    setLocalOrders([...orders]);
    setLocalDishes([...dishes]);
  }, [navigate]);
  
  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setLocalOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date() } 
          : order
      )
    );
  };
  
  // Handle dish availability toggle
  const handleAvailabilityToggle = (dishId: string) => {
    setLocalDishes(prevDishes => 
      prevDishes.map(dish => 
        dish.id === dishId 
          ? { ...dish, available: !dish.available } 
          : dish
      )
    );
  };
  
  // Handle edit dish
  const handleEditDish = (dish: Dish) => {
    setEditingDish({ ...dish });
  };
  
  // Handle save dish
  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingDish) return;
    
    setLocalDishes(prevDishes => 
      prevDishes.map(dish => 
        dish.id === editingDish.id 
          ? { ...editingDish } 
          : dish
      )
    );
    
    setEditingDish(null);
  };
  
  // Handle input change for editing dish
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingDish) return;
    
    const { name, value, type } = e.target;
    
    setEditingDish(prev => {
      if (!prev) return prev;
      
      if (type === "number") {
        return { ...prev, [name]: parseFloat(value) };
      } else if (type === "checkbox") {
        return { ...prev, [name]: (e.target as HTMLInputElement).checked };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-3 px-6 font-medium ${
                activeTab === "orders"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`py-3 px-6 font-medium ${
                activeTab === "menu"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Menu Management
            </button>
          </div>
          
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Items</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {localOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    localOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-200">
                        <td className="py-4 px-4">
                          <span className="font-mono">{order.id}</span>
                          <div className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </td>
                        <td className="py-4 px-4">
                          <ul className="list-disc list-inside text-sm">
                            {order.items.map(item => (
                              <li key={item.dish.id}>
                                {item.quantity} × {item.dish.name}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-4 px-4 text-right font-bold">
                          ₹{order.totalAmount}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="w-full p-2 border rounded"
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Menu Management Tab */}
          {activeTab === "menu" && (
            <div>
              {editingDish ? (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">Edit Dish</h2>
                  
                  <form onSubmit={handleSaveDish}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editingDish.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Category</label>
                        <select
                          name="category"
                          value={editingDish.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Price (₹)</label>
                        <input
                          type="number"
                          name="price"
                          value={editingDish.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="1"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Image URL</label>
                        <input
                          type="text"
                          name="image"
                          value={editingDish.image}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                          name="description"
                          value={editingDish.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        ></textarea>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="available"
                            checked={editingDish.available}
                            onChange={(e) => setEditingDish({...editingDish, available: e.target.checked})}
                            className="mr-2"
                          />
                          <span>Available</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-4">
                      <button
                        type="button"
                        onClick={() => setEditingDish(null)}
                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Dish</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-right">Price</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localDishes.map(dish => (
                      <tr key={dish.id} className="border-b border-gray-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img 
                              src={dish.image || "https://via.placeholder.com/80?text=Dish"} 
                              alt={dish.name}
                              className="w-12 h-12 object-cover rounded mr-4"
                            />
                            <div>
                              <h3 className="font-bold text-gray-800">{dish.name}</h3>
                              <p className="text-sm text-gray-600 truncate max-w-xs">{dish.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">{dish.category}</td>
                        <td className="py-4 px-4 text-right font-bold">₹{dish.price}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            dish.available 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {dish.available ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleEditDish(dish)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                              aria-label="Edit dish"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleAvailabilityToggle(dish.id)}
                              className={`p-1 ${dish.available ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"}`}
                              aria-label={dish.available ? "Mark as unavailable" : "Mark as available"}
                            >
                              {dish.available ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

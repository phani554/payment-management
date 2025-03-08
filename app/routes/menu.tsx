import { useState } from "react";
import { MetaFunction } from "@remix-run/node";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DishCard from "../components/DishCard";
import CategoryFilter from "../components/CategoryFilter";
import { dishes } from "../models/dish";

export const meta: MetaFunction = () => {
  return [
    { title: "Menu - South Indian Delights" },
    { name: "description", content: "Browse our menu of authentic South Indian dishes." },
  ];
};

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter dishes based on category and search query
  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = selectedCategory === null || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-3">Search</h2>
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </div>
            
            {/* Main content with dishes */}
            <div className="md:w-3/4">
              {filteredDishes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDishes.map(dish => (
                    <DishCard 
                      key={dish.id} 
                      dish={dish} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-2">No dishes found</h3>
                  <p className="text-gray-600">
                    Try changing your search criteria or category filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

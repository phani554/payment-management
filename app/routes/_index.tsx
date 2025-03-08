import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dishes } from "../models/dish";

export const meta: MetaFunction = () => {
  return [
    { title: "South Indian Delights - Authentic South Indian Cuisine" },
    { name: "description", content: "Enjoy authentic South Indian dishes like dosas, idlis, and more." },
  ];
};

export default function Index() {
  // Featured dishes (first 3 dishes)
  const featuredDishes = dishes.slice(0, 3);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-orange-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Authentic South Indian Cuisine
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Experience the rich flavors and traditions of South India with our 
                  handcrafted dishes made from authentic recipes.
                </p>
                <div className="flex space-x-4">
                  <Link 
                    to="/menu" 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition"
                  >
                    View Menu
                  </Link>
                  <Link 
                    to="/login" 
                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-lg font-bold transition"
                  >
                    Login
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://source.unsplash.com/random/800x600/?dosa,southindian,food" 
                  alt="South Indian Food" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Dishes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDishes.map(dish => (
                <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={dish.image || "https://via.placeholder.com/300x200?text=South+Indian+Dish"} 
                    alt={dish.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                    <p className="text-gray-600 mb-4">{dish.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-bold">₹{dish.price}</span>
                      <Link 
                        to="/menu" 
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img 
                  src="https://source.unsplash.com/random/800x600/?restaurant,southindian" 
                  alt="Our Restaurant" 
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2010, South Indian Delights has been serving authentic South Indian 
                  cuisine made with traditional recipes passed down through generations.
                </p>
                <p className="text-gray-600 mb-6">
                  Our chefs are trained in the art of South Indian cooking, ensuring that every 
                  dish that leaves our kitchen is a perfect blend of flavors, aromas, and textures 
                  that define the rich culinary heritage of South India.
                </p>
                <Link 
                  to="/menu" 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition inline-block"
                >
                  Explore Our Menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

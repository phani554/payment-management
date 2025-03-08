export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

export const categories = [
  "Dosa",
  "Idli",
  "Vada",
  "Rice",
  "Curry",
  "Dessert",
  "Beverage"
];

// Mock data for dishes
export const dishes: Dish[] = [
  {
    id: "1",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling",
    price: 120,
    image: "/images/masala-dosa.jpg",
    category: "Dosa",
    available: true
  },
  {
    id: "2",
    name: "Plain Dosa",
    description: "Thin and crispy rice crepe served with sambar and chutney",
    price: 80,
    image: "/images/plain-dosa.jpg",
    category: "Dosa",
    available: true
  },
  {
    id: "3",
    name: "Idli Sambar",
    description: "Steamed rice cakes served with lentil soup and chutney",
    price: 60,
    image: "/images/idli-sambar.jpg",
    category: "Idli",
    available: true
  },
  {
    id: "4",
    name: "Medu Vada",
    description: "Crispy fried lentil donuts served with sambar and chutney",
    price: 70,
    image: "/images/medu-vada.jpg",
    category: "Vada",
    available: true
  },
  {
    id: "5",
    name: "Sambar Rice",
    description: "Rice mixed with lentil soup and vegetables",
    price: 90,
    image: "/images/sambar-rice.jpg",
    category: "Rice",
    available: true
  },
  {
    id: "6",
    name: "Curd Rice",
    description: "Rice mixed with yogurt and tempered with spices",
    price: 80,
    image: "/images/curd-rice.jpg",
    category: "Rice",
    available: true
  },
  {
    id: "7",
    name: "Rasam",
    description: "Tangy and spicy tamarind soup",
    price: 50,
    image: "/images/rasam.jpg",
    category: "Curry",
    available: true
  },
  {
    id: "8",
    name: "Payasam",
    description: "Sweet milk pudding with vermicelli and nuts",
    price: 70,
    image: "/images/payasam.jpg",
    category: "Dessert",
    available: true
  },
  {
    id: "9",
    name: "Filter Coffee",
    description: "Traditional South Indian coffee with frothy milk",
    price: 40,
    image: "/images/filter-coffee.jpg",
    category: "Beverage",
    available: true
  },
  {
    id: "10",
    name: "Rava Dosa",
    description: "Crispy semolina crepe served with sambar and chutney",
    price: 100,
    image: "/images/rava-dosa.jpg",
    category: "Dosa",
    available: true
  }
];

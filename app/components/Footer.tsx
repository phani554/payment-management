export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">South Indian Delights</h3>
            <p className="text-gray-300">
              Authentic South Indian cuisine made with love and tradition.
              Serving the finest dosas, idlis, and more since 2010.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <ul className="text-gray-300">
              <li>Monday - Friday: 8:00 AM - 10:00 PM</li>
              <li>Saturday - Sunday: 7:00 AM - 11:00 PM</li>
              <li>Holidays: 9:00 AM - 9:00 PM</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="text-gray-300">
              <li>123 Food Street, Bangalore</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@southindiandelights.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} South Indian Delights. All rights reserved.</p>
          <p className="mt-2">This is a demo application.</p>
        </div>
      </div>
    </footer>
  );
}

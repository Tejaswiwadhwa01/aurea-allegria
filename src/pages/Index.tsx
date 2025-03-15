
import React from "react";
import { Link } from "react-router-dom";
import FeaturedProduct from "../components/FeaturedProduct";
import Newsletter from "../components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/8e5069b4-1059-4a78-950e-dbe06d15a4ba.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-light uppercase tracking-widest mb-3">
            AUREA
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wider">
            Timeless Elegance, Redefined
          </p>
          <div className="mt-8">
            <Link
              to="/collections"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>

      {/* Women's Collection Teaser */}
      <div className="py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl mb-8 font-light uppercase tracking-wider">
          Women's Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <FeaturedProduct
            id="w1"
            name="Classic White Blouse"
            price="₹4,999"
            category="shirts"
            imageUrl="/lovable-uploads/23dd5301-7add-4182-ac74-708dcf012e83.png"
            link="/women/shirts"
          />
          <FeaturedProduct
            id="w2"
            name="Elegant Evening Dress"
            price="₹12,999"
            category="dresses"
            imageUrl="/lovable-uploads/9f9fdccf-d3a8-46da-b7e4-4f1ec9ca5774.png"
            link="/women/dresses"
          />
          <FeaturedProduct
            id="w3"
            name="Tailored Denim Jeans"
            price="₹7,499"
            category="jeans"
            imageUrl="/lovable-uploads/5fb886d7-b46f-489c-9e14-9413fa67c723.png"
            link="/women/jeans"
          />
        </div>
        <div className="mt-10">
          <Link
            to="/women"
            className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Shop Women
          </Link>
        </div>
      </div>

      {/* Men's Collection Teaser */}
      <div className="py-16 px-4 md:px-8 bg-gray-50 text-center">
        <h2 className="text-3xl mb-8 font-light uppercase tracking-wider">
          Men's Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <FeaturedProduct
            id="m1"
            name="Oxford Cotton Shirt"
            price="₹5,999"
            category="shirts"
            imageUrl="/lovable-uploads/0add1fce-a6b1-41c0-952d-11a28bd00c28.png"
            link="/men/shirts"
          />
          <FeaturedProduct
            id="m2"
            name="Premium Denim Jeans"
            price="₹8,499"
            category="jeans"
            imageUrl="/lovable-uploads/1072cfc7-8d68-43ca-bec0-3411744d2ccd.png"
            link="/men/jeans"
          />
          <FeaturedProduct
            id="m3"
            name="Tailored Wool Blazer"
            price="₹16,999"
            category="blazers"
            imageUrl="/lovable-uploads/39a9c19f-0a4e-43a2-9acb-2ac924b6212b.png"
            link="/men/blazers"
          />
        </div>
        <div className="mt-10">
          <Link
            to="/men"
            className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Shop Men
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <footer className="bg-black text-white p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl mb-4 font-light">AUREA</h3>
            <p className="text-sm text-gray-300">
              Timeless elegance for the modern individual. Our pieces are
              crafted with care, designed to last, and created to inspire.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-4 font-light">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-white transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/men" className="hover:text-white transition-colors">
                  Men
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4 font-light">Contact</h3>
            <address className="not-italic text-sm text-gray-300 space-y-2">
              <p>123 Fashion Street</p>
              <p>Style City, SC 12345</p>
              <p>Email: info@aurea.example</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} AUREA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

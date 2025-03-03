
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ChevronDown, Menu, X, User } from "lucide-react";
import CartButton from "@/components/CartButton";

const MenJeans = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleWomenDropdown = () => {
    setShowWomenDropdown(!showWomenDropdown);
  };

  const toggleMenDropdown = () => {
    setShowMenDropdown(!showMenDropdown);
  };

  const products = [
    {
      id: 1,
      name: "Black Slim Fit Jeans",
      price: "89.99",
      image: "/lovable-uploads/9f9fdccf-d3a8-46da-b7e4-4f1ec9ca5774.png"
    },
    {
      id: 2,
      name: "Light Wash Jeans",
      price: "79.99",
      image: "/lovable-uploads/9f3e9005-58d9-4fbd-a750-feb31705fe1c.png"
    },
    {
      id: 3,
      name: "Dark Blue Straight Jeans",
      price: "75.99",
      image: "/lovable-uploads/c8cbb710-3ec4-4915-8f1f-57773fcad387.png"
    },
    {
      id: 4,
      name: "Grey Casual Trousers",
      price: "69.99",
      image: "/lovable-uploads/8e5069b4-1059-4a78-950e-dbe06d15a4ba.png"
    },
    {
      id: 5,
      name: "Beige Chino Trousers",
      price: "65.99",
      image: "/lovable-uploads/f85298ef-0ff9-43a4-a1f0-5004da08f80e.png"
    },
    {
      id: 6,
      name: "Dark Grey Tailored Trousers",
      price: "85.99",
      image: "/lovable-uploads/e94ec6f8-e672-4266-ae19-20af91eb2c50.png"
    },
    {
      id: 7,
      name: "Navy Blue Classic Trousers",
      price: "79.99",
      image: "/lovable-uploads/5fb886d7-b46f-489c-9e14-9413fa67c723.png"
    },
    {
      id: 8,
      name: "Black Formal Trousers",
      price: "89.99",
      image: "/lovable-uploads/13e41aad-f838-4a2d-9392-5f6af86fef4d.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#262626]">
      {/* Header/Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none transition-opacity hover:opacity-70"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-sm tracking-wide hover:text-[#a67c52] transition-colors duration-300"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleWomenDropdown}
                className="text-sm tracking-wide hover:text-[#a67c52] flex items-center transition-colors duration-300"
              >
                Shop Women
                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${showWomenDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showWomenDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md z-50 py-2">
                  <Link 
                    to="/women/shirts" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Shirts & Blouses
                  </Link>
                  <Link 
                    to="/women/dresses" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Dresses
                  </Link>
                  <Link 
                    to="/women/jeans" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Jeans & Trousers
                  </Link>
                  <Link 
                    to="/women/accessories" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Accessories
                  </Link>
                  <Link 
                    to="/women/knitwear" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Knitwear
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleMenDropdown}
                className="text-sm tracking-wide text-[#a67c52] flex items-center transition-colors duration-300"
              >
                Shop Men
                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${showMenDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showMenDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md z-50 py-2">
                  <Link 
                    to="/men/shirts" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Shirts & T-shirts
                  </Link>
                  <Link 
                    to="/men/jeans" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Trousers & Jeans
                  </Link>
                  <Link 
                    to="/men/blazers" 
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors"
                  >
                    Blazers
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/collections"
              className="text-sm tracking-wide hover:text-[#a67c52] transition-colors duration-300"
            >
              Featured Collections
            </Link>
          </nav>

          <Link to="/" className="text-3xl font-serif tracking-widest font-light">
            AUREA
          </Link>

          <div className="flex items-center space-x-5">
            <Link
              to="/favorites"
              className="hidden md:flex transition-opacity hover:opacity-70"
              aria-label="Favorites"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/login"
              className="hidden md:flex transition-opacity hover:opacity-70"
              aria-label="Login"
            >
              <User size={20} />
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-light">Men's Trousers & Jeans</h1>
              <div className="flex items-center text-sm text-[#595959] mt-2">
                <Link to="/" className="hover:text-[#a67c52] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/men" className="hover:text-[#a67c52] transition-colors">Men</Link>
                <span className="mx-2">/</span>
                <span>Trousers & Jeans</span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] bg-[#e9e5e0] mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <button
                        className="flex items-center justify-center space-x-2 bg-[#262626] text-white py-3 px-5 text-sm hover:bg-[#333] transition-colors w-full"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag size={16} />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        className="ml-3 p-3 border border-[#e2dcd5] hover:border-[#a67c52] transition-colors bg-white"
                        aria-label="Add to favorites"
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mb-1 transition-colors group-hover:text-[#a67c52]">{product.name}</h3>
                <p className="text-[#595959]">${product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#262626] text-[#e2dcd5] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div>
              <h4 className="font-serif text-xl mb-6 tracking-wider text-white">AUREA</h4>
              <p className="text-sm leading-relaxed opacity-80">
                Timeless elegance for the discerning individual. Luxury redefined through simplicity and quality.
              </p>
            </div>
            
            <div>
              <h5 className="text-sm uppercase tracking-wider mb-6 font-medium text-white">Explore</h5>
              <ul className="space-y-4">
                <li><Link to="/women" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Women</Link></li>
                <li><Link to="/men" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Men</Link></li>
                <li><Link to="/collections" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Collections</Link></li>
                <li><Link to="/stories" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Stories</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm uppercase tracking-wider mb-6 font-medium text-white">Information</h5>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link to="/sustainability" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Sustainability</Link></li>
                <li><Link to="/contact" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Contact</Link></li>
                <li><Link to="/careers" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm uppercase tracking-wider mb-6 font-medium text-white">Customer Care</h5>
              <ul className="space-y-4">
                <li><Link to="/shipping" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Shipping & Returns</Link></li>
                <li><Link to="/faq" className="text-sm opacity-80 hover:opacity-100 transition-opacity">FAQ</Link></li>
                <li><Link to="/privacy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-[#3a3a3a] text-sm text-center opacity-70">
            <p>© {new Date().getFullYear()} AUREA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenJeans;

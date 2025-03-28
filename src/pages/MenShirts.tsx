import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ChevronDown, Menu, X, User, ChevronLeft, ChevronRight } from "lucide-react";
import CartButton from "@/components/CartButton";
import FeaturedProduct from "@/components/FeaturedProduct";
import { formatIndianRupees } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";

const MenShirts = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

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

  const handlePrevImage = (productId: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [productId]: 0
    }));
  };

  const handleNextImage = (productId: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [productId]: 1
    }));
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price) * 100 : product.price,
      image: product.images[0],
      color: product.color || '',
    });
  };

  const products = [
    {
      id: 1,
      name: "Black Formal Shirt",
      price: 8999,
      images: [
        "/lovable-uploads/fd880c76-67f0-4f43-98ab-523d37ccf6a8.png",
        "/lovable-uploads/4fc87612-daf4-426d-b6ad-fec78f6900ca.png"
      ]
    },
    {
      id: 2,
      name: "Blue Striped Shirt",
      price: 6999,
      images: [
        "/lovable-uploads/827d96b9-68a1-4cdb-a89f-bced5e57cd62.png",
        "/lovable-uploads/ef4f5a58-af71-4ede-9eb7-a78ff44e981b.png"
      ]
    },
    {
      id: 3,
      name: "Beige Linen Shirt",
      price: 6599,
      images: [
        "/lovable-uploads/da505da3-3aeb-48e8-ac09-f25d7fe54a51.png",
        "/lovable-uploads/9e49cec3-e031-4e36-aacc-4e504e4a13c2.png"
      ]
    },
    {
      id: 4,
      name: "Beige Striped Shirt",
      price: 6999,
      images: [
        "/lovable-uploads/154ea1be-0a90-4084-bd82-abda73c9fb10.png",
        "/lovable-uploads/e0ceb2a3-21ee-47f8-b042-b16ca61ff77c.png"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#262626]">
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

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-light">Men's Shirts & T-shirts</h1>
              <div className="flex items-center text-sm text-[#595959] mt-2">
                <Link to="/" className="hover:text-[#a67c52] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/men" className="hover:text-[#a67c52] transition-colors">Men</Link>
                <span className="mx-2">/</span>
                <span>Shirts & T-shirts</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] bg-[#e9e5e0] mb-4 overflow-hidden relative">
                  <img
                    src={product.images[activeImageIndex[product.id] || 0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                    <button 
                      onClick={() => handlePrevImage(product.id)}
                      className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      onClick={() => handleNextImage(product.id)}
                      className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          (activeImageIndex[product.id] || 0) === idx 
                            ? 'bg-white w-4' 
                            : 'bg-white/50'
                        }`}
                        onClick={() => setActiveImageIndex(prev => ({...prev, [product.id]: idx}))}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleAddToCart(product)}
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
                <p className="text-[#595959]">{formatIndianRupees(product.price)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

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

export default MenShirts;



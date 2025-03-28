import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CartButton from "@/components/CartButton";
import { Heart, User, Menu, X, ShoppingBag, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/contexts/FavoritesContext";
import { formatIndianRupees } from "@/utils/formatCurrency";

const MenJeans = () => {
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      image: product.images[0],
      color: product.color,
    });
  };

  const products = [
    {
      id: 1,
      name: "Formal Wool Trousers",
      price: 8999,
      images: [
        "/lovable-uploads/4909147a-0154-4ab7-9c19-c34a8f9c06b7.png",
        "/lovable-uploads/ccdccb8b-7e4a-497f-8987-1411ac3b07bf.png"
      ],
      color: "Gray",
      isSale: false,
    },
    {
      id: 2,
      name: "Utility Cargo Pants",
      price: 7999,
      images: [
        "/lovable-uploads/70af653b-36a6-4098-83da-e39456ffa189.png",
        "/lovable-uploads/ebda48de-45c3-41eb-bc99-2a9e83f6ce85.png"
      ],
      color: "Beige",
      isSale: true,
      salePrice: 5999,
    },
    {
      id: 3,
      name: "Straight Fit Jeans",
      price: 6999,
      images: [
        "/lovable-uploads/78861e34-e394-43db-a2d8-a9b2488887a1.png",
        "/lovable-uploads/a180905d-8f11-4105-997d-63c8f31c3017.png"
      ],
      color: "Medium Wash",
      isSale: false,
    },
    {
      id: 4,
      name: "Relaxed Fit Light Jeans",
      price: 6999,
      images: [
        "/lovable-uploads/94a76c7e-af34-4973-b462-5b3c66b5ccaf.png",
        "/lovable-uploads/119077b8-96f2-48de-8466-e14df5917db1.png"
      ],
      color: "Light Wash",
      isSale: false,
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
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors text-[#a67c52]"
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-40 pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-8 py-12">
              <Link
                to="/"
                className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div>
                <button 
                  className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4 w-full text-left flex justify-between items-center"
                  onClick={toggleWomenDropdown}
                >
                  Shop Women
                  <ChevronDown size={16} className={`transition-transform ${showWomenDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showWomenDropdown && (
                  <div className="pl-4 mt-4 space-y-4">
                    <Link
                      to="/women/shirts"
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shirts & Blouses
                    </Link>
                    <Link
                      to="/women/dresses"
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dresses
                    </Link>
                    <Link
                      to="/women/jeans"
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Jeans & Trousers
                    </Link>
                    <Link
                      to="/women/accessories"
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Accessories
                    </Link>
                    <Link
                      to="/women/knitwear"
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Knitwear
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <button 
                  className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4 w-full text-left flex justify-between items-center"
                  onClick={toggleMenDropdown}
                >
                  Shop Men
                  <ChevronDown size={16} className={`transition-transform ${showMenDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showMenDropdown && (
                  <div className="pl-4 mt-4 space-y-4">
                    <Link
                      to="/men/shirts"
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shirts & T-shirts
                    </Link>
                    <Link
                      to="/men/jeans"
                      className="block text-lg tracking-wide pb-2 text-[#a67c52]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Trousers & Jeans
                    </Link>
                    <Link
                      to="/men/blazers"
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blazers
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/collections"
                className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Featured Collections
              </Link>
              <Link
                to="/favorites"
                className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Favourites
              </Link>
              <Link
                to="/about"
                className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="text-xl tracking-wide pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-serif font-light mb-2"
              >
                Men's Trousers & Jeans
              </motion.h1>
              <p className="text-[#595959] max-w-2xl">
                Discover our selection of premium trousers, jeans and pants for men that combine style, comfort and quality.
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex items-center space-x-4">
              <div className="relative">
                <select className="bg-transparent border border-[#d1c9c0] px-4 py-2 pr-8 appearance-none text-sm rounded-none focus:outline-none focus:border-[#a67c52]">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select className="bg-transparent border border-[#d1c9c0] px-4 py-2 pr-8 appearance-none text-sm rounded-none focus:outline-none focus:border-[#a67c52]">
                  <option>Filter by</option>
                  <option>Gray</option>
                  <option>Beige</option>
                  <option>Blue</option>
                  <option>Sale</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={index}
                variants={fadeInUpVariants}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={product.images[activeImageIndex[product.id] || 0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {product.isSale && (
                    <div className="absolute top-3 right-3 bg-[#a67c52] text-white text-xs font-medium px-2 py-1">
                      SALE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Image navigation buttons */}
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

                  {/* Image indicators */}
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
                  
                  <button
                    aria-label="Add to cart"
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 text-sm flex items-center border border-[#d1c9c0] shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    aria-label="Add to favorites"
                    className="absolute top-3 left-3 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <Heart size={16} />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-base font-medium mb-1">{product.name}</h3>
                  <p className="text-[#595959] text-sm mb-2">{product.color}</p>
                  <p className="text-sm">
                    {product.isSale ? (
                      <>
                        <span className="line-through text-[#8c8c8c] mr-2">
                          {formatIndianRupees(product.price)}
                        </span>
                        <span className="text-[#a67c52]">
                          {formatIndianRupees(product.salePrice || 0)}
                        </span>
                      </>
                    ) : (
                      <span>{formatIndianRupees(product.price)}</span>
                    )}
                  </p>
                </div>
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

export default MenJeans;

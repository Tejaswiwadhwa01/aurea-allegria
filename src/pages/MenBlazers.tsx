
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CartButton from "@/components/CartButton";
import { Heart, User, Menu, X, ShoppingBag, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const MenBlazers = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});

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

  const handlePrevImage = (productId: number) => {
    setCurrentImageIndexes((prev) => {
      const currentIndex = prev[productId] || 0;
      const product = products.find(p => p.id === productId);
      const imageCount = product?.images.length || 0;
      const newIndex = (currentIndex - 1 + imageCount) % imageCount;
      return { ...prev, [productId]: newIndex };
    });
  };

  const handleNextImage = (productId: number) => {
    setCurrentImageIndexes((prev) => {
      const currentIndex = prev[productId] || 0;
      const product = products.find(p => p.id === productId);
      const imageCount = product?.images.length || 0;
      const newIndex = (currentIndex + 1) % imageCount;
      return { ...prev, [productId]: newIndex };
    });
  };

  const products = [
    {
      id: 1,
      name: "Double Breasted Light Gray Blazer",
      price: 169.90,
      images: [
        "/lovable-uploads/bbc53d42-3a63-47de-8a47-9520599dc427.png",
        "/lovable-uploads/b81ed94e-4343-4344-a0e2-21098b6a1f0e.png"
      ],
      color: "Light Gray",
      isSale: false
    },
    {
      id: 2,
      name: "Structured Navy Blue Blazer",
      price: 149.90,
      images: [
        "/lovable-uploads/cff1d9dc-2cf7-4ea1-956c-10b4c4856ea6.png",
        "/lovable-uploads/3d84dc42-66e1-4ad1-b7f6-33028664e630.png"
      ],
      color: "Navy Blue",
      isSale: true,
      salePrice: 119.90
    },
    {
      id: 3,
      name: "Double Breasted Cream Blazer",
      price: 165.90,
      images: [
        "/lovable-uploads/5b0f1cde-f4b1-4242-92b6-a96dcc9a7ded.png",
        "/lovable-uploads/dc438382-e0f8-4c2a-9213-54ad25fa0ae8.png"
      ],
      color: "Cream",
      isSale: true,
      salePrice: 129.90
    },
    {
      id: 4,
      name: "Classic Black Blazer",
      price: 189.90,
      images: [
        "/lovable-uploads/a88f120a-0c01-4429-b1c6-71b8a850d6ef.png",
        "/lovable-uploads/b84e6bb1-207f-4ee2-b7a1-5091adc2306c.png"
      ],
      color: "Black",
      isSale: false
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
                    className="block px-4 py-2 text-sm hover:bg-[#f8f5f2] hover:text-[#a67c52] transition-colors text-[#a67c52]"
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
                      className="block text-lg tracking-wide pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Trousers & Jeans
                    </Link>
                    <Link
                      to="/men/blazers"
                      className="block text-lg tracking-wide pb-2 text-[#a67c52]"
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
                Men's Blazers
              </motion.h1>
              <p className="text-[#595959] max-w-2xl">
                Discover our collection of premium blazers that combine contemporary style with timeless craftsmanship.
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
                  <option>Black</option>
                  <option>Gray</option>
                  <option>Cream</option>
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
                    src={product.images[currentImageIndexes[product.id] || 0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {product.isSale && (
                    <div className="absolute top-3 right-3 bg-[#a67c52] text-white text-xs font-medium px-2 py-1">
                      SALE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <button
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage(product.id);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage(product.id);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  <button
                    aria-label="Add to cart"
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
                  
                  {/* Image navigation dots */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-1">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndexes((prev) => ({ ...prev, [product.id]: i }));
                        }}
                        className={`w-1.5 h-1.5 rounded-full ${
                          (currentImageIndexes[product.id] || 0) === i
                            ? "bg-white"
                            : "bg-white/50"
                        } transition-all opacity-0 group-hover:opacity-100`}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-base font-medium mb-1">{product.name}</h3>
                  <p className="text-[#595959] text-sm mb-2">{product.color}</p>
                  <p className="text-sm">
                    {product.isSale ? (
                      <>
                        <span className="line-through text-[#8c8c8c] mr-2">${product.price.toFixed(2)}</span>
                        <span className="text-[#a67c52]">${product.salePrice?.toFixed(2)}</span>
                      </>
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
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

export default MenBlazers;

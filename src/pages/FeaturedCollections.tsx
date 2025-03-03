
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CartButton from "@/components/CartButton";
import { Heart, User, Menu, X, ArrowRight, ChevronDown } from "lucide-react";

const FeaturedCollections = () => {
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

  const featuredCollections = [
    {
      id: 1,
      name: "Summer Essentials",
      description: "Light, breathable pieces for the warmer months.",
      image: "/lovable-uploads/906b2262-8296-4711-8758-97556020bde4.png",
      products: [
        {
          id: 101,
          name: "Linen Blend Shirt",
          price: "690",
          image: "/lovable-uploads/df24ed1b-8390-4c44-99d9-1bbd3dcebd04.png"
        },
        {
          id: 102,
          name: "Summer Dress",
          price: "890",
          image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
        },
        {
          id: 103,
          name: "Cotton Trousers",
          price: "790",
          image: "/lovable-uploads/cc63a636-1d5d-4a6f-9763-36409db04d47.png"
        },
        {
          id: 104,
          name: "Casual Blazer",
          price: "1,290",
          image: "/lovable-uploads/8e5069b4-1059-4a78-950e-dbe06d15a4ba.png"
        }
      ]
    },
    {
      id: 2,
      name: "Evening Elegance",
      description: "Sophisticated attire for special occasions.",
      image: "/lovable-uploads/0a1916ea-15f7-49fa-afc7-02fb3f034c72.png",
      products: [
        {
          id: 201,
          name: "Silk Evening Dress",
          price: "1,790",
          image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
        },
        {
          id: 202,
          name: "Formal Blazer",
          price: "1,890",
          image: "/lovable-uploads/8e5069b4-1059-4a78-950e-dbe06d15a4ba.png"
        },
        {
          id: 203,
          name: "Formal Shirt",
          price: "790",
          image: "/lovable-uploads/b5ccc93e-da1d-4845-a8b0-b663264741a0.png"
        },
        {
          id: 204,
          name: "Formal Accessories",
          price: "490",
          image: "/lovable-uploads/07870e4b-0f9d-4cd8-8421-39eff3d10467.png"
        }
      ]
    },
    {
      id: 3,
      name: "Autumn Essentials",
      description: "Warm and stylish pieces for the cooler seasons.",
      image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      products: [
        {
          id: 301,
          name: "Merino Wool Ensemble",
          price: "3,250",
          image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
        },
        {
          id: 302,
          name: "Wool Coat",
          price: "2,890",
          image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
        },
        {
          id: 303,
          name: "Cashmere Sweater",
          price: "1,490",
          image: "/lovable-uploads/8e14a9ae-8a47-45ce-8cb4-79abf01f95b1.png"
        },
        {
          id: 304,
          name: "Dark Denim Jeans",
          price: "890",
          image: "/lovable-uploads/8becde89-6115-4779-be29-c2b2d607b542.png"
        }
      ]
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
                className="text-sm tracking-wide hover:text-[#a67c52] flex items-center transition-colors duration-300"
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

      {/* Mobile Menu Overlay */}
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

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif font-light mb-12 text-center"
          >
            Featured Collections
          </motion.h1>

          {featuredCollections.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeInUpVariants}
              className="mb-24"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">{collection.name}</h2>
                  <p className="text-[#595959] mb-8 max-w-md">{collection.description}</p>
                  <p className="mb-10">
                    Our {collection.name.toLowerCase()} collection features premium materials and timeless designs
                    that embody the essence of AUREA. Each piece is meticulously crafted to provide
                    both style and comfort for the modern individual.
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-light mb-10 text-center">Collection Pieces</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {collection.products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeInUpVariants}
                    className="group"
                  >
                    <Link to="/product/1" className="block">
                      <div className="aspect-[3/4] overflow-hidden relative mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <h3 className="font-medium mb-2 transition-colors group-hover:text-[#a67c52]">{product.name}</h3>
                      <p className="text-[#595959]">${product.price}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
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

export default FeaturedCollections;

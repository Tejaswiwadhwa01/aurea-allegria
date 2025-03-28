import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ChevronDown, Menu, X, User, ChevronLeft, ChevronRight } from "lucide-react";
import CartButton from "@/components/CartButton";
import { Product, useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { formatIndianRupees } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";

const WomenAccessories = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [activeImageIndices, setActiveImageIndices] = useState<{[key: number]: number}>({
    1: 0,
    2: 0,
    3: 0, 
    4: 0
  });

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

  const toggleImage = (productId: number, direction: 'next' | 'prev') => {
    setActiveImageIndices(prev => {
      const currentIndex = prev[productId] || 0;
      const totalImages = 2;
      
      if (direction === 'next') {
        return { ...prev, [productId]: (currentIndex + 1) % totalImages };
      } else {
        return { ...prev, [productId]: (currentIndex - 1 + totalImages) % totalImages };
      }
    });
  };

  const setActiveImage = (productId: number, index: number) => {
    setActiveImageIndices(prev => ({ ...prev, [productId]: index }));
  };

  const handleFavoriteToggle = (product: any) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`,
        duration: 3000,
      });
    } else {
      addToFavorites(product);
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
        duration: 3000,
      });
    }
  };
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price) * 100 : product.price,
      image: product.images[0],
      color: product.color,
    });
  };

  const products = [
    {
      id: 1,
      name: "Gold Twist Earrings",
      price: "89.99",
      images: [
        "/lovable-uploads/3234d689-76ab-4d76-b95f-1acd5cf19117.png",
        "/lovable-uploads/3dea3ced-043b-46a1-8924-1cfe1e13e46c.png"
      ]
    },
    {
      id: 2,
      name: "Gold Charm Necklace",
      price: "119.99",
      images: [
        "/lovable-uploads/16bc6a5f-a89a-44ce-84bc-f4e03d84ec11.png",
        "/lovable-uploads/045abff5-adf5-40f2-8d61-32b6e52a035c.png"
      ]
    },
    {
      id: 3,
      name: "Gold Grid Cuff",
      price: "109.99",
      images: [
        "/lovable-uploads/e18b15c0-a336-4dbf-835e-f38ce624f83c.png",
        "/lovable-uploads/df8426b1-8451-47dd-8f57-16ab2f58587d.png"
      ]
    },
    {
      id: 4,
      name: "Pearl Ring Set",
      price: "159.99",
      images: [
        "/lovable-uploads/fb840484-134e-494e-adc7-539199b15d54.png",
        "/lovable-uploads/39a9c19f-0a4e-43a2-9acb-2ac924b6212b.png"
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
                className="text-sm tracking-wide text-[#a67c52] flex items-center transition-colors duration-300"
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

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-light">Women's Accessories</h1>
              <div className="flex items-center text-sm text-[#595959] mt-2">
                <Link to="/" className="hover:text-[#a67c52] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/women" className="hover:text-[#a67c52] transition-colors">Women</Link>
                <span className="mx-2">/</span>
                <span>Accessories</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] bg-[#e9e5e0] mb-4 overflow-hidden relative">
                  {product.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`${product.name} - View ${imageIndex + 1}`}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 absolute inset-0 
                        ${activeImageIndices[product.id] === imageIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}

                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <button
                    onClick={() => toggleImage(product.id, 'prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={() => toggleImage(product.id, 'next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {product.images.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => setActiveImage(product.id, dotIndex)}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeImageIndices[product.id] === dotIndex ? 'bg-[#a67c52]' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <button
                        className="flex items-center justify-center space-x-2 bg-[#262626] text-white py-3 px-5 text-sm hover:bg-[#333] transition-colors w-full"
                        aria-label="Add to cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag size={16} />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        onClick={() => handleFavoriteToggle(product)}
                        className={`ml-3 p-3 border transition-colors ${
                          isFavorite(product.id) 
                            ? "border-[#a67c52] bg-[#a67c52]/10" 
                            : "border-[#e2dcd5] hover:border-[#a67c52]"
                        }`}
                        aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart 
                          size={18} 
                          fill={isFavorite(product.id) ? "#a67c52" : "none"} 
                          color={isFavorite(product.id) ? "#a67c52" : "currentColor"} 
                        />
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

export default WomenAccessories;

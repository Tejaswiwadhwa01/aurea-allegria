
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import CartButton from "@/components/CartButton";

const Favorites = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { favorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();

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

  const handleRemoveFavorite = (id: number, name: string) => {
    removeFromFavorites(id);
    toast({
      title: "Removed from favorites",
      description: `${name} has been removed from your favorites.`,
      duration: 3000,
    });
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#262626]">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-sm tracking-wide hover:text-[#a67c52] transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/women"
              className="text-sm tracking-wide hover:text-[#a67c52] transition-colors duration-300"
            >
              Shop Women
            </Link>
            <Link
              to="/men"
              className="text-sm tracking-wide hover:text-[#a67c52] transition-colors duration-300"
            >
              Shop Men
            </Link>
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
              className="hidden md:flex transition-opacity hover:opacity-70 text-[#a67c52]"
              aria-label="Favorites"
            >
              <Heart size={20} fill="#a67c52" />
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-serif font-light mb-6">My Favorites</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4 flex justify-center">
              <Heart size={48} className="text-[#d1ccc4]" />
            </div>
            <h2 className="text-xl mb-2">Your favorites list is empty</h2>
            <p className="text-[#595959] mb-6">Browse our collections and add items you love to your favorites.</p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/women"
                className="px-6 py-3 border border-[#262626] hover:bg-[#262626] hover:text-white transition-colors"
              >
                Shop Women
              </Link>
              <Link 
                to="/men"
                className="px-6 py-3 border border-[#262626] hover:bg-[#262626] hover:text-white transition-colors"
              >
                Shop Men
              </Link>
            </div>
          </div>
        ) : (
          <motion.div 
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {favorites.map((product) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                className="group relative"
              >
                <div className="aspect-[3/4] bg-[#e9e5e0] mb-4 overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-[#a67c52] text-white px-3 py-1 text-xs">
                      NEW
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleRemoveFavorite(product.id, product.name)}
                      className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={16} className="text-[#262626]" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <button
                      className="flex items-center justify-center space-x-2 bg-[#262626] text-white py-3 px-5 text-sm hover:bg-[#333] transition-colors w-full"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag size={16} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
                
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-medium mb-1 transition-colors group-hover:text-[#a67c52]">{product.name}</h3>
                  <p className="text-[#595959] mb-1">${product.price}</p>
                  {product.color && product.material && (
                    <p className="text-[#595959] text-sm">{product.color} • {product.material}</p>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
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

export default Favorites;

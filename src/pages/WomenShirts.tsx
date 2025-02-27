
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Components
import CartButton from "@/components/CartButton";

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  color: string;
  material: string;
  isNew?: boolean;
}

const WomenShirts = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Sample products data with the uploaded images
  const products: Product[] = [
    {
      id: 1,
      name: "Linen Button-Down Shirt",
      price: "290",
      color: "Pink",
      material: "100% Linen",
      isNew: true,
      images: [
        "/lovable-uploads/df24ed1b-8390-4c44-99d9-1bbd3dcebd04.png",
        "/lovable-uploads/23dd5301-7add-4182-ac74-708dcf012e83.png"
      ]
    },
    {
      id: 2,
      name: "Classic Linen Shirt",
      price: "250",
      color: "White",
      material: "100% Linen",
      images: [
        "/lovable-uploads/0a1916ea-15f7-49fa-afc7-02fb3f034c72.png",
        "/lovable-uploads/d7960e60-f3fa-4df8-b94a-4669520bcf74.png"
      ]
    },
    {
      id: 3,
      name: "Eyelet Blouse",
      price: "320",
      color: "White",
      material: "100% Cotton",
      isNew: true,
      images: [
        "/lovable-uploads/906b2262-8296-4711-8758-97556020bde4.png",
        "/lovable-uploads/e94ec6f8-e672-4266-ae19-20af91eb2c50.png"
      ]
    },
    {
      id: 4,
      name: "Geometric Pattern Shirt",
      price: "390",
      color: "Beige",
      material: "Silk Blend",
      images: [
        "/lovable-uploads/5c45dc36-b825-4efa-93d9-110fa59edfac.png",
        "/lovable-uploads/9d3f0a8f-b946-4c7e-b72c-c7582ecf934e.png"
      ]
    }
  ];

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

  const toggleFilter = (filter: string) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
    }
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
              className="hidden md:flex transition-opacity hover:opacity-70"
              aria-label="Favorites"
            >
              <Heart size={20} />
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex text-sm text-[#595959]">
            <li className="flex items-center">
              <Link to="/" className="hover:text-[#a67c52] transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/women" className="hover:text-[#a67c52] transition-colors">
                Women
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-[#a67c52]">Shirts & Blouses</li>
          </ol>
        </nav>

        {/* Page Title and Back Button */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <Link to="/women" className="mr-4">
              <ArrowLeft size={20} className="text-[#595959] hover:text-[#262626] transition-colors" />
            </Link>
            <h1 className="text-3xl font-serif font-light">Shirts & Blouses</h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <button
              className={`p-2 ${viewType === 'grid' ? 'bg-[#e9e5e0]' : 'bg-transparent'}`}
              onClick={() => setViewType('grid')}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="6" height="6" stroke="#262626" strokeWidth="1.5" />
                <rect x="11" y="1" width="6" height="6" stroke="#262626" strokeWidth="1.5" />
                <rect x="1" y="11" width="6" height="6" stroke="#262626" strokeWidth="1.5" />
                <rect x="11" y="11" width="6" height="6" stroke="#262626" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              className={`p-2 ${viewType === 'list' ? 'bg-[#e9e5e0]' : 'bg-transparent'}`}
              onClick={() => setViewType('list')}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="16" height="4" stroke="#262626" strokeWidth="1.5" />
                <rect x="1" y="7" width="16" height="4" stroke="#262626" strokeWidth="1.5" />
                <rect x="1" y="13" width="16" height="4" stroke="#262626" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 mb-6">
              <h2 className="font-medium mb-4">Filters</h2>
              
              {/* Filter by Color */}
              <div className="mb-6 border-b border-[#e2dcd5] pb-6">
                <button 
                  className="flex justify-between items-center w-full text-left" 
                  onClick={() => toggleFilter('color')}
                >
                  <span className="font-medium">Color</span>
                  <ChevronDown size={16} className={`transition-transform ${selectedFilter === 'color' ? 'rotate-180' : ''}`} />
                </button>
                
                {selectedFilter === 'color' && (
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>White</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Pink</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Beige</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Blue</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Black</span>
                    </label>
                  </div>
                )}
              </div>
              
              {/* Filter by Material */}
              <div className="mb-6 border-b border-[#e2dcd5] pb-6">
                <button 
                  className="flex justify-between items-center w-full text-left" 
                  onClick={() => toggleFilter('material')}
                >
                  <span className="font-medium">Material</span>
                  <ChevronDown size={16} className={`transition-transform ${selectedFilter === 'material' ? 'rotate-180' : ''}`} />
                </button>
                
                {selectedFilter === 'material' && (
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Linen</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Cotton</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Silk</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>Cashmere</span>
                    </label>
                  </div>
                )}
              </div>
              
              {/* Filter by Price */}
              <div className="mb-6">
                <button 
                  className="flex justify-between items-center w-full text-left" 
                  onClick={() => toggleFilter('price')}
                >
                  <span className="font-medium">Price</span>
                  <ChevronDown size={16} className={`transition-transform ${selectedFilter === 'price' ? 'rotate-180' : ''}`} />
                </button>
                
                {selectedFilter === 'price' && (
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>$0 - $200</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>$200 - $300</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>$300 - $400</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#d1ccc4] text-[#a67c52] focus:ring-[#a67c52]" />
                      <span>$400+</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  variants={fadeInUpVariants}
                >
                  <div 
                    className="group relative overflow-hidden"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="aspect-[3/4] bg-[#e9e5e0] relative overflow-hidden">
                      <img
                        src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {product.isNew && (
                        <div className="absolute top-4 left-4 bg-[#a67c52] text-white px-3 py-1 text-xs">
                          NEW
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 backdrop-blur-sm transform transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                      <div className="flex justify-between items-center">
                        <button
                          className="flex items-center justify-center space-x-2 bg-[#262626] text-white py-3 px-5 text-sm hover:bg-[#333] transition-colors w-full"
                          aria-label="Add to cart"
                        >
                          <ShoppingBag size={16} />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          className="ml-3 p-3 border border-[#e2dcd5] hover:border-[#a67c52] transition-colors"
                          aria-label="Add to favorites"
                        >
                          <Heart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-1 transition-colors group-hover:text-[#a67c52]">{product.name}</h3>
                    <p className="text-[#595959] mb-1">${product.price}</p>
                    <p className="text-[#595959] text-sm">{product.color} • {product.material}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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

export default WomenShirts;

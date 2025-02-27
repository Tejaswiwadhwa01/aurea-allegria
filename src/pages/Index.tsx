
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, User, Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Components
import CartButton from "@/components/CartButton";
import FeaturedProduct from "@/components/FeaturedProduct";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    <div className="min-h-screen bg-[#f8f5f2] text-[#262626] overflow-x-hidden">
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
              <Link
                to="/women"
                className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop Women
              </Link>
              <Link
                to="/men"
                className="text-xl tracking-wide border-b border-[#e2dcd5] pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop Men
              </Link>
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

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute object-cover w-full h-full"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-model-walking-elegantly-1315-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,15vw,8rem)] font-serif font-light tracking-[0.3em] text-center mb-8"
          >
            AUREA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-lg md:text-xl font-light tracking-widest text-center max-w-xl mb-12"
          >
            TIMELESS ELEGANCE, REFINED LUXURY
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Link
              to="/collections"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-12 py-4 rounded-none hover:bg-white/20 transition-all duration-300 inline-flex items-center group"
            >
              <span className="mr-2 tracking-wider">EXPLORE COLLECTION</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 2, duration: 1 }}
            className="animate-bounce"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
            className="font-serif text-3xl md:text-4xl mb-6 font-light tracking-wider"
          >
            A New Definition of Luxury
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeInUpVariants}
            className="text-[#595959] leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            AUREA embodies the essence of refined elegance. Each piece in our collection is meticulously crafted with 
            the finest materials, blending timeless design with modern sensibility. Our commitment to exceptional 
            quality and attention to detail ensures that every AUREA creation becomes a treasured possession.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInUpVariants}
          >
            <Link
              to="/about"
              className="border-b border-[#262626] pb-1 text-sm tracking-wider inline-flex items-center group"
            >
              <span className="mr-2">DISCOVER OUR STORY</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-[#f3f0ec]">
        <div className="container mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
            className="font-serif text-3xl md:text-4xl mb-16 font-light tracking-wider text-center"
          >
            Featured Selections
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeaturedProduct
              image="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
              name="Cashmere Tailored Coat"
              price="2,890"
              index={0}
            />
            <FeaturedProduct
              image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              name="Silk Evening Dress"
              price="1,790"
              index={1}
            />
            <FeaturedProduct
              image="https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              name="Merino Wool Ensemble"
              price="3,250"
              index={2}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeInUpVariants}
            className="text-center mt-16"
          >
            <Link
              to="/collections"
              className="border border-[#262626] text-[#262626] px-12 py-4 rounded-none hover:bg-[#262626] hover:text-white transition-all duration-300 inline-flex items-center group tracking-wider text-sm"
            >
              <span className="mr-2">VIEW ALL COLLECTIONS</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeInUpVariants}
              className="text-center"
            >
              <h3 className="font-serif text-xl mb-4 tracking-wider">Artisanal Craftsmanship</h3>
              <p className="text-[#595959] leading-relaxed">
                Every AUREA piece is meticulously crafted by master artisans, preserving traditional techniques
                while embracing innovative approaches.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeInUpVariants}
              className="text-center"
            >
              <h3 className="font-serif text-xl mb-4 tracking-wider">Sustainable Luxury</h3>
              <p className="text-[#595959] leading-relaxed">
                We are committed to ethical sourcing and responsible production, ensuring our environmental
                footprint is as refined as our designs.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeInUpVariants}
              className="text-center"
            >
              <h3 className="font-serif text-xl mb-4 tracking-wider">Timeless Design</h3>
              <p className="text-[#595959] leading-relaxed">
                Our designs transcend fleeting trends, offering pieces that become more meaningful with time
                and can be treasured for generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

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

export default Index;

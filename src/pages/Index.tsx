import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

// Components
import FeaturedProduct from "@/components/FeaturedProduct";
import CartButton from "@/components/CartButton";

const FeaturedProducts = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Sample products
  const featuredProducts = [
    {
      id: 1,
      name: "Ribbed Turtleneck Sweater",
      price: 12900,
      image: "/lovable-uploads/8e5069b4-1059-4a78-950e-dbe06d15a4ba.png",
      images: [
        "/lovable-uploads/8e5069b4-1059-4a78-950e-dbe06d15a4ba.png",
        "/lovable-uploads/c0b4035f-dc32-442b-92e2-9910c7f7c2d6.png"
      ],
      color: "Red",
      material: "Wool Blend",
      isNew: true
    },
    {
      id: 2,
      name: "Button-Down Knit Dress",
      price: 19900,
      image: "/lovable-uploads/7770278b-f93f-4ee2-86c3-c29cfc5eaa47.png",
      images: [
        "/lovable-uploads/7770278b-f93f-4ee2-86c3-c29cfc5eaa47.png",
        "/lovable-uploads/d069ba80-f534-4c97-90fa-b97ddeb50fc3.png"
      ],
      color: "Blue",
      material: "Cotton Blend",
      isNew: true
    },
    {
      id: 3,
      name: "Linen Button-Down Shirt",
      price: 8900,
      image: "/lovable-uploads/df24ed1b-8390-4c44-99d9-1bbd3dcebd04.png",
      images: [
        "/lovable-uploads/df24ed1b-8390-4c44-99d9-1bbd3dcebd04.png",
        "/lovable-uploads/23dd5301-7add-4182-ac74-708dcf012e83.png"
      ],
      color: "Pink",
      material: "100% Linen"
    },
    {
      id: 4,
      name: "Wide-Leg Trousers",
      price: 14500,
      image: "/lovable-uploads/cc63a636-1d5d-4a6f-9763-36409db04d47.png",
      images: [
        "/lovable-uploads/cc63a636-1d5d-4a6f-9763-36409db04d47.png",
        "/lovable-uploads/cdeacf03-f2ca-400b-a7ea-98f8a9989acc.png"
      ],
      color: "Ivory",
      material: "Wool Blend",
      isNew: true
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeInUpVariants}
          className="text-3xl md:text-4xl font-serif font-light text-center mb-12"
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <FeaturedProduct
              key={product.id}
              index={index}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              images={product.images}
              color={product.color}
              material={product.material}
              isNew={product.isNew}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="bg-[#f8f5f2] text-[#262626]">
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
            <Link
              to="/about"
              className="text-sm tracking-wide hover:text-[#a67c52] transition-colors duration-300"
            >
              About Us
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

      {/* Hero Section */}
      <section className="relative h-screen-80 flex items-center justify-center overflow-hidden">
        <img
          src="/lovable-uploads/49a9954b-a965-458a-b293-052993986789.png"
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
            }}
            className="text-4xl md:text-6xl font-serif font-light text-white mb-4"
          >
            Timeless Elegance, Redefined
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.7 } },
            }}
            className="text-lg md:text-xl text-white opacity-80 mb-8"
          >
            Explore our curated collection of premium fashion.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.9 } },
            }}
          >
            <Link
              to="/women"
              className="inline-block bg-white text-[#262626] py-3 px-8 rounded-full text-lg font-medium hover:bg-[#e9e5e0] transition-colors duration-300"
            >
              Shop Women
            </Link>
            <Link
              to="/men"
              className="inline-block text-white py-3 px-8 rounded-full text-lg font-medium hover:text-[#e9e5e0] transition-colors duration-300 ml-4 border border-white"
            >
              Shop Men
            </Link>
          </motion.div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Testimonial Section */}
      <section className="py-20 bg-[#e9e5e0]">
        <div className="container mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
            className="text-3xl md:text-4xl font-serif font-light text-center mb-12"
          >
            What Our Customers Say
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeInUpVariants}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <p className="text-lg italic mb-4">
                "AUREA has completely transformed my wardrobe. The quality and style are unmatched. I feel confident and elegant in every piece."
              </p>
              <p className="text-sm font-medium">
                - Jane Smith, New York
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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

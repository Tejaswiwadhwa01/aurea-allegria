
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites, Product } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
  onImageHover?: (id: number) => void;
  hoveredProduct?: number | null;
}

const ProductCard = ({ product, index, onImageHover, hoveredProduct }: ProductCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();
  
  const handleFavoriteToggle = () => {
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
        onMouseEnter={() => onImageHover && onImageHover(product.id)}
        onMouseLeave={() => onImageHover && onImageHover(null)}
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
              className={`ml-3 p-3 border transition-colors ${
                isFavorite(product.id) 
                  ? "border-[#a67c52] bg-[#a67c52]/10" 
                  : "border-[#e2dcd5] hover:border-[#a67c52]"
              }`}
              aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
              onClick={handleFavoriteToggle}
            >
              <Heart size={18} fill={isFavorite(product.id) ? "#a67c52" : "none"} color={isFavorite(product.id) ? "#a67c52" : "currentColor"} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium mb-1 transition-colors group-hover:text-[#a67c52]">{product.name}</h3>
        <p className="text-[#595959] mb-1">${product.price}</p>
        {product.color && product.material && (
          <p className="text-[#595959] text-sm">{product.color} • {product.material}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

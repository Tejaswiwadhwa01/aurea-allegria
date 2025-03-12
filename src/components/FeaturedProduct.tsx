
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { formatIndianRupees } from "@/utils/formatCurrency";

interface FeaturedProductProps {
  image: string;
  name: string;
  price: number;
  index: number;
  id: number;
  images?: string[];
  color?: string;
  material?: string;
  isNew?: boolean;
}

const FeaturedProduct = ({ 
  image, 
  name, 
  price, 
  index,
  id,
  images = [],
  color,
  material,
  isNew
}: FeaturedProductProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();

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

  // Format price in Indian Rupees using the utility function
  const formattedPrice = formatIndianRupees(price);

  const handleFavoriteToggle = () => {
    const product = {
      id,
      name,
      price: price.toString(), // Convert number to string here
      images: images.length > 0 ? images : [image],
      color,
      material,
      isNew
    };

    if (isFavorite(id)) {
      removeFromFavorites(id);
      toast({
        title: "Removed from favorites",
        description: `${name} has been removed from your favorites.`,
        duration: 3000,
      });
    } else {
      addToFavorites(product);
      toast({
        title: "Added to favorites",
        description: `${name} has been added to your favorites.`,
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      variants={fadeInUpVariants}
      className="group"
    >
      <div
        className="relative overflow-hidden mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[3/4] bg-[#e9e5e0] relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-t-2 border-[#a67c52] rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? "scale-105" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 backdrop-blur-sm transform transition-transform duration-500 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
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
                isFavorite(id) 
                  ? "border-[#a67c52] bg-[#a67c52]/10" 
                  : "border-[#e2dcd5] hover:border-[#a67c52]"
              }`}
              aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
              onClick={handleFavoriteToggle}
            >
              <Heart size={18} fill={isFavorite(id) ? "#a67c52" : "none"} color={isFavorite(id) ? "#a67c52" : "currentColor"} />
            </button>
          </div>
        </div>
      </div>

      <Link to={`/product/${id}`} className="block">
        <h3 className="font-medium mb-2 transition-colors group-hover:text-[#a67c52]">{name}</h3>
        <p className="text-[#595959]">{formattedPrice}</p>
      </Link>
    </motion.div>
  );
};

export default FeaturedProduct;

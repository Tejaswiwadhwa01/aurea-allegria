
import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { formatIndianRupees } from "../utils/formatIndianRupees";
import { HeartIcon } from "lucide-react";

type FeaturedProductProps = {
  id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  link: string;
};

const FeaturedProduct = ({
  id,
  name,
  price,
  category,
  imageUrl,
  link,
}: FeaturedProductProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const product = {
      id,
      name,
      price,
      category,
      imageUrl,
    };
    
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="relative group">
      <Link to={link} className="block">
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-gray-700">{formatIndianRupees(price)}</p>
        </div>
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-opacity"
          aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon
            className={`h-5 w-5 ${
              isFavorite(id) ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </Link>
    </div>
  );
};

export default FeaturedProduct;

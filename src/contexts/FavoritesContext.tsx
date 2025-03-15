
import React, { createContext, useContext, useState, useEffect } from "react";

export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  images?: string[]; // Added for ProductCard compatibility
  isNew?: boolean;   // Added for ProductCard compatibility
  color?: string;    // Added for ProductCard compatibility
  material?: string; // Added for ProductCard compatibility
};

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => [...prev, product]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((product) => product.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((product) => product.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

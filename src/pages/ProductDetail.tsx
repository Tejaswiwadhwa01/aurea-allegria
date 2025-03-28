import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

// This would come from your API or product data
const products = [
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
    description: "This cozy turtleneck sweater features a ribbed texture and a relaxed fit, perfect for layering during colder months.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Black", "Cream"]
  },
  // ...other products
];

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === Number(productId));
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product?.color || "");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) {
    return <div className="py-20 text-center">Product not found</div>;
  }
  
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor
    }, quantity);
  };
  
  return (
    <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Link to="/women" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft size={16} />
          <span className="ml-1">Back to products</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`bg-white rounded-md overflow-hidden ${
                    currentImageIndex === idx ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif font-light mb-2">{product.name}</h1>
            <p className="text-2xl mb-6">{formatPrice(product.price)}</p>
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Color: {selectedColor}</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full ${
                        selectedColor === color 
                          ? 'ring-2 ring-offset-2 ring-gray-800' 
                          : ''
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: color.toLowerCase() === 'white' ? '1px solid #e5e5e5' : 'none'
                      }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 border rounded-md text-sm font-medium ${
                        selectedSize === size 
                          ? 'bg-gray-900 text-white border-gray-900' 
                          : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="flex-1 text-center">{quantity}</div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart & Wishlist */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </button>
              <button
                className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 
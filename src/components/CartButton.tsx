import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center transition-opacity hover:opacity-70"
        aria-label="Cart"
      >
        <ShoppingBag size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-xl z-50"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Your Cart</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-4 flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          {item.size && `Size: ${item.size}`}
                          {item.color && (item.size ? ` | Color: ${item.color}` : `Color: ${item.color}`)}
                        </p>
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-900">{item.price}</p>
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-medium">{ subtotal}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;

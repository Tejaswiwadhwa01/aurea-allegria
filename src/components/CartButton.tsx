
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const CartButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [itemCount] = useState(0);

  return (
    <button
      className="relative transition-opacity hover:opacity-70 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Shopping Cart"
    >
      <ShoppingBag size={20} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#a67c52] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white shadow-lg py-3 px-4 min-w-[200px] text-left"
          >
            {itemCount === 0 ? (
              <p className="text-sm text-[#595959]">Your cart is empty</p>
            ) : (
              <div>
                <div className="space-y-2">
                  {/* Cart items would go here */}
                </div>
                <div className="border-t border-[#e2dcd5] mt-3 pt-3 flex justify-between">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-sm">$0.00</span>
                </div>
                <button className="mt-3 w-full bg-[#262626] text-white py-2 text-sm hover:bg-[#333] transition-colors">
                  View Cart
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CartButton;

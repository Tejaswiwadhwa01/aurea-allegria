import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ChevronLeft, CreditCard } from 'lucide-react';
import { formatIndianRupees } from '@/utils/formatCurrency';

const Checkout: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const formatPrice = (price: number) => {
    return formatIndianRupees(price);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare the items with valid IDs
      const orderItems = cartItems.map(item => ({
        id: Number(item.id) || 0, // Ensure ID is a number
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image
      }));
      
      // Send order to backend
      const response = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: orderItems,
          total: subtotal,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip
          }
        })
      });
      
      if (response.ok) {
        // Clear the cart
        clearCart();
        
        const data = await response.json();
        // Navigate to order confirmation
        navigate(`/order-confirmation/${data.order.orderId}`);
      } else {
        alert('There was an error processing your order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some items to your cart before checkout</p>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft size={16} />
          <span className="ml-1">Back</span>
        </button>
        
        <h1 className="text-3xl font-serif font-light mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-medium mb-6">Payment Information</h2>
              
              <div className="mb-6">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  id="cardName"
                  name="cardName"
                  type="text"
                  required
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    required
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <CreditCard size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    id="expDate"
                    name="expDate"
                    type="text"
                    placeholder="MM/YY"
                    required
                    value={formData.expDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    required
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-md text-white font-medium ${
                  isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } transition-colors`}
              >
                {isLoading ? 'Processing...' : `Place Order • ${formatIndianRupees(subtotal)}`}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {item.size && `Size: ${item.size}`}
                        {item.color && (item.size ? ` | Color: ${item.color}` : `Color: ${item.color}`)}
                      </p>
                      <div className="mt-1 flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">{formatIndianRupees(item.price)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">{formatIndianRupees(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium">{formatIndianRupees(499)}</span> {/* ₹499 shipping */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">GST (18%)</span>
                  <span className="text-sm font-medium">{formatIndianRupees(subtotal * 0.18)}</span> {/* 18% GST */}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">
                    {formatIndianRupees(subtotal + 499 + (subtotal * 0.18))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
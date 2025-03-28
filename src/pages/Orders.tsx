import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Package, AlertCircle } from 'lucide-react';
import { formatIndianRupees } from "@/utils/formatCurrency";

type OrderItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
};

type Order = {
  id: string;
  orderId: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to view orders');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch('http://localhost:3000/profile/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  const formatPrice = (price: number) => {
    return formatIndianRupees(price);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft size={16} />
            <span className="ml-1">Back to Home</span>
          </Link>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <h1 className="text-2xl font-medium text-gray-900 mb-2">Something went wrong</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link
                to="/"
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft size={16} />
            <span className="ml-1">Back to Home</span>
          </Link>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <Package size={48} className="text-gray-400 mb-4" />
              <h1 className="text-2xl font-medium text-gray-900 mb-2">No orders yet</h1>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Link
                to="/women"
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft size={16} />
          <span className="ml-1">Back to Home</span>
        </Link>
        
        <h1 className="text-3xl font-serif font-light mb-8">Your Orders</h1>
        
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-medium">Order #{order.orderId}</h2>
                    <p className="text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-sm font-medium">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 divide-y divide-gray-100">
                {order.items.map(item => (
                  <div key={`${order.id}-${item.productId}`} className="py-4 flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
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
                        <p className="text-sm font-medium text-gray-900">{formatPrice(item.price)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
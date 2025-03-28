import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  return (
    <div className="min-h-screen bg-[#f8f5f2] pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
            We've sent a confirmation email with your order details.
          </p>
          
          <div className="bg-gray-50 rounded-md p-4 mb-6">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-lg font-medium">{orderId}</p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Link
              to="/orders"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
            >
              View My Orders
            </Link>
            <Link
              to="/"
              className="text-indigo-600 py-2 px-6 hover:text-indigo-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
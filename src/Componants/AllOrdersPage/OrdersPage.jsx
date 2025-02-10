import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { userToken } = useContext(authContext); // Use user object

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('tkn');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          'https://ecommerce.routemisr.com/api/v1/orders/',
          {
            headers: {
              token: userToken,
            },
          }
        );

        if (response.data.status === 'success') {
          setOrders(response.data.data || []);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">All Orders</h1>
      
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div 
              key={order._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order ID: 
                  <span className="text-sm block mt-1 text-gray-600">
                    {order._id}
                  </span>
                </h3>
              </div>

              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Total:</span> $
                  {order.totalPrice?.toFixed(2)}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> 
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>

                <p className={`text-sm ${
                  order.status === 'completed' 
                    ? 'text-green-500' 
                    : 'text-yellow-500'
                }`}>
                  {order.status?.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-600">
            No orders found
          </h2>
        </div>
      )}
    </div>
  );
}
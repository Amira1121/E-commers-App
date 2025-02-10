import React from "react";
import { useOrders } from "../../context/OrdersContext";

export default function OrdersPage() {
  const { orders, isLoading, error } = useOrders();
  
  console.log("Orders in OrdersPage:", orders);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-bold mb-2">Order ID: {order._id}</h3>
              <p>
                <strong>Total Price:</strong> ${order.totalPrice}
              </p>
              <p>
                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">You have no orders yet</h2>
        </div>
      )}
    </div>
  );
}

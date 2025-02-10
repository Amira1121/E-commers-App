import axios from "axios";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authContext } from "./AuthContext";
import toast from "react-hot-toast";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const { userToken } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0); // <-- إضافة حالة جديدة للإجمالي
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/orders/"
        
      );

      if (response.data.status === "success") {
        setOrders(response.data.data.orders ); // استخراج مصفوفة الطلبات
        setTotalOrders(response.data.data.totalOrders ); // استخراج الإجمالي
      }else {
        setOrders([]);
        setTotalOrders(0); // <-- إعادة تعيين الإجمالي
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "خطأ في جلب الطلبات";
        console.error("تفاصيل الخطأ:", error.response?.data); // تسجيل تفاصيل إضافية
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchOrders();
    } else {
      setOrders([]);
      setTotalOrders(0); // <-- إعادة تعيين الإجمالي عند تسجيل الخروج
    }
  }, [userToken]);

  return (
    <OrdersContext.Provider 
      value={{ 
        orders, 
        totalOrders, // <-- إضافة الإجمالي للقيم المقدمة
        isLoading, 
        fetchOrders, 
        error 
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
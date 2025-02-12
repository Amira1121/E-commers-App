import axios from "axios";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authContext } from "./AuthContext";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { userToken } = useContext(authContext);
  const token = userToken || localStorage.getItem("tkn");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loadingIds, setLoadingIds] = useState(new Set());

  const fetchWishlist = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } }
      );

      if (response.data.status === "success") {
        const items = response.data.data.map(item => item._id);
        setWishlistItems(items);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchWishlist();
    else setWishlistItems([]);
  }, [token, fetchWishlist]);

  const addToWishlist = useCallback(async (productId) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setLoadingIds(prev => new Set(prev).add(productId));
    
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );

      if (response.data.status === "success") {
        setWishlistItems(prev => [...prev, productId]);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  }, [token]);

  const removeFromWishlist = useCallback(async (productId) => {
    setLoadingIds(prev => new Set(prev).add(productId));
    
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );

      setWishlistItems(prev => prev.filter(id => id !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  }, [token]);

  const isInWishlist = useCallback(
    (productId) => wishlistItems.includes(productId),
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      loadingIds
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
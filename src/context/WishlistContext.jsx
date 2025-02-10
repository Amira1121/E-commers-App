import axios from "axios";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authContext } from "./AuthContext";
import toast from "react-hot-toast";

const WishlistContext = createContext();


export function WishlistProvider({ children }) {
    const { userToken } = useContext(authContext) || localStorage.getItem("tkn");
    const [wishlistItems, setWishlistItems] = useState([]);


    const addToWishlist = useCallback(async (productId) => {
        try {
          // منع التكرار
          if (wishlistItems.some((item) => item._id === productId)) {
            toast.info("Item is already in the wishlist");
            return;
          }
      
          const response = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            { productId },
            { headers: { token: userToken || localStorage.getItem("tkn") } }
          );
      
          console.log("API Response:", response.data);

          
      
          if (response.data.status === "success") {
            const productDetails = response.data.data.product;
            if (productDetails && productDetails._id) {
              setWishlistItems((prev) => [...prev, productDetails]); // استخدام prev لضمان المزامنة
              toast.success("Added to wishlist");
              console.log("Updated Wishlist (after add):", [...wishlistItems, productDetails]);
            }
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
          console.error("Error Adding to Wishlist:", error);
        }
      }, [wishlistItems, userToken]);
      
  
  
  console.log("Updated Wishlist:", wishlistItems);



  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { headers: { token: userToken || localStorage.getItem("tkn") } }
        );
  
        console.log("Fetched Wishlist:", response.data);
  
        if (response.data.status === "success") {
          setWishlistItems(response.data.data || []); // تأكد من أن القائمة ليست undefined
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setWishlistItems([]); // تأكد من تعيينه إلى قائمة فارغة
      }
    }
  
    if (userToken) {
      fetchWishlist();
    } else {
      setWishlistItems([]); // تعيين قائمة فارغة في حال عدم وجود توكن
    }
  }, [userToken]);
  



  const removeFromWishlist = useCallback(async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token: userToken || localStorage.getItem("tkn") } }
      );
  
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId)); // استخدام prev لضمان المزامنة
      toast.success("تم الحذف من المفضلة");
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ");
      console.error("Error Removing from Wishlist:", error);
    }
  }, [userToken]);
  
  const isInWishlist = useCallback(
    (productId) => Array.isArray(wishlistItems) && wishlistItems.some((item) => item._id === productId),
    [wishlistItems]
  );
  
  
  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}


// التصدير الأساسي المطلوب
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
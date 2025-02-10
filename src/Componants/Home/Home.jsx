import { useContext } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

// add the wishlist
import { useWishlist } from '../../context/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import '../Home/Home.css';

export default function Home() {
  const { addProductToCart } = useContext(cartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { data, isLoading } = useQuery({
    queryKey: ['productDetails'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products'),
  });

  async function handleAddProduct(id) {
    const res = await addProductToCart(id);
    if(res) {
      toast.success("Product Added Successfully", {
        position: "bottom-center",
        style: { background: '#4CAF50', color: '#fff' }
      });
    } else {
      toast.error("Failed to Add Product", {
        position: "bottom-center",
        style: { background: '#F44336', color: '#fff' }
      });
    }
  }

  const allProducts = data?.data.data;

  if (isLoading) return <LoaderScreen />;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-5"
    >
      {/* Hero Section */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8 mb-12"
      >
        <HomeSlider />
        <CategoriesSlider />
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {allProducts?.map((product, index) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <Link 
              to={`/productDetails/${product._id}`}
              className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >

<motion.button
  onClick={(e) => {
    e.preventDefault();
    isInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product._id); // استدعاء الدالة المعدلة
  }}
  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg z-10"
>
  <FontAwesomeIcon
    icon={isInWishlist(product._id) ? solidHeart : regularHeart}
    className={`text-xl ${
      isInWishlist(product._id) ? "text-red-500" : "text-gray-600"
    }`}
  />
</motion.button>



              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Sale Badge */}
                {product.priceAfterDiscount && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    SALE
                  </motion.div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {product.title.split(' ', 2).join(' ')}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`fa-solid fa-star ${i < product.ratingsAverage ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.ratingsQuantity})</span>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center">
                  <div>
                    {product.priceAfterDiscount ? (
                      <>
                        <span className="text-xl font-bold text-green-600">
                          ${product.priceAfterDiscount}
                        </span>
                        <span className="text-sm text-red-500 line-through ml-2">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-800">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddProduct(product._id);
                    }}
                    className="bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fa-solid fa-cart-plus text-lg"></i>
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    
  );
}
import axios from "axios"
import { useContext } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from '../../context/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { motion } from "framer-motion";


import '../Prouducts/Prouducts.css'

export default function Products() {
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

  return (
    <div className="container mx-auto p-5 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allProducts?.map((product, index) => (
          <Link 
            to={`/productDetails/${product._id}`}
            key={product._id}
            className="product-card animate-pop-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >

            {/* part of wishlist */}
            <motion.button
  onClick={(e) => {
    e.preventDefault();
    isInWishlist(product._id)
      ? removeFromWishlist(product._id) // remove function
      : addToWishlist(product._id); // add function
  }}
  className="absolute bottom-5 right-2 bg-white p-2 rounded-full shadow-lg z-10"
>
  <FontAwesomeIcon    // change color heart by if te
    icon={isInWishlist(product._id) ? solidHeart : regularHeart}
    className={`text-xl ${
      isInWishlist(product._id) ? "text-red-500" : "text-gray-600"
    }`}
  />
</motion.button>


            <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Product Image */}
              <div className="image-container h-64 overflow-hidden">
                <img 
                  src={product.imageCover} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>

              {/* Product Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                {product.priceAfterDiscount && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    SALE
                  </span>
                )}
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.category.name}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddProduct(product._id);
                }}
                className="absolute top-2 right-2 bg-blue-900 text-white p-3 rounded-full shadow-lg
                         opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0
                         transition-all duration-300 hover:bg-green-700"
              >
                <i className="fa-solid fa-cart-plus text-lg"></i>
              </button>

              {/* Product Info */}
              <div className="p-4 bg-white/90 backdrop-blur-sm">
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

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.priceAfterDiscount ? (
                      <>
                        <span className="text-xl font-bold text-green-600">
                          ${product.priceAfterDiscount}
                        </span>
                        <span className="text-sm text-red-500 line-through">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-800">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
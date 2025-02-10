import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
console.log(wishlistItems)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-5"
    >
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <AnimatePresence>
        {wishlistItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {wishlistItems.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-xl shadow-lg p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Link to={`/productDetails/${product._id}`} className="block">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-bold mt-4 truncate">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                  <span className="text-xl font-bold">${product.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
              Browse Products →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

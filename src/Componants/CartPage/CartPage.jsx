// CartPage.jsx
import { useContext, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 50 }
};

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function CartPage() {
  const { 
    numOfCartItems, 
    totalCartPrice, 
    products, 
    updateCount, 
    removeElement, 
    clearCart 
  } = useContext(cartContext);

  const [loadingId, setLoadingId] = useState(null);

  const handleChangeCount = async (id, newCount) => {
    setLoadingId(id);
    await updateCount(id, newCount);
    setLoadingId(null);
  };

  const handleRemoveElement = async (id) => {
    setLoadingId(id);
    const isSuccess = await removeElement(id);
    setLoadingId(null);
    if(isSuccess) toast.success("Item removed");
  };

  const handleClearCart = async () => {
    setLoadingId('clear');
    const isSuccess = await clearCart();
    setLoadingId(null);
    if(isSuccess) toast.success("Cart cleared");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-5"
    >
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({numOfCartItems})</h1>
      
      <AnimatePresence mode='wait'>
        {products?.length ? (
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-x-auto shadow-lg rounded-lg"
          >
            <table className="w-full text-sm text-left text-gray-500">
              {/* Table Head */}
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                <AnimatePresence>
                  {products.map(product => (
                    <motion.tr
                      key={product._id}
                      variants={itemVariants}
                      className="bg-white border-b hover:bg-gray-50"
                      exit="exit"
                    >
                      {/* Product Image & Title */}
                      <td className="px-6 py-4 flex items-center">
                        <motion.img
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          src={product.product.imageCover}
                          className="w-20 h-20 object-cover rounded-lg"
                          alt={product.product.title}
                        />
                        <span className="ml-4 font-medium text-gray-900">
                          {product.product.title.split(' ', 2).join(' ')}
                        </span>
                      </td>

                      {/* Quantity Controls */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleChangeCount(product.product._id, product.count - 1)}
                            disabled={product.count <= 1 || loadingId === product._id}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            -
                          </motion.button>
                          
                          {loadingId === product._id ? (
                            <BeatLoader size={8} color="#6b7280" />
                          ) : (
                            <span className="w-8 text-center">{product.count}</span>
                          )}

                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleChangeCount(product.product._id, product.count + 1)}
                            disabled={loadingId === product._id}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            +
                          </motion.button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-medium">${product.price}</td>

                      {/* Remove Button */}
                      <td className="px-6 py-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemoveElement(product.product._id)}
                          disabled={loadingId === product._id}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          {loadingId === product._id ? (
                            <BeatLoader size={8} color="#dc2626" />
                          ) : (
                            'Remove'
                          )}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>

              {/* Table Footer */}
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 font-bold">Total:</td>
                  <td className="px-6 py-4 font-bold text-red-600">${totalCartPrice}</td>
                </tr>
              </tfoot>
            </table>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 p-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                disabled={loadingId === 'clear'}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                {loadingId === 'clear' ? (
                  <BeatLoader size={8} color="#4b5563" />
                ) : (
                  'Clear Cart'
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Link to="/payment">Checkout Now</Link>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link 
              to="/products" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Continue Shopping →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
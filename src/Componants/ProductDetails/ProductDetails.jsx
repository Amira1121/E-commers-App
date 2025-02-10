import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import Page404 from '../NotFound/Page404';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { StarRating } from '../StarRating/StarRating';
import '../ProductDetails/ProductDetalis.css'

export default function ProductDetails() {
    const { id } = useParams();
    const { addProductToCart } = useContext(cartContext);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    });

    const product = data?.data.data;

    async function handleAddToCart() {
        const res = await addProductToCart(id);
        if (res) {
            toast.success('Product added to cart!', {
                position: 'top-center',
                icon: '🛒',
                style: {
                    background: '#4CAF50',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
            });
        } else {
            toast.error('Failed to add product', {
                position: 'top-center',
                style: {
                    background: '#F44336',
                    color: '#fff'
                }
            });
        }
    }

    if (isLoading) return <LoaderScreen />;
    if (isError) return <Page404 />;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { type: 'spring', stiffness: 120 }
        }
    };

    const detailsVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { type: 'spring', stiffness: 120 }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-gray-800"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Product Image */}
                    <motion.div
                        variants={imageVariants}
                        className="relative group overflow-hidden rounded-xl"
                    >
                        <motion.img
                            src={product.imageCover}
                            alt={product.title}
                            className="w-full h-96 object-contain p-6"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        {product.priceAfterDiscount && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                            >
                                {Math.round(
                                    ((product.price - product.priceAfterDiscount) / product.price) * 100
                                )}% OFF
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        variants={detailsVariants}
                        className="space-y-6"
                    >
                        <motion.h1
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="text-4xl font-bold text-gray-800 dark:text-white"
                        >
                            {product.title}
                        </motion.h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center space-x-4">
                        <StarRating rating={product.ratingsAverage} />   
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                ({product.ratingsQuantity} reviews)
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            {product.priceAfterDiscount ? (
                                <>
                                    <span className="text-3xl font-bold text-green-600">
                                        ${product.priceAfterDiscount}
                                    </span>
                                    <span className="text-xl line-through text-red-500">
                                        ${product.price}
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                    ${product.price}
                                </span>
                            )}
                        </div>

                        <motion.button
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-cart-plus" />
                            Add to Cart
                        </motion.button>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center space-x-2">
                                <i className="fa-solid fa-tag text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-300">
                                    Category: {product.category.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i className="fa-solid fa-box text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-300">
                                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
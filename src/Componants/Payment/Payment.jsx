import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { cartContext } from '../../context/CartContext';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Spinner } from '@material-tailwind/react';
import * as Yup from 'yup';

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Validation schema
const validationSchema = Yup.object({
  details: Yup.string().required('Detailed address is required'),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number format')
    .required('Phone number is required'),
  city: Yup.string().required('City is required'),
});

export default function Payment() {
  const { cartId, resetValues } = useContext(cartContext);
  const [isCash, setIsCash] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formikObj = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (isCash) {
          await CreateCashOrder(values);
        } else {
          await CreateCheckout(values);
        }
      } catch (error) {
        toast.error('Payment processing failed', { position: 'top-center' });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const CreateCashOrder = async (values) => {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem('tkn') },
        }
      );

      if (data.status === 'success') {
        toast.success('Order created successfully', { position: 'top-center' });
        resetValues();
      }
    } catch (error) {
      toast.error('Failed to create order', { position: 'top-center' });
    }
  };

  const CreateCheckout = async (values) => {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem('tkn') },
          params: { url: 'http://localhost:5173' },
        }
      );

      window.open(data.session.url, '_self');
    } catch (error) {
      toast.error('Failed to create payment session', { position: 'top-center' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 min-h-screen"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-gray-800"
      >
        Complete Your Purchase
      </motion.h1>

      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        onSubmit={formikObj.handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label htmlFor="details" className="block mb-2 text-gray-700">
            Shipping Address
          </label>
          <input
            id="details"
            type="text"
            {...formikObj.getFieldProps('details')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {formikObj.touched.details && formikObj.errors.details && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {formikObj.errors.details}
            </motion.div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block mb-2 text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...formikObj.getFieldProps('phone')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {formikObj.touched.phone && formikObj.errors.phone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {formikObj.errors.phone}
            </motion.div>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="city" className="block mb-2 text-gray-700">
            City
          </label>
          <input
            id="city"
            type="text"
            {...formikObj.getFieldProps('city')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {formikObj.touched.city && formikObj.errors.city && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {formikObj.errors.city}
            </motion.div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            onClick={() => setIsCash(true)}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2"
          >
            {isSubmitting && isCash && <Spinner className="h-4 w-4" />}
            Cash Payment
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            onClick={() => setIsCash(false)}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded flex items-center gap-2"
          >
            {isSubmitting && !isCash && <Spinner className="h-4 w-4" />}
            Online Payment
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
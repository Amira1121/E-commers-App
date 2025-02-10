import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

function ForgetPassword() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  });


// call api by hook userFormik,,,,,,,
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
          { email: values.email }
        );
        navigate('/resetcode');
      } catch (error) {
        setErrMsg(error.response?.data?.message || 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-4"
          variants={itemVariants}
        >
          <div className="inline-block p-4 bg-green-100 rounded-full">
            <EnvelopeIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Forgot Password?</h1>
          <p className="text-gray-500">
            Enter your email and we'll send you a verification code
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.form 
          className="space-y-6"
          onSubmit={formik.handleSubmit}
          variants={containerVariants}
        >
          {/* Email Input */}
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.errors.email && formik.touched.email 
                    ? 'border-red-500' 
                    : 'border-gray-300 focus:border-green-500'
                } focus:ring-2 focus:ring-green-200 transition-all`}
                placeholder="name@example.com"
              />
              {formik.errors.email && formik.touched.email && (
                <motion.p 
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formik.errors.email}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-all ${
                isSubmitting 
                  ? 'bg-green-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? (
                <motion.span
                  className="flex items-center justify-center gap-2"
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  Sending...
                </motion.span>
              ) : (
                'Send Code'
              )}
            </button>
          </motion.div>

          {/* Error Message */}
          {errMsg && (
            <motion.div
              className="p-3 bg-red-50 text-red-700 rounded-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              {errMsg}
            </motion.div>
          )}

          {/* Back to Login */}
          <motion.p 
            className="text-center text-gray-600"
            variants={itemVariants}
          >
            Remember your password?{' '}
            <Link 
              to="/login"
              className="text-green-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </motion.p>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default ForgetPassword;
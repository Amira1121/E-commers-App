import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/outline';

function ResetNewPassword() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Animation variants
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
      .required('Email is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Z])/,
        'Must contain at least one uppercase letter'
      )
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await axios.put(
          'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
          values
        );
        navigate('/login');
      } catch (err) {
        setErrMsg(err.response?.data?.message || 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4"
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
            <LockClosedIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-500">Enter your email and new password</p>
        </motion.div>

        {/* Form Section */}
        <motion.form 
          className="space-y-6"
          onSubmit={formik.handleSubmit}
          variants={containerVariants}
        >
          {/* Email Input */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
            {formik.touched.email && formik.errors.email && (
              <motion.p 
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formik.errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Password Input */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className={`w-full px-4 py-3 rounded-lg border ${
                formik.errors.newPassword && formik.touched.newPassword 
                  ? 'border-red-500' 
                  : 'border-gray-300 focus:border-green-500'
              } focus:ring-2 focus:ring-green-200 transition-all`}
              placeholder="••••••••"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <motion.p 
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formik.errors.newPassword}
              </motion.p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Must be at least 8 characters with one uppercase letter
            </p>
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
                  Resetting...
                </motion.span>
              ) : (
                'Reset Password'
              )}
            </button>
          </motion.div>

          {/* Error Message */}
          {errMsg && (
            <motion.div
              className="p-3 bg-red-50 text-red-700 rounded-lg text-center"
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
              to="/signin"
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

export default ResetNewPassword;
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import ReactCodeInput from 'react-code-input';

function ResetCode() {
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




  const formik = useFormik({
    initialValues: { code: '' },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
          { resetCode: values.code }
        );
        navigate('/resetpassword');
      } catch (error) {
        setErrMsg(error.response?.data?.message || 'An error occurred');
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
          <h1 className="text-3xl font-bold text-gray-800">Verification Code</h1>
          <p className="text-gray-500">
            We've sent a 6-digit code to your email
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.form 
          className="space-y-6"
          onSubmit={formik.handleSubmit}
          variants={containerVariants}
        >
          {/* Code Input */}
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <div className="flex justify-center">
              <ReactCodeInput
                name="code"
                type="number"
                fields={6}
                onChange={(value) => formik.setFieldValue('code', value)}
                inputStyle={{
                  width: '3rem',
                  height: '3rem',
                  margin: '0 0.3rem',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  border: '2px solid #4CAF50',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc'
                }}
                inputStyleInvalid={{
                  borderColor: '#ef4444',
                  boxShadow: '0 0 4px #fee2e2'
                }}
              />
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
                  Verifying...
                </motion.span>
              ) : (
                'Verify Code'
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
            Didn't receive code?{' '}
            <Link 
              to="/forgetpassword"
              className="text-green-600 hover:underline font-medium"
            >
              Resend
            </Link>
          </motion.p>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default ResetCode;
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Watch } from "react-loader-spinner";
import  '../Register/Register.css'

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function registerUser(values) {
    setIsSubmitting(true);
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      setIsSuccessMessage(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Registration failed');
      setTimeout(() => setErrorMessage(null), 2000);
    } finally {
      setIsSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: registerUser,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password cannot exceed 12 characters')
        .required('Required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Success Message */}
        {isSuccessMessage && (
          <div className="p-4 text-green-700 bg-green-100 rounded-lg animate-slide-down">
            🎉 Registration successful! Redirecting to login...
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="p-4 text-red-700 bg-red-100 rounded-lg animate-shake">
            ⚠️ {errorMessage}
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 transition-all hover:shadow-3xl">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
            Create Your Account
            <span className="block mt-2 text-lg font-medium text-green-600">
              Join our frech cart today!
            </span>
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative group">
              <input
                {...formik.getFieldProps('name')}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                  formik.errors.name && formik.touched.name
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-green-500'
                }`}
                placeholder="Full Name"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative group">
              <input
                {...formik.getFieldProps('email')}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                  formik.errors.email && formik.touched.email
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-green-500'
                }`}
                placeholder="Email Address"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div className="relative group">
              <input
                {...formik.getFieldProps('phone')}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                  formik.errors.phone && formik.touched.phone
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-green-500'
                }`}
                placeholder="Phone Number"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                {...formik.getFieldProps('password')}
                type="password"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                  formik.errors.password && formik.touched.password
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-green-500'
                }`}
                placeholder="Password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative group">
              <input
                {...formik.getFieldProps('rePassword')}
                type="password"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                  formik.errors.rePassword && formik.touched.rePassword
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-green-500'
                }`}
                placeholder="Confirm Password"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {formik.errors.rePassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold 
                transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Watch height="24" width="24" color="#fff" />
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-800 font-medium transition-colors"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
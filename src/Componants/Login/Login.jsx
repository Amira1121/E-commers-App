import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Watch } from "react-loader-spinner";
import { authContext } from "../../context/AuthContext";
import '../Login/Login.css'

export default function LogIn() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loginUser(values) {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        values
      );
      
      localStorage.setItem('tkn', data.token);
      setUserToken(data.token);
      setIsSuccessMessage(true);
      
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'An error occurred');
      setTimeout(() => setErrorMessage(null), 2000);
    } finally {
      setIsSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: loginUser,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6).max(12).required('Required'),
    }),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        {/* Success Message */}
        {isSuccessMessage && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg transition-all duration-500 animate-slide-down">
            Welcome back! Enjoy your shopping experience 🎉
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg transition-all duration-500 animate-shake">
            {errorMessage}
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 transform transition-all hover:shadow-2xl">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Welcome Back!
            <span className="block mt-2 text-lg font-medium text-green-600">
              Please sign in to continue
            </span>
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <input
                {...formik.getFieldProps('email')}
                type="email"
                className={`w-full px-3 py-3 border-b-2 focus:outline-none transition-colors peer ${
                  formik.errors.email && formik.touched.email
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-green-500'
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute left-3 top-3 text-gray-500 transition-all transform pointer-events-none 
                  peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-green-600
                  ${formik.values.email ? '-translate-y-6 text-sm' : ''}`}
              >
                Email Address
              </label>
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                {...formik.getFieldProps('password')}
                type="password"
                className={`w-full px-3 py-3 border-b-2 focus:outline-none transition-colors peer ${
                  formik.errors.password && formik.touched.password
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-green-500'
                }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute left-3 top-3 text-gray-500 transition-all transform pointer-events-none 
                  peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-green-600
                  ${formik.values.password ? '-translate-y-6 text-sm' : ''}`}
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgetpassword"
                className="text-sm text-green-600 hover:text-green-800 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium 
                transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Watch
                    height="24"
                    width="24"
                    radius="48"
                    color="#fff"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Signup Link */}
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-800 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
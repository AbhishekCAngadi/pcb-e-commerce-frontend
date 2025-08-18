import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '../lib/api';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Show success message briefly
      setError('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.status === 400) {
        if (err.response.data?.username) {
          setError('Username already exists. Please choose a different one.');
        } else if (err.response.data?.email) {
          setError('Email already registered. Please use a different email.');
        } else {
          setError('Registration failed. Please check your information.');
        }
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Registration failed. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100">
      <Head>
        <title>Register - PCB Shop</title>
      </Head>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
              🚀 PCB Shop
            </Link>
            <nav className="flex space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">Products</Link>
              <Link href="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors">Cart</Link>
              <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join PCB Shop</h1>
              <p className="text-gray-600">Create your account and start shopping</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">📧</span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔒</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔐</span>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              
              {/* Error/Success Message */}
              {error && (
                <div className={`p-4 rounded-lg text-sm ${
                  error.includes('successful') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {error}
                </div>
              )}
              
              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
            </div>
            
            {/* Login Link */}
            <div className="text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
              >
                🔐 Sign In
              </Link>
            </div>
            
            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link 
                href="/" 
                className="text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
          
          {/* Benefits */}
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Why Join PCB Shop?</h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="flex items-center justify-center">
                  <span className="mr-2">🛒</span>
                  <span>Save Cart Items</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">📦</span>
                  <span>Order History</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">💳</span>
                  <span>Fast Checkout</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">🎯</span>
                  <span>Personalized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}












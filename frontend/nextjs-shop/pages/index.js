import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import api from '../lib/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products/');
      // Get first 3 products as featured
      setFeaturedProducts(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const existingCart = localStorage.getItem('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];

      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
        cart = cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
      notification.textContent = '✅ Added to cart!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
      
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <Head>
        <title>PCB Shop - Your Electronics Store</title>
        <meta name="description" content="High-quality PCB components, microcontrollers, and electronics for your next project" />
      </Head>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
              🚀 PCB Shop
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Products</Link>
              <Link href="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Cart</Link>
              <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Login</Link>
            </nav>
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-indigo-600">
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PCB Shop
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your one-stop destination for high-quality PCB components, microcontrollers, and electronics. 
              Build amazing projects with our premium selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🛍️ Browse Products
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🔐 Get Started
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PCB Shop?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best components and service for electronics enthusiasts and professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔌</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                All our components are sourced from trusted manufacturers and tested for quality assurance.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to get your components to your doorstep as soon as possible.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600">
                Our team of electronics experts is here to help you with any questions or technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out some of our most popular components and get started on your next project
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                    <span className="text-6xl">🔌</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                      <span className="text-sm text-gray-500">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      }`}
                    >
                      {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Building?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of electronics enthusiasts who trust PCB Shop for their component needs. 
              Start your next project today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🚀 Create Account
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold text-lg rounded-xl border-2 border-white hover:bg-white hover:text-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🛍️ Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🚀 PCB Shop</h3>
              <p className="text-gray-400">
                Your trusted source for high-quality electronics components and PCB supplies.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">📷</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">💼</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 PCB Shop. All rights reserved. Built with ❤️ for electronics enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

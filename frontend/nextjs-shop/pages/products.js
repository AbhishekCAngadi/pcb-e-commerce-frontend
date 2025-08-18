
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import api from '../lib/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products/');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
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
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
      notification.textContent = '✅ Added to cart!';
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Animate out and remove
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

  const filteredAndSortedProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Head>
          <title>Products - PCB Shop</title>
        </Head>
        
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                🚀 PCB Shop
              </Link>
              <nav className="flex space-x-8">
                <Link href="/products" className="text-indigo-600 font-semibold">Products</Link>
                <Link href="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors">Cart</Link>
                <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Loading */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading amazing products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Products - PCB Shop</title>
      </Head>
      
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
              🚀 PCB Shop
            </Link>
            <nav className="flex space-x-8">
              <Link href="/products" className="text-indigo-600 font-semibold">Products</Link>
              <Link href="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors">Cart</Link>
              <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Amazing Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover high-quality PCB components, microcontrollers, and electronics for your next project
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Products
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                📊 Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="stock">Stock (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-indigo-600">{filteredAndSortedProducts.length}</span> products
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <p className="text-red-800">{error}</p>
            </div>
            <button
              onClick={fetchProducts}
              className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? `No products match "${searchTerm}". Try a different search term.`
                : 'No products available at the moment.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                🗑️ Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                  <span className="text-6xl">🔌</span>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{product.name}</h3>
                    <span className="text-2xl font-bold text-indigo-600 ml-3">${product.price}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description || 'No description available'}
                  </p>
                  
                  {/* Stock Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        product.stock > 10 ? 'bg-green-500' : 
                        product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                      <span className="text-sm text-gray-600">
                        {product.stock > 10 ? 'In Stock' : 
                         product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.stock} available
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      }`}
                    >
                      {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
                    </button>
                    
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`p-3 rounded-lg transition-all duration-200 ${
                        product.stock === 0
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
                      }`}
                      title="Quick Add"
                    >
                      ⚡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/cart"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                🛒 View Cart
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                🏠 Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

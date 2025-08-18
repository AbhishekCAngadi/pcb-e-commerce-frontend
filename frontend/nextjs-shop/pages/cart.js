
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }
    setLoading(false);
  }, []);

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Head>
          <title>Shopping Cart - PCB Shop</title>
        </Head>
        
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                🚀 PCB Shop
              </Link>
              <nav className="flex space-x-8">
                <Link href="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">Products</Link>
                <Link href="/cart" className="text-indigo-600 font-semibold">Cart</Link>
                <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Loading */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Shopping Cart - PCB Shop</title>
      </Head>
      
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
              🚀 PCB Shop
            </Link>
            <nav className="flex space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">Products</Link>
              <Link href="/cart" className="text-indigo-600 font-semibold">Cart</Link>
              <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-bold text-indigo-600">{getTotalItems()}</p>
          </div>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to see amazing PCB components!
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🛍️ Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Cart Items</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🔌</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-2xl font-bold text-indigo-600">${item.price}</span>
                          <span className="text-gray-500 ml-2">each</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right min-w-[5rem]">
                          <p className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    🚀 Proceed to Checkout
                  </Link>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-md hover:shadow-lg"
                  >
                    🗑️ Clear Cart
                  </button>
                  
                  <Link
                    href="/products"
                    className="w-full bg-white border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-center block"
                  >
                    🛍️ Continue Shopping
                  </Link>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">🔒</span>
                    <p className="text-sm text-blue-800">
                      Secure checkout with SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

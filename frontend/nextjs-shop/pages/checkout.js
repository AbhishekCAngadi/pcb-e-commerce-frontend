
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Simulate order processing
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear cart and redirect
    localStorage.removeItem('cart');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>PCB Shop</h1>
              </Link>
              <nav style={{ display: 'flex', gap: '20px' }}>
                <Link href="/products" style={{ color: '#666', textDecoration: 'none' }}>Products</Link>
                <Link href="/cart" style={{ color: '#666', textDecoration: 'none' }}>Cart</Link>
                <Link href="/login" style={{ color: '#666', textDecoration: 'none' }}>Login</Link>
              </nav>
            </div>
          </div>
        </header>
        
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666' }}>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>PCB Shop</h1>
              </Link>
              <nav style={{ display: 'flex', gap: '20px' }}>
                <Link href="/products" style={{ color: '#666', textDecoration: 'none' }}>Products</Link>
                <Link href="/cart" style={{ color: '#666', textDecoration: 'none' }}>Cart</Link>
                <Link href="/login" style={{ color: '#666', textDecoration: 'none' }}>Login</Link>
              </nav>
            </div>
          </div>
        </header>
        
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '30px' }}>Your cart is empty.</p>
          <Link href="/products" style={{
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#4f46e5',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>PCB Shop</h1>
            </Link>
            <nav style={{ display: 'flex', gap: '20px' }}>
              <Link href="/products" style={{ color: '#666', textDecoration: 'none' }}>Products</Link>
              <Link href="/cart" style={{ color: '#666', textDecoration: 'none' }}>Cart</Link>
              <Link href="/login" style={{ color: '#666', textDecoration: 'none' }}>Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '40px', textAlign: 'center' }}>
          Checkout
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}>
          {/* Checkout Form */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '40px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>
              Shipping Information
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginTop: '30px', marginBottom: '20px' }}>
                Payment Information
              </h3>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '20px',
                  transition: 'background-color 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
              >
                Place Order
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
              Order Summary
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <span style={{ color: '#666' }}>
                    {item.name} x {item.quantity}
                  </span>
                  <span style={{ fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: '#666' }}>Subtotal:</span>
              <span style={{ fontWeight: 'bold' }}>${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: '#666' }}>Shipping:</span>
              <span style={{ fontWeight: 'bold' }}>Free</span>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>Total:</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4f46e5' }}>
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#999', padding: '40px 0', textAlign: 'center', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <p>&copy; 2024 PCB Shop. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

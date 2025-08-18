
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    
    if (!accessToken || !username) {
      router.push('/login');
      return;
    }

    setUser({ username });
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    router.push('/');
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
                <Link href="/profile" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 'bold' }}>Profile</Link>
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
          <p style={{ color: '#666' }}>Loading profile...</p>
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
              <Link href="/profile" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 'bold' }}>Profile</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '10px', 
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#333', 
            marginBottom: '30px', 
            textAlign: 'center' 
          }}>
            Welcome, {user?.username}!
          </h2>
          
          <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                Account Information
              </h3>
              <p style={{ color: '#666', margin: '0' }}>
                <strong>Username:</strong> {user?.username}
              </p>
            </div>
            
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                Quick Actions
              </h3>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link href="/products" style={{
                  padding: '10px 20px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                >
                  Browse Products
                </Link>
                
                <Link href="/cart" style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  View Cart
                </Link>
                
                <Link href="/orders" style={{
                  padding: '10px 20px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                >
                  My Orders
                </Link>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'background-color 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#999', padding: '40px 0', textAlign: 'center', marginTop: 'auto' }}>
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

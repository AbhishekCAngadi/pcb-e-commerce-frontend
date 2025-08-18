
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    
    if (!accessToken || !username) {
      router.push('/login');
      return;
    }

    // For demo purposes, we'll show some sample orders
    // In a real app, you'd fetch orders from the API
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          orderNumber: 'ORD-001',
          date: '2024-01-15',
          status: 'Delivered',
          total: 299.99,
          items: [
            { name: 'Arduino Uno R3', quantity: 2, price: 24.99 },
            { name: 'Raspberry Pi 4 Model B', quantity: 1, price: 249.99 }
          ]
        },
        {
          id: 2,
          orderNumber: 'ORD-002',
          date: '2024-01-10',
          status: 'Shipped',
          total: 89.97,
          items: [
            { name: 'ESP32 Development Board', quantity: 3, price: 29.99 }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [router]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#10b981';
      case 'shipped':
        return '#3b82f6';
      case 'processing':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
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
                <Link href="/profile" style={{ color: '#666', textDecoration: 'none' }}>Profile</Link>
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
          <p style={{ color: '#666' }}>Loading orders...</p>
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
              <Link href="/profile" style={{ color: '#666', textDecoration: 'none' }}>Profile</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
            My Orders
          </h2>
          <Link href="/products" style={{
            padding: '12px 24px',
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
            Continue Shopping
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '60px 40px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📦</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
              No Orders Yet
            </h3>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <Link href="/products" style={{
              padding: '15px 30px',
              backgroundColor: '#4f46e5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {orders.map((order) => (
              <div key={order.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '10px', 
                padding: '30px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                      {order.orderNumber}
                    </h3>
                    <p style={{ color: '#666', margin: '0' }}>
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '6px 12px',
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {order.status}
                    </span>
                    <p style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      color: '#4f46e5', 
                      margin: '10px 0 0 0' 
                    }}>
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  borderTop: '1px solid #eee', 
                  paddingTop: '20px' 
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                    Order Items
                  </h4>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '5px'
                      }}>
                        <span style={{ color: '#333', fontWeight: '500' }}>
                          {item.name} x {item.quantity}
                        </span>
                        <span style={{ color: '#666' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  marginTop: '20px', 
                  paddingTop: '20px', 
                  borderTop: '1px solid #eee',
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'flex-end'
                }}>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background-color 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
                  >
                    Track Order
                  </button>
                  
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background-color 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

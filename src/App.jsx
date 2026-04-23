import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppProvider, useApp } from './context/AppContext';
import { pharmacies, categories } from './data/pharmacies';
import Header from './components/Header';
import PharmacyList from './components/PharmacyList';
import PharmacyDetail from './components/PharmacyDetail';
import './App.css';

const DEFAULT_CENTER = [6.9271, 79.8612];
const USER_LOCATION = [6.9250, 79.8550];

const AppContent = () => {
  const { favorites, cart, clearCart, cartTotal, login, logout, user, addOrder, orders } = useApp();
  const [activeTab, setActiveTab] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [authError, setAuthError] = useState('');
  const [profileAddress, setProfileAddress] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (user?.address) {
      setProfileAddress(user.address);
    }
  }, [user]);

  const openAddressModal = () => {
    setNewAddress(profileAddress);
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    if (!user) return;
    const updatedUser = { ...user, address: newAddress };
    localStorage.setItem('medifinder_user', JSON.stringify(updatedUser));
    setProfileAddress(newAddress);
    setShowAddressModal(false);
  };

  const filteredPharmacies = useMemo(() => {
    return pharmacies.filter(p => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesPharmacy = p.name.toLowerCase().includes(term);
        const matchesMedicine = p.medicines.some(m => 
          m.name.toLowerCase().includes(term) || 
          m.category.toLowerCase().includes(term)
        );
        if (!matchesPharmacy && !matchesMedicine) return false;
      }
      return true;
    });
  }, [searchTerm]);

  const displayPharmacies = activeTab === 'favorites' 
    ? filteredPharmacies.filter(p => favorites.includes(p.id))
    : filteredPharmacies;

  const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    const savedUsers = JSON.parse(localStorage.getItem('medifinder_users') || '[]');
    
    if (authMode === 'register') {
      if (savedUsers.find(u => u.email === authForm.email)) {
        setAuthError('Email already registered');
        return;
      }
      const newUser = { ...authForm, id: Date.now(), token: generateToken() };
      savedUsers.push(newUser);
      localStorage.setItem('medifinder_users', JSON.stringify(savedUsers));
      setAuthMode('login');
      setAuthForm({ email: '', password: '', name: '' });
      setAuthError('Registration successful! Please log in.');
    } else {
      const found = savedUsers.find(u => u.email === authForm.email && u.password === authForm.password);
      if (found) {
        login(found);
        setShowAuth(false);
        setAuthForm({ email: '', password: '', name: '' });
        setAuthError('');
      } else {
        setAuthError('Invalid email or password');
      }
    }
  };

  return (
    <div className="app-container">
        <Header onCartClick={() => setShowCart(true)} onLoginClick={() => setShowAuth(true)} />

        <main className="main">
        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search pharmacies or medicines..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        

        <div className="nav-pills">
          {['Nearby', 'map', 'favorites'].map(tab => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'map' && (
          <div className="map-container">
            <MapContainer center={DEFAULT_CENTER} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {displayPharmacies.map(p => (
                <Marker 
                  key={p.id} 
                  position={[p.lat, p.lon]}
                  eventHandlers={{
                    click: () => setSelectedPharmacy(p)
                  }}
                >
                  <Popup>
                    <strong>{p.name}</strong><br/>{p.address}<br/><em>Click for details</em></Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {activeTab !== 'map' && activeTab !== 'profile' && (
          <PharmacyList 
            pharmacies={displayPharmacies} 
            onSelect={setSelectedPharmacy} 
            userLocation={USER_LOCATION}
          />
        )}

        {activeTab === 'profile' && (
          <div className="profile-tab">
            {user ? (
              <>
                <h2>My Profile</h2>
                <div className="profile-field">
                  <label>Name:</label>
                  <p>{user.name}</p>
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <p>{user.email}</p>
                </div>
                <div className="profile-field">
                  <label>Address:</label>
                  <p>{profileAddress || 'No address saved'}</p>
                </div>
                <button className="btn" onClick={openAddressModal}>Update Address</button>

                <div className="orders-section">
                  <h3>Previous Orders</h3>
                  {orders.length === 0 ? (
                    <p className="no-orders">No orders yet</p>
                  ) : (
                    <div className="orders-list">
                      {orders.slice().reverse().map(order => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <span className="order-id">Order #{order.id}</span>
                            <span className="order-status">{order.status}</span>
                          </div>
                          <div className="order-date">{new Date(order.date).toLocaleDateString()}</div>
                          <div className="order-items">
                            {order.items.map(item => (
                              <div key={item.medicine.id} className="order-item">
                                <span>{item.medicine.name} x {item.quantity}</span>
                                <span>Rs. {item.medicine.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="order-total">Total: Rs. {order.total}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="logout-btn" onClick={logout}>Logout</button>
              </>
            ) : (
              <div className="login-prompt">
                <p>Please login to view your profile</p>
                <button className="btn" onClick={() => setShowAuth(true)}>Login</button>
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          Nearby
        </button>
        <button
          className={`bottom-nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Map
        </button>
        <button
          className={`bottom-nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          Favorites
        </button>
        <button
          className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Profile
        </button>
      </nav>

      {selectedPharmacy && (
        <PharmacyDetail 
          pharmacy={selectedPharmacy} 
          onClose={() => setSelectedPharmacy(null)} 
        />
      )}

      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal cart-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Shopping Cart</div>
              <button className="close-btn" onClick={() => setShowCart(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.medicine.id} className="cart-item">
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.medicine.name}</div>
                        <div className="cart-item-price">Rs. {item.medicine.price} x {item.quantity}</div>
                      </div>
                      <div className="cart-item-controls">
                        <button onClick={() => {}}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => {}}>+</button>
                        <button className="remove-btn" onClick={() => {}}>×</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total:</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <button className="btn order-btn" onClick={() => { addOrder(cart, cartTotal); clearCart(); setShowCart(false); setOrderSuccess(true); }}>Place Order</button>
              </>
            )}
          </div>
        </div>
      )}

      {showAuth && (
        <div className="modal-overlay" onClick={() => setShowAuth(false)}>
          <div className="modal auth-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{authMode === 'login' ? 'Login' : 'Register'}</div>
              <button className="close-btn" onClick={() => setShowAuth(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            {authError && <div className="auth-error">{authError}</div>}
            <form className="auth-form" onSubmit={handleAuth}>
              {authMode === 'register' && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                required
              />
              <button type="submit" className="btn">{authMode === 'login' ? 'Login' : 'Register'}</button>
            </form>
            <p className="auth-switch">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                {authMode === 'login' ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}

      {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Update Address</div>
              <button className="close-btn" onClick={() => setShowAddressModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <textarea
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter your address..."
              className="address-input"
            />
            <button className="btn" onClick={saveAddress}>Save Address</button>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="modal-overlay" onClick={() => setOrderSuccess(false)}>
          <div className="modal success-modal" onClick={e => e.stopPropagation()}>
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            {/* <p>Your medicines will be delivered soon.</p> */}
            <button className="btn" onClick={() => setOrderSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

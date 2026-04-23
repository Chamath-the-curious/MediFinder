import { useState, useMemo } from 'react';
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
  const { favorites, cart, clearCart, cartTotal } = useApp();
  const [activeTab, setActiveTab] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });

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
    const savedUsers = JSON.parse(localStorage.getItem('medifinder_users') || '[]');
    
    if (authMode === 'register') {
      if (savedUsers.find(u => u.email === authForm.email)) {
        alert('Email already registered');
        return;
      }
      const newUser = { ...authForm, id: Date.now(), token: generateToken() };
      savedUsers.push(newUser);
      localStorage.setItem('medifinder_users', JSON.stringify(savedUsers));
      localStorage.setItem('medifinder_token', newUser.token);
      localStorage.setItem('medifinder_user', JSON.stringify(newUser));
      setShowAuth(false);
      alert('Registration successful! Please log in.');
      setAuthMode('login');
    } else {
      const found = savedUsers.find(u => u.email === authForm.email && u.password === authForm.password);
      if (found) {
        localStorage.setItem('medifinder_token', found.token);
        localStorage.setItem('medifinder_user', JSON.stringify(found));
        setShowAuth(false);
        alert('Login successful!');
      } else {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <div className="app">
      <Header onCartClick={() => setShowCart(true)} />

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
          {['search', 'map', 'favorites'].map(tab => (
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
                <Marker key={p.id} position={[p.lat, p.lon]}>
                  <Popup>
                    <strong>{p.name}</strong><br/>{p.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {activeTab !== 'map' && (
          <PharmacyList 
            pharmacies={displayPharmacies} 
            onSelect={setSelectedPharmacy} 
            userLocation={USER_LOCATION}
          />
        )}
      </main>

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
                <button className="btn order-btn" onClick={() => { alert('Order placed!'); clearCart(); setShowCart(false); }}>Place Order</button>
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
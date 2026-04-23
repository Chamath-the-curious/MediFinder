import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'

const DEFAULT_CENTER = [6.9271, 79.8612]

const db = {
  pharmacies: [
    { id: 1, name: "HealthPlus Pharmacy", address: "123 Galle Road, Colombo 03", lat: 6.9271, lon: 79.8512, rating: 4.5, medicines: [
      { id: 'p1', name: "Panadol", price: 150, category: "Pain Relief" },
      { id: 'p2', name: "Panadol Extra", price: 200, category: "Pain Relief" },
      { id: 'a1', name: "Amoxicillin 500mg", price: 450, category: "Antibiotics" },
      { id: 'a2', name: "Augmentin 625mg", price: 850, category: "Antibiotics" },
      { id: 'v1', name: "Vitamin C 1000mg", price: 380, category: "Vitamins" },
      { id: 'v2', name: "Vitamin D3", price: 290, category: "Vitamins" },
      { id: 'd1', name: "Metformin 500mg", price: 180, category: "Diabetes" },
      { id: 'c1', name: "Cetirizine 10mg", price: 220, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] },
    { id: 2, name: "MediCare Dispensary", address: "45 Marine Drive, Colombo 04", lat: 6.9350, lon: 79.8450, rating: 4.2, medicines: [
      { id: 'b1', name: "Brufen 400mg", price: 180, category: "Pain Relief" },
      { id: 'b2', name: "Brufen 600mg", price: 250, category: "Pain Relief" },
      { id: 'a3', name: "Augmentin 375mg", price: 650, category: "Antibiotics" },
      { id: 'a4', name: "Azithromycin 500mg", price: 520, category: "Antibiotics" },
      { id: 'v3', name: "Vitamin D 1000IU", price: 320, category: "Vitamins" },
      { id: 'v4', name: "Multivitamin", price: 450, category: "Vitamins" },
      { id: 'd2', name: "Glucophage 500mg", price: 195, category: "Diabetes" },
      { id: 'c2', name: "Panadol Cold", price: 280, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] },
    { id: 3, name: "Apollo Medical Store", address: "78 Kingsway, Colombo 05", lat: 6.9200, lon: 79.8600, rating: 4.8, medicines: [
      { id: 'n1', name: "Nurofen 200mg", price: 220, category: "Pain Relief" },
      { id: 'n2', name: "Nurofen Plus", price: 350, category: "Pain Relief" },
      { id: 'z1', name: "Zithromax 250mg", price: 480, category: "Antibiotics" },
      { id: 'z2', name: "Zithromax 500mg", price: 620, category: "Antibiotics" },
      { id: 'v5', name: "Supradyn Multivitamin", price: 550, category: "Vitamins" },
      { id: 'v6', name: "Centrum", price: 680, category: "Vitamins" },
      { id: 'd3', name: "Januvia 100mg", price: 1200, category: "Diabetes" },
      { id: 'c3', name: "Strepsils", price: 190, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] },
    { id: 4, name: "City Pharma", address: "15 Fort Street, Colombo 01", lat: 6.9400, lon: 79.8400, rating: 4.0, medicines: [
      { id: 'cd1', name: "Codeine Phosphate", price: 280, category: "Pain Relief" },
      { id: 'cd2', name: "Tramadol 50mg", price: 420, category: "Pain Relief" },
      { id: 'ci1', name: "Ciprofloxacin 500mg", price: 380, category: "Antibiotics" },
      { id: 'ci2', name: "Ciproxin 250mg", price: 290, category: "Antibiotics" },
      { id: 'bc1', name: "Neurobion", price: 320, category: "Vitamins" },
      { id: 'bc2', name: "Becosine", price: 410, category: "Vitamins" },
      { id: 'd4', name: "Insulin Glargine", price: 1500, category: "Diabetes" },
      { id: 'c4', name: "Aspirin 100mg", price: 120, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] },
    { id: 5, name: "Wellness Pharmacy", address: "200 High Street, Colombo 10", lat: 6.9100, lon: 79.8700, rating: 4.6, medicines: [
      { id: 'pd1', name: "Panadeine", price: 190, category: "Pain Relief" },
      { id: 'pd2', name: "Panadeine Extra", price: 260, category: "Pain Relief" },
      { id: 'az1', name: "Azithromycin 250mg", price: 450, category: "Antibiotics" },
      { id: 'az2', name: "Azithrocyn", price: 380, category: "Antibiotics" },
      { id: 'ir1', name: "Iron Tablets", price: 180, category: "Vitamins" },
      { id: 'ir2', name: "Feroglobin", price: 420, category: "Vitamins" },
      { id: 'd5', name: "Metformin 850mg", price: 220, category: "Diabetes" },
      { id: 'c5', name: "Flu medication", price: 340, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] },
    { id: 6, name: "CarePlus Dispensary", address: "55 York Street, Colombo 02", lat: 6.9300, lon: 79.8550, rating: 4.3, medicines: [
      { id: 'm1', name: "Mersic", price: 165, category: "Pain Relief" },
      { id: 'm2', name: "Migrastat", price: 240, category: "Pain Relief" },
      { id: 'cf1', name: "Ceftriaxone 1g", price: 680, category: "Antibiotics" },
      { id: 'cf2', name: "Cefixime 200mg", price: 520, category: "Antibiotics" },
      { id: 'ca1', name: "Calcium + D3", price: 350, category: "Vitamins" },
      { id: 'ca2', name: "Calcimax", price: 420, category: "Vitamins" },
      { id: 'd6', name: "Glipizide 5mg", price: 195, category: "Diabetes" },
      { id: 'c6', name: "Cough syrup", price: 280, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] },
    { id: 7, name: "Rajasinghe Medical", address: "88 Union Place, Colombo 07", lat: 6.9150, lon: 79.8650, rating: 4.7, medicines: [
      { id: 'dc1', name: "Diclofenac 50mg", price: 180, category: "Pain Relief" },
      { id: 'dc2', name: "Diclomax", price: 290, category: "Pain Relief" },
      { id: 'dx1', name: "Doxycycline 100mg", price: 480, category: "Antibiotics" },
      { id: 'dx2', name: "Doxytet", price: 520, category: "Antibiotics" },
      { id: 'fa1', name: "Folic Acid 5mg", price: 90, category: "Vitamins" },
      { id: 'fa2', name: "Ferric Acid", price: 150, category: "Vitamins" },
      { id: 'd7', name: "Sitagliptin 50mg", price: 890, category: "Diabetes" },
      { id: 'c7', name: "Dispro", price: 220, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] },
    { id: 8, name: "Hikmed Pharmacy", address: "33 Bambalapitiya, Colombo 04", lat: 6.9250, lon: 79.8420, rating: 4.1, medicines: [
      { id: 'tm1', name: "Tramadol 100mg", price: 350, category: "Pain Relief" },
      { id: 'tm2', name: "Ultram", price: 420, category: "Pain Relief" },
      { id: 'mt1', name: "Metronidazole 400mg", price: 280, category: "Antibiotics" },
      { id: 'mt2', name: "Flagyl", price: 320, category: "Antibiotics" },
      { id: 'zn1', name: "Zinc Gluconate", price: 190, category: "Vitamins" },
      { id: 'zn2', name: "Zincovit", price: 280, category: "Vitamins" },
      { id: 'd8', name: "Amlodipine 5mg", price: 180, category: "Diabetes" },
      { id: 'c8', name: "Benadryl", price: 240, category: "Cold & Flu" }
    ], categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"] }
  ],
  reviews: [
    { id: 1, pharmacyId: 1, user: "John D.", rating: 5, text: "Great service and fast delivery!" },
    { id: 2, pharmacyId: 1, user: "Sarah M.", rating: 4, text: "Good prices, friendly staff" },
    { id: 3, pharmacyId: 2, user: "Mike R.", rating: 4, text: "Always has medicines in stock" },
    { id: 4, pharmacyId: 3, user: "Priya K.", rating: 5, text: "Very professional pharmacists" }
  ],
  favorites: [],
  cart: []
}

const CATEGORIES = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Cold & Flu", "Diabetes"]

function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [medicineSearch, setMedicineSearch] = useState('')
  const [favorites, setFavorites] = useState([])
  const [reviews, setReviews] = useState(db.reviews)
  const [selectedPharmacy, setSelectedPharmacy] = useState(null)
  const [newReview, setNewReview] = useState('')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('medifinder_data')
    if (saved) {
      const data = JSON.parse(saved)
      setFavorites(data.favorites || [])
    }
    const savedReviews = localStorage.getItem('medifinder_reviews')
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('medifinder_data', JSON.stringify({ favorites }))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('medifinder_reviews', JSON.stringify(reviews))
  }, [reviews])

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return (R * c).toFixed(1)
  }

  const filteredPharmacies = db.pharmacies.filter(p => {
    if (filter !== 'All' && !p.categories.includes(filter)) return false
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return p.name.toLowerCase().includes(term)
    }
    return true
  })

  const getAvailableMedicines = (pharmacy) => {
    if (!medicineSearch) return pharmacy.medicines
    const term = medicineSearch.toLowerCase()
    return pharmacy.medicines.filter(m => 
      m.name.toLowerCase().includes(term) || 
      m.category.toLowerCase().includes(term)
    )
  }

  const displayPharmacies = activeTab === 'favorites' 
    ? filteredPharmacies.filter(p => favorites.includes(p.id))
    : filteredPharmacies

  const toggleFavorite = (id, e) => {
    e.stopPropagation()
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const getReviews = (pharmacyId) => reviews.filter(r => r.pharmacyId === pharmacyId)

  const submitReview = () => {
    if (!newReview.trim() || !selectedPharmacy) return
    const review = {
      id: Date.now(),
      pharmacyId: selectedPharmacy.id,
      user: "You",
      rating: 4,
      text: newReview.trim()
    }
    setReviews([...reviews, review])
    setNewReview('')
  }

  const addToCart = (medicine) => {
    const existing = cart.find(item => item.medicine.id === medicine.id)
    if (existing) {
      setCart(cart.map(item => 
        item.medicine.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { medicine, quantity: 1 }])
    }
  }

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.medicine.id !== medicineId))
  }

  const updateQuantity = (medicineId, delta) => {
    setCart(cart.map(item => {
      if (item.medicine.id === medicineId) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)

  const placeOrder = () => {
    setOrderSuccess(true)
    setCart([])
    setSelectedPharmacy(null)
  }

  const closeOrderSuccess = () => {
    setOrderSuccess(false)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          MediFinder
        </div>
        <button className="cart-btn" onClick={() => setShowCart(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </header>

      <main className="main">
        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search medicines..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
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

        <div className="results">
          {displayPharmacies.length === 0 ? (
            <div className="no-results">No pharmacies found</div>
          ) : displayPharmacies.map(p => {
            const distance = getDistance(6.9250, 79.8550, p.lat, p.lon)
            return (
              <div key={p.id} className="result-card" onClick={() => setSelectedPharmacy(p)}>
                <div className="result-header">
                  <div className="result-name">{p.name}</div>
                  <button 
                    className={`favorite-btn ${favorites.includes(p.id) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(p.id, e)}
                  >
                    <svg viewBox="0 0 24 24" fill={favorites.includes(p.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </button>
                </div>
                <div className="result-rating">★ {p.rating}</div>
                <div className="result-address">{p.address}</div>
                <div className="medicine-list">
                  {p.medicines.slice(0, 4).map(m => (
                    <span key={m.id} className="medicine-tag">{m.name}</span>
                  ))}
                </div>
                <div className="result-distance">{distance} km away</div>
              </div>
            )
          })}
        </div>
      </main>

      {selectedPharmacy && (
        <div className="modal-overlay" onClick={() => setSelectedPharmacy(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{selectedPharmacy.name}</div>
                <div className="modal-rating">★ {selectedPharmacy.rating}</div>
              </div>
              <button className="close-btn" onClick={() => setSelectedPharmacy(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="modal-address">{selectedPharmacy.address}</div>
            
            <div className="medicine-search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search medicines..."
                value={medicineSearch}
                onChange={(e) => setMedicineSearch(e.target.value)}
              />
            </div>

            <div className="medicines-available">
              <h4>Available Medicines ({getAvailableMedicines(selectedPharmacy).length})</h4>
              <div className="medicine-grid">
                {getAvailableMedicines(selectedPharmacy).map(m => (
                  <div key={m.id} className="medicine-card">
                    <div className="medicine-name">{m.name}</div>
                    <div className="medicine-category">{m.category}</div>
                    <div className="medicine-price">Rs. {m.price}</div>
                    <button className="add-btn" onClick={() => addToCart(m)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-section">
              <h4>Cart ({cart.length} items - Rs. {cartTotal})</h4>
              {cart.length > 0 && (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.medicine.id} className="cart-item">
                        <div className="cart-item-info">
                          <div className="cart-item-name">{item.medicine.name}</div>
                          <div className="cart-item-price">Rs. {item.medicine.price} x {item.quantity}</div>
                        </div>
                        <div className="cart-item-controls">
                          <button onClick={() => updateQuantity(item.medicine.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.medicine.id, 1)}>+</button>
                          <button className="remove-btn" onClick={() => removeFromCart(item.medicine.id)}>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn order-btn" onClick={placeOrder}>Place Order</button>
                </>
              )}
            </div>
            
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="modal-overlay" onClick={closeOrderSuccess}>
          <div className="modal success-modal" onClick={e => e.stopPropagation()}>
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Your medicines will be delivered soon.</p>
            <button className="btn" onClick={closeOrderSuccess}>Close</button>
          </div>
        </div>
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
                        <button onClick={() => updateQuantity(item.medicine.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.medicine.id, 1)}>+</button>
                        <button className="remove-btn" onClick={() => removeFromCart(item.medicine.id)}>×</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total:</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <button className="btn order-btn" onClick={() => { setShowCart(false); setOrderSuccess(true); setCart([]); }}>Place Order</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
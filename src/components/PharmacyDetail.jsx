import { useState } from 'react';
import { useApp } from '../context/AppContext';

const PharmacyDetail = ({ pharmacy, onClose }) => {
  const { addToCart, cart, updateQuantity, removeFromCart, clearCart, cartTotal, reviews } = useApp();
  const [medicineSearch, setMedicineSearch] = useState('');
  const [newReview, setNewReview] = useState('');

  const filteredMedicines = pharmacy.medicines.filter(m => 
    !medicineSearch || 
    m.name.toLowerCase().includes(medicineSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(medicineSearch.toLowerCase())
  );

  const pharmacyReviews = reviews.filter(r => r.pharmacyId === pharmacy.id);

  const handleSubmitReview = () => {
    if (!newReview.trim()) return;
    alert('Please login to submit a review');
  };

  const handleOrder = () => {
    alert('Order placed successfully!');
    clearCart();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{pharmacy.name}</div>
            <div className="modal-rating">★ {pharmacy.rating}</div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="modal-address">{pharmacy.address}</div>
        
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
          <h4>Available Medicines ({filteredMedicines.length})</h4>
          <div className="medicine-grid">
            {filteredMedicines.map(m => (
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
              {/* <button className="btn order-btn" onClick={handleOrder}>Place Order</button> */}
            </>
          )}
        </div>

        <div className="reviews-section">
          <h3>Reviews</h3>
          {pharmacyReviews.length === 0 ? (
            <p className="no-reviews">No reviews yet</p>
          ) : (
            pharmacyReviews.map(r => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <span className="review-user">{r.user}</span>
                  <span className="review-rating">★ {r.rating}</span>
                </div>
                <div className="review-text">{r.text}</div>
              </div>
            ))
          )}
          <div className="review-form">
            <textarea 
              placeholder="Write a review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button className="btn" onClick={handleSubmitReview}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetail;

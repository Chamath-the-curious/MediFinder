import { useApp } from '../context/AppContext';

const PharmacyList = ({ pharmacies, onSelect, userLocation }) => {
  const { favorites, toggleFavorite } = useApp();

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  if (pharmacies.length === 0) {
    return <div className="no-results">No pharmacies found</div>;
  }

  return (
    <div className="results">
      {pharmacies.map(p => {
        const distance = getDistance(userLocation[0], userLocation[1], p.lat, p.lon);
        return (
          <div key={p.id} className="result-card" onClick={() => onSelect(p)}>
            <div className="result-header">
              <div className="result-name">{p.name}</div>
              <button 
                className={`favorite-btn ${favorites.includes(p.id) ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
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
        );
      })}
    </div>
  );
};

export default PharmacyList;
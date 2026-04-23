import { categories } from '../data/pharmacies';

const SearchBar = ({ searchTerm, onSearchChange, activeTab, onTabChange, onShowCart, cartCount }) => {
  return (
    <>
      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search pharmacies or medicines..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filters">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-chip ${activeTab === 'search' && cat === 'All' ? 'active' : ''}`}
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
            onClick={() => onTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
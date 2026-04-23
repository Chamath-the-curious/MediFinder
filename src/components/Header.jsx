import { useApp } from '../context/AppContext';
import { useState } from 'react';

const Header = ({ onCartClick, onLoginClick }) => {
  const { user, logout, cartCount } = useApp();

  return (
    <header className="header">
      <div className="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
        MediFinder
      </div>
      <div className="header-actions">
        {user ? (
          <>
            <span className="user-name">Welcome, {user.name}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="login-btn" onClick={onLoginClick}>Login</button>
        )}
        <button className="cart-btn" onClick={onCartClick}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Cart ({cartCount})
        </button>
      </div>
    </header>
  );
};

export default Header;
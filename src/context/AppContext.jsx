import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('medifinder_token');
    const savedUser = localStorage.getItem('medifinder_user');
    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const saved = localStorage.getItem('medifinder_data');
    if (saved) {
      const data = JSON.parse(saved);
      setFavorites(data.favorites || []);
    }

    const savedReviews = localStorage.getItem('medifinder_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }

    const savedOrders = localStorage.getItem('medifinder_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medifinder_data', JSON.stringify({ favorites }));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('medifinder_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('medifinder_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (userData) => {
    localStorage.setItem('medifinder_token', userData.token);
    localStorage.setItem('medifinder_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('medifinder_token');
    localStorage.removeItem('medifinder_user');
    setUser(null);
  };

  const toggleFavorite = (pharmacyId) => {
    if (favorites.includes(pharmacyId)) {
      setFavorites(favorites.filter(f => f !== pharmacyId));
    } else {
      setFavorites([...favorites, pharmacyId]);
    }
  };

  const addToCart = (medicine) => {
    const existing = cart.find(item => item.medicine.id === medicine.id);
    if (existing) {
      setCart(cart.map(item => 
        item.medicine.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.medicine.id !== medicineId));
  };

  const updateQuantity = (medicineId, delta) => {
    setCart(cart.map(item => {
      if (item.medicine.id === medicineId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const addReview = (review) => {
    setReviews([...reviews, { ...review, id: Date.now() }]);
  };

  const addOrder = (orderItems, total) => {
    const newOrder = {
      id: Date.now(),
      items: orderItems,
      total,
      date: new Date().toISOString(),
      status: 'Processing'
    };
    setOrders([...orders, newOrder]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      user, login, logout,
      favorites, toggleFavorite,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      reviews, addReview,
      orders, addOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};
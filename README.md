# MediFinder - Medicine Locator

A web application for finding medicines at nearby pharmacies in Sri Lanka.

## Features

- **Pharmacy Search** - Search pharmacies by name or medicine
- **Map View** - View pharmacies on an interactive map
- **Favorites** - Save favorite pharmacies
- **Medicine Search** - Search available medicines within each pharmacy
- **Shopping Cart** - Add medicines to cart and manage quantities
- **Order Placement** - Place orders with confirmation popup
- **User Authentication** - Register and login
- **Profile** - View profile, save address, logout
- **Order History** - View previous orders with reorder option
- **Reviews** - View and submit reviews for pharmacies

## Tech Stack

- React + Vite
- Leaflet (react-leaflet) for maps
- LocalStorage for data persistence
- In-memory database

## Project Structure

```
src/
  data/
    pharmacies.js      # Pharmacy & review data
  context/
    AppContext.jsx    # Shared state (user, cart, favorites, orders)
  components/
    Header.jsx         # Header with logo, login, cart buttons
    PharmacyList.jsx  # Pharmacy cards grid
    PharmacyDetail.jsx # Pharmacy modal with medicines
  App.jsx             # Main app component
  App.css             # Styles
```

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Color Scheme

White, black, and green.
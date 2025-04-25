# Real-Time Cryptocurrency Price Tracker

A professional React application that displays real-time cryptocurrency data with a beautiful UI and simulated WebSocket updates.

## Features

- 🚀 Real-time price updates (simulated WebSocket)
- 📊 Interactive price charts
- 💫 Smooth animations for price changes
- 🌗 Color-coded price changes
- ⭐ Favorite cryptocurrencies
- 📱 Fully responsive design

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- CoinGecko API for cryptocurrency data

## Project Architecture

The project follows a clean architecture pattern:

```
src/
  ├── components/      # React components
  ├── services/       # API and WebSocket services
  ├── store/          # Redux store and slices
  ├── types/          # TypeScript type definitions
  └── App.tsx         # Root component
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crypto-price-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## State Management

The application uses Redux Toolkit for state management with the following features:

- Real-time price updates
- Optimized re-renders using selectors
- Persistent favorites using localStorage
- WebSocket simulation for live updates

## Data Flow

1. Initial data is fetched from CoinGecko API
2. Mock WebSocket service simulates real-time updates
3. Updates are dispatched to Redux store
4. Components re-render with new data
5. Price changes are animated and color-coded


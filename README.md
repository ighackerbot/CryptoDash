# CryptoDash - Real-Time Cryptocurrency Tracker

A professional React application that displays real-time cryptocurrency data with a beautiful UI and simulated WebSocket updates.

## 🚀 Features

- Real-time price updates (simulated WebSocket)
- Interactive price charts with sparklines
- Smooth animations for price changes
- Color-coded price changes
- Favorite cryptocurrencies
- Fully responsive design
- Search and filtering capabilities
- Sortable columns
- Supply progress visualization
- Market statistics dashboard

## 🛠️ Tech Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- CoinGecko API for cryptocurrency data

## 🏗️ Project Architecture

### Project Flow

```mermaid
graph TD
    %% Main Components
    A[CoinGecko API] -->|Fetch Initial Data| B[Redux Store]
    C[Mock WebSocket] -->|Real-time Updates| B
    B -->|State Changes| D[CryptoTable Component]
    
    %% Redux Store Details
    subgraph Redux[Redux Store]
        B -->|Assets| E[Crypto Slice]
        E -->|State| F[Assets Array]
        E -->|State| G[Loading Status]
        E -->|State| H[Error State]
    end

    %% Component Tree
    subgraph Components[React Components]
        D -->|Renders| I[Market Header]
        D -->|Renders| J[Data Table]
        
        %% Market Header Features
        I -->|Contains| K[Search Bar]
        I -->|Contains| L[Favorites Toggle]
        I -->|Contains| M[Market Stats]
        
        %% Table Features
        J -->|Features| N[Sortable Columns]
        J -->|Features| O[Price Animations]
        J -->|Features| P[Sparkline Charts]
        J -->|Features| Q[Supply Progress]
    end

    %% Data Flow
    K -->|Filter| R[Filtered Data]
    L -->|Filter| R
    R -->|Display| J
    
    %% User Interactions
    U((User)) -->|Search| K
    U -->|Toggle Favorites| L
    U -->|Sort Columns| N
    U -->|Star Assets| J
```

### Component Structure

```mermaid
classDiagram
    class App {
        +render()
    }
    class CryptoTable {
        -favorites: Set
        -searchTerm: string
        -sortConfig: object
        +toggleFavorite()
        +handleSort()
        +renderPriceChange()
        +render()
    }
    class MarketHeader {
        -searchTerm: string
        -showFavorites: boolean
        +onSearchChange()
        +onToggleFavorites()
        +render()
    }
    class SparklineChart {
        -data: number[]
        +render()
    }
    class ReduxStore {
        +assets: CryptoAsset[]
        +loading: boolean
        +error: string
        +dispatch()
        +select()
    }

    App --> CryptoTable
    CryptoTable --> MarketHeader
    CryptoTable --> SparklineChart
    CryptoTable --> ReduxStore
```

### State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Loading: Initialize
    Loading --> Error: API Error
    Loading --> Ready: Data Loaded
    Ready --> Filtering: User Search
    Ready --> Sorting: User Sort
    Ready --> Favorites: Toggle Favorites
    Filtering --> Ready: Clear Search
    Sorting --> Ready: Reset Sort
    Favorites --> Ready: Show All
    Ready --> Updating: WebSocket Update
    Updating --> Ready: Update Complete
```

## 🔄 Data Flow Description

1. **Initial Data Load**
   - Application fetches data from CoinGecko API
   - Data is stored in Redux store
   - Components receive initial state

2. **Real-time Updates**
   - Mock WebSocket simulates live price updates
   - Updates are dispatched to Redux store
   - Components re-render with new data

3. **User Interactions**
   - Search filters assets in real-time
   - Favorites can be toggled
   - Columns can be sorted
   - Assets can be starred

4. **Component Updates**
   - Price changes trigger animations
   - Charts update with new data
   - Supply bars show circulation ratio
   - Market stats refresh periodically

## 📁 Project Structure

```
src/
  ├── components/      # React components
  ├── services/       # API and WebSocket services
  ├── store/          # Redux store and slices
  ├── types/          # TypeScript type definitions
  └── App.tsx         # Root component
```

## 🚀 Setup Instructions

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

## 🔧 State Management

The application uses Redux Toolkit for state management with the following features:

- Real-time price updates
- Optimized re-renders using selectors
- Persistent favorites using localStorage
- WebSocket simulation for live updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data provided by [CoinGecko API](https://www.coingecko.com/api)
- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)


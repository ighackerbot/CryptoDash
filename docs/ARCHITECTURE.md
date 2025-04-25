# CryptoDash Architecture

## Project Flow

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

## Data Flow Description

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

## Component Structure

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

## State Management

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

This architecture documentation shows the main components and data flow of the CryptoDash application. The Mermaid diagrams illustrate:

1. The overall data flow from API to UI
2. Component hierarchy and relationships
3. State management and transitions
4. User interaction flows 
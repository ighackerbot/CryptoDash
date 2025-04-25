import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234F46E5'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-9.5v5l7-7-7-7v5H6v4h5z'/%3E%3C/svg%3E"
                    alt="Logo"
                  />
                  <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    CryptoDash
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                
              </div>
            </div>
          </div>
        </nav>
        <main>
          <CryptoTable />
        </main>
      </div>
    </Provider>
  );
}

export default App;
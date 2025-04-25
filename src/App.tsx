import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { store } from './store';
import CryptoTable from './components/CryptoTable';
import CryptoComparison from './components/CryptoComparison';
import { LineChart, LayoutGrid } from 'lucide-react';
import logo from './assets/logo.png';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-40"></div>
                <img
                  className="h-8 w-8 relative rounded-full"
                  src={logo}
                  alt="CryptoDash Logo"
                />
              </div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                CryptoDash
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/'
                    ? 'bg-white/80 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-white/40 hover:text-blue-600'
                }`}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/compare"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/compare'
                    ? 'bg-white/80 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-white/40 hover:text-blue-600'
                }`}
              >
                <LineChart className="w-4 h-4 mr-2" />
                Compare
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/ighackerbot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-white/40 hover:text-blue-600 transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              Powered by ighackerbot
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<CryptoTable />} />
              <Route path="/compare" element={<CryptoComparison />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
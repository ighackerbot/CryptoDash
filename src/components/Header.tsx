import React from 'react';
import { TrendingUp, Moon, Sun, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setTheme, setSearchTerm } from '../store/uiSlice';
import { ThemeMode } from '../types';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme, searchTerm } = useAppSelector(state => state.ui);
  
  const toggleTheme = () => {
    const newTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };
  
  return (
    <header className="py-6 mb-8 glass sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              CryptoTracker
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-2.5 pl-10 pr-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search crypto..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-gray-800/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
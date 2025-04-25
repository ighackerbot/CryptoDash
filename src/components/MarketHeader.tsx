import React from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';

interface MarketHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

const MarketHeader: React.FC<MarketHeaderProps> = ({
  searchTerm,
  onSearchChange,
  showFavorites,
  onToggleFavorites,
}) => {
  return (
    <div className="bg-white shadow-sm mb-6">
      <div className="container mx-auto px-4 py-4">
        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-600 mb-1">Market Cap</h3>
            <p className="text-2xl font-bold text-blue-900">$2.14T</p>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp size={16} className="mr-1" />
              <span>2.4%</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-600 mb-1">24h Volume</h3>
            <p className="text-2xl font-bold text-purple-900">$84.2B</p>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingDown size={16} className="mr-1" />
              <span>1.2%</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-emerald-600 mb-1">BTC Dominance</h3>
            <p className="text-2xl font-bold text-emerald-900">48.2%</p>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp size={16} className="mr-1" />
              <span>0.8%</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search by name or symbol..."
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleFavorites}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showFavorites
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Favorites
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="market_cap">Market Cap</option>
              <option value="volume">Volume</option>
              <option value="price_change">Price Change</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeader; 
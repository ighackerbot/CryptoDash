import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ArrowUpDown } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';
import { fetchTopCryptos } from '../services/cryptoService';
import { MockWebSocket } from '../services/mockWebSocket';
import { selectAllAssets, selectLoading, selectError, setAssets, updateAsset } from '../store/cryptoSlice';
import MarketHeader from './MarketHeader';

const mockWebSocket = new MockWebSocket();

const CryptoTable = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAllAssets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CryptoAsset;
    direction: 'asc' | 'desc';
  }>({ key: 'market_cap_rank', direction: 'asc' });
  
  // Store previous values for animation
  const prevValues = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopCryptos(50);
        dispatch(setAssets(data));
      } catch (err) {
        console.error('Failed to fetch cryptocurrency data:', err);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = mockWebSocket.subscribe((update) => {
      if ('id' in update) {
        dispatch(updateAsset(update as Partial<CryptoAsset> & { id: string }));
      }
    });

    mockWebSocket.start();
    return () => {
      unsubscribe();
      mockWebSocket.stop();
    };
  }, [dispatch]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B`;
    }
    if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M`;
    }
    return num.toLocaleString();
  };

  const handleSort = (key: keyof CryptoAsset) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderPriceChange = (change: number, previousValue?: number) => {
    const hasChanged = previousValue !== undefined && change !== previousValue;
    return (
      <span className={`
        px-2 inline-flex text-xs leading-5 font-semibold rounded-full
        ${change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        ${hasChanged ? 'animate-pulse' : ''}
      `}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
      </span>
    );
  };

  const filteredAndSortedAssets = assets
    .filter(asset => {
      if (showFavorites && !favorites.has(asset.id)) return false;
      if (searchTerm && !asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const modifier = sortConfig.direction === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return modifier * aValue.localeCompare(bValue);
      }
      return modifier * ((aValue as number) - (bValue as number));
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const SortableHeader: React.FC<{ field: keyof CryptoAsset; label: string }> = ({ field, label }) => (
    <th 
      onClick={() => handleSort(field)}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown 
          size={14}
          className={`transition-opacity ${
            sortConfig.key === field ? 'opacity-100' : 'opacity-30'
          }`}
        />
      </div>
    </th>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <MarketHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
      />
      
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
                  <SortableHeader field="market_cap_rank" label="#" />
                  <SortableHeader field="name" label="Name" />
                  <SortableHeader field="current_price" label="Price" />
                  <SortableHeader field="price_change_percentage_1h_in_currency" label="1h %" />
                  <SortableHeader field="price_change_percentage_24h" label="24h %" />
                  <SortableHeader field="price_change_percentage_7d_in_currency" label="7d %" />
                  <SortableHeader field="market_cap" label="Market Cap" />
                  <SortableHeader field="total_volume" label="Volume(24h)" />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Last 7 Days</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedAssets.map((crypto) => {
                  const priceChanged = prevValues.current[crypto.id] !== crypto.current_price;
                  prevValues.current[crypto.id] = crypto.current_price;

                  return (
                    <tr key={crypto.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFavorite(crypto.id)}
                          className="text-gray-400 hover:text-yellow-400 transition-colors"
                        >
                          <Star
                            size={20}
                            fill={favorites.has(crypto.id) ? "currentColor" : "none"}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {crypto.market_cap_rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-8 w-8 rounded-full" src={crypto.image} alt={crypto.name} />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                            <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        priceChanged ? 'animate-pulse' : ''
                      }`}>
                        ${crypto.current_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderPriceChange(crypto.price_change_percentage_1h_in_currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderPriceChange(crypto.price_change_percentage_24h)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {renderPriceChange(crypto.price_change_percentage_7d_in_currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${formatNumber(crypto.market_cap)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${formatNumber(crypto.total_volume)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>{formatNumber(crypto.circulating_supply)} {crypto.symbol.toUpperCase()}</span>
                          {crypto.max_supply && (
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{
                                  width: `${(crypto.circulating_supply / crypto.max_supply) * 100}%`
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-28 inline-block">
                          {crypto.sparkline_in_7d?.price && (
                            <SparklineChart data={crypto.sparkline_in_7d.price} />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const lineColor = data[0] <= data[data.length - 1] ? '#22c55e' : '#ef4444';

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
      />
    </svg>
  );
};

export default CryptoTable;
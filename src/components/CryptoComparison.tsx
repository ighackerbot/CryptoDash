import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { selectAllAssets } from '../store/cryptoSlice';
import { CryptoAsset } from '../types/crypto';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CryptoComparison: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '1y'>('7d');
  const [chartData, setChartData] = useState<any>(null);

  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
  ];

  const toggleCoin = (coinId: string) => {
    setSelectedCoins(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId].slice(0, 5) // Limit to 5 coins
    );
  };

  useEffect(() => {
    const fetchChartData = async () => {
      if (selectedCoins.length === 0) return;

      try {
        const datasets = await Promise.all(
          selectedCoins.map(async (coinId, index) => {
            const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${
                timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 365
              }`
            );
            const data = await response.json();
            
            return {
              label: assets.find(a => a.id === coinId)?.name || coinId,
              data: data.prices.map(([timestamp, price]: [number, number]) => ({
                x: timestamp,
                y: price
              })),
              borderColor: colors[index % colors.length],
              backgroundColor: colors[index % colors.length],
              tension: 0.4,
            };
          })
        );

        setChartData({
          datasets
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [selectedCoins, timeRange, assets]);

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: timeRange === '24h' ? 'hour' : timeRange === '7d' ? 'day' : 'week'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Price (USD)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cryptocurrency Price Comparison'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Cryptocurrency Comparison</h1>
          
          {/* Time Range Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Time Range</h2>
            <div className="flex gap-2">
              {(['24h', '7d', '30d', '1y'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Coin Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Select Coins (max 5)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {assets.slice(0, 20).map(coin => (
                <button
                  key={coin.id}
                  onClick={() => toggleCoin(coin.id)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                    selectedCoins.includes(coin.id)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span>{coin.symbol.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[600px]">
            {chartData ? (
              <Line options={chartOptions} data={chartData} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select coins to compare
              </div>
            )}
          </div>

          {/* Stats */}
          {selectedCoins.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCoins.map(coinId => {
                const coin = assets.find(a => a.id === coinId);
                if (!coin) return null;
                return (
                  <div key={coinId} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                      <h3 className="font-semibold">{coin.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Price:</span>
                        <span className="ml-2">${coin.current_price.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">24h:</span>
                        <span className={`ml-2 ${
                          coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Market Cap:</span>
                        <span className="ml-2">${(coin.market_cap / 1e9).toFixed(2)}B</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Volume:</span>
                        <span className="ml-2">${(coin.total_volume / 1e6).toFixed(2)}M</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoComparison; 
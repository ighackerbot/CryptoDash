import { CryptoAsset } from '../types';

// Sample data for 5 top cryptocurrencies
export const initialCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    price: 68423.52,
    priceChange1h: 0.25,
    priceChange24h: -2.15,
    priceChange7d: 5.78,
    marketCap: 1342872639117,
    volume24h: 22781563812,
    circulatingSupply: 19623650,
    maxSupply: 21000000,
    sparkline: [67523, 68012, 68743, 68921, 68321, 68423, 68120]
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 3245.87,
    priceChange1h: -0.34,
    priceChange24h: -1.89,
    priceChange7d: 3.45,
    marketCap: 389764532811,
    volume24h: 13567234567,
    circulatingSupply: 120235698,
    maxSupply: null,
    sparkline: [3189, 3210, 3245, 3278, 3256, 3245, 3240]
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    price: 1.00,
    priceChange1h: 0.01,
    priceChange24h: 0.02,
    priceChange7d: -0.01,
    marketCap: 96372881234,
    volume24h: 58943562789,
    circulatingSupply: 96372881234,
    maxSupply: null,
    sparkline: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00]
  },
  {
    id: 'bnb',
    rank: 4,
    name: 'BNB',
    symbol: 'BNB',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    price: 563.24,
    priceChange1h: 0.54,
    priceChange24h: 1.83,
    priceChange7d: -2.75,
    marketCap: 85674398752,
    volume24h: 1782345678,
    circulatingSupply: 152174284,
    maxSupply: 200000000,
    sparkline: [558, 560, 562, 565, 564, 563, 562]
  },
  {
    id: 'solana',
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    price: 132.53,
    priceChange1h: -1.02,
    priceChange24h: -3.42,
    priceChange7d: 8.97,
    marketCap: 58934267123,
    volume24h: 2783456123,
    circulatingSupply: 445431536,
    maxSupply: null,
    sparkline: [130, 133, 136, 134, 133, 132, 131]
  }
];
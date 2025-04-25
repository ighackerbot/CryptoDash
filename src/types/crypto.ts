export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  max_supply: number | null;
  sparkline_in_7d: {
    price: number[];
  };
  is_favorite?: boolean;
}

export interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
} 
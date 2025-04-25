import { CryptoAsset } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchTopCryptos = async (limit: number = 100): Promise<CryptoAsset[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }

    const data = await response.json();
    return data.map((crypto: any) => ({
      ...crypto,
      is_favorite: false
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
}; 
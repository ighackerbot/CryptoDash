import { CryptoAsset } from '../types/crypto';

export class MockWebSocket {
  private interval: NodeJS.Timer | null = null;
  private subscribers: ((data: Partial<CryptoAsset>) => void)[] = [];

  start() {
    if (this.interval) return;

    this.interval = setInterval(() => {
      // Randomly select an asset to update
      const assets = ['bitcoin', 'ethereum', 'tether', 'ripple', 'binancecoin'];
      const assetId = assets[Math.floor(Math.random() * assets.length)];

      // Generate random price change (-2% to +2%)
      const priceChange = (Math.random() * 4 - 2) / 100;

      // Create update payload
      const update: Partial<CryptoAsset> = {
        id: assetId,
        price_change_percentage_1h_in_currency: (Math.random() * 4 - 2),
        price_change_percentage_24h: (Math.random() * 8 - 4),
        price_change_percentage_7d_in_currency: (Math.random() * 16 - 8),
        total_volume: Math.random() * 1000000000
      };

      // Notify subscribers
      this.subscribers.forEach(callback => callback(update));
    }, 1500); // Update every 1.5 seconds
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  subscribe(callback: (data: Partial<CryptoAsset>) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
} 
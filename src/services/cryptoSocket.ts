import { store } from '../store';
import { updateMultipleAssets } from '../store/cryptoSlice';
import { CryptoAsset } from '../types';

class CryptoSocketSimulator {
  private interval: number | null = null;
  private updateFrequency: number = 1500; // milliseconds

  // Generate a random price change within limits
  private generatePriceChange(currentPrice: number): number {
    const maxChangePercent = 1; // Maximum 1% change per update
    const changePercent = (Math.random() * maxChangePercent * 2) - maxChangePercent;
    return currentPrice * (1 + (changePercent / 100));
  }

  // Generate random percentage changes
  private generatePercentChange(current: number): number {
    // Keep changes within reasonable bounds
    const maxAdjustment = 0.2; // Max 0.2% adjustment per update
    const adjustment = (Math.random() * maxAdjustment * 2) - maxAdjustment;
    return current + adjustment;
  }

  // Generate random volume change
  private generateVolumeChange(currentVolume: number): number {
    const maxChangePercent = 2; // Maximum 2% change per update
    const changePercent = (Math.random() * maxChangePercent * 2) - maxChangePercent;
    return currentVolume * (1 + (changePercent / 100));
  }

  // Start the socket simulator
  public start(): void {
    if (this.interval !== null) return;
    
    this.interval = setInterval(() => {
      // Get current state
      const { assets } = store.getState().crypto;
      
      // Randomly select 1-3 assets to update
      const numToUpdate = Math.floor(Math.random() * 3) + 1;
      const assetIndices = new Set<number>();
      
      while (assetIndices.size < numToUpdate) {
        assetIndices.add(Math.floor(Math.random() * assets.length));
      }
      
      // Prepare updates
      const updates = Array.from(assetIndices).map(index => {
        const asset = assets[index];
        
        // Generate new values
        const newPrice = this.generatePriceChange(asset.price);
        const priceChange1h = this.generatePercentChange(asset.priceChange1h);
        const priceChange24h = this.generatePercentChange(asset.priceChange24h);
        const priceChange7d = this.generatePercentChange(asset.priceChange7d);
        const volume24h = this.generateVolumeChange(asset.volume24h);
        
        // Update sparkline by removing first value and adding the new price at the end
        const newSparkline = [...asset.sparkline.slice(1), newPrice];
        
        return {
          id: asset.id,
          price: newPrice,
          priceChange1h,
          priceChange24h,
          priceChange7d,
          volume24h,
          sparkline: newSparkline
        };
      });
      
      // Dispatch updates to Redux store
      store.dispatch(updateMultipleAssets(updates));
    }, this.updateFrequency);
  }

  // Stop the socket simulator
  public stop(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export const cryptoSocket = new CryptoSocketSimulator();
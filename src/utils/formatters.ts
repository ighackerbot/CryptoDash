export const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 1000) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }
};

export const formatPercent = (percent: number): string => {
  return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1_000_000_000_000) {
    return `$${(marketCap / 1_000_000_000_000).toFixed(2)}T`;
  } else if (marketCap >= 1_000_000_000) {
    return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
  } else if (marketCap >= 1_000_000) {
    return `$${(marketCap / 1_000_000).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
};

export const formatVolume = (volume: number): string => {
  return formatMarketCap(volume);
};

export const formatSupply = (supply: number): string => {
  if (supply >= 1_000_000_000) {
    return `${(supply / 1_000_000_000).toFixed(2)}B`;
  } else if (supply >= 1_000_000) {
    return `${(supply / 1_000_000).toFixed(2)}M`;
  } else if (supply >= 1_000) {
    return `${(supply / 1_000).toFixed(2)}K`;
  } else {
    return supply.toLocaleString();
  }
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return 'text-green-500';
  if (change < 0) return 'text-red-500';
  return 'text-gray-400';
};

export const getFlashAnimation = (change: number): string => {
  if (change > 0) return 'flash-green';
  if (change < 0) return 'flash-red';
  return '';
};
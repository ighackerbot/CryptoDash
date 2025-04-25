import React from 'react';
import { CryptoAsset } from '../types';
import PriceChange from './PriceChange';
import PriceValue from './PriceValue';
import SparklineChart from './SparklineChart';
import { formatMarketCap, formatVolume, formatSupply } from '../utils/formatters';

interface CryptoRowProps {
  asset: CryptoAsset;
  previousValues?: Partial<CryptoAsset>;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ asset, previousValues }) => {
  return (
    <tr className="hover:bg-gray-800/30 transition-colors duration-200">
      <td className="py-4 px-4 text-center font-medium">{asset.rank}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 p-1">
            <img src={asset.logo} alt={asset.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-gray-400 text-sm">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <PriceValue 
          value={asset.price} 
          previousValue={previousValues?.price}
        />
      </td>
      <td className="py-4 px-4">
        <PriceChange 
          value={asset.priceChange1h} 
          previousValue={previousValues?.priceChange1h}
        />
      </td>
      <td className="py-4 px-4">
        <PriceChange 
          value={asset.priceChange24h} 
          previousValue={previousValues?.priceChange24h}
        />
      </td>
      <td className="py-4 px-4">
        <PriceChange 
          value={asset.priceChange7d} 
          previousValue={previousValues?.priceChange7d}
        />
      </td>
      <td className="py-4 px-4 font-medium">{formatMarketCap(asset.marketCap)}</td>
      <td className="py-4 px-4">{formatVolume(asset.volume24h)}</td>
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span>{formatSupply(asset.circulatingSupply)}</span>
          <span className="text-xs text-gray-400">
            {asset.maxSupply ? `${Math.round((asset.circulatingSupply / asset.maxSupply) * 100)}%` : '∞'}
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        {asset.maxSupply ? formatSupply(asset.maxSupply) : '∞'}
      </td>
      <td className="py-4 px-4">
        <SparklineChart 
          data={asset.sparkline} 
          color={asset.sparkline[asset.sparkline.length - 1] >= asset.sparkline[0] 
            ? '#10B981' 
            : '#EF4444'}
        />
      </td>
    </tr>
  );
};

export default React.memo(CryptoRow);
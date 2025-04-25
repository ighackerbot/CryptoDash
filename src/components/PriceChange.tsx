import React, { useEffect, useState } from 'react';
import { formatPercent, getChangeColor } from '../utils/formatters';

interface PriceChangeProps {
  value: number;
  previousValue?: number;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value, previousValue }) => {
  const [flash, setFlash] = useState<boolean>(false);
  
  useEffect(() => {
    // Only flash when there's a previous value and it changed
    if (previousValue !== undefined && previousValue !== value) {
      setFlash(true);
      const timer = setTimeout(() => {
        setFlash(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);
  
  const colorClass = getChangeColor(value);
  const flashClass = flash ? (value > previousValue! ? 'flash-green' : 'flash-red') : '';
  
  return (
    <span className={`${colorClass} ${flashClass} font-medium transition-colors duration-300`}>
      {formatPercent(value)}
    </span>
  );
};

export default React.memo(PriceChange);
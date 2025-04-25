import React, { useEffect, useState } from 'react';
import { formatPrice } from '../utils/formatters';

interface PriceValueProps {
  value: number;
  previousValue?: number;
}

const PriceValue: React.FC<PriceValueProps> = ({ value, previousValue }) => {
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
  
  const flashClass = flash 
    ? (value > previousValue! ? 'flash-green' : 'flash-red') 
    : '';
  
  return (
    <span className={`font-medium ${flashClass} transition-colors duration-300`}>
      {formatPrice(value)}
    </span>
  );
};

export default React.memo(PriceValue);
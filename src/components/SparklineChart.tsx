import React from 'react';

interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  width = 120,
  height = 40,
  color
}) => {
  // Skip rendering if we don't have enough data points
  if (!data || data.length < 2) {
    return <div className="w-[120px] h-[40px]"></div>;
  }

  // Auto-detect color if not provided
  const lineColor = color || (data[data.length - 1] >= data[0] ? '#10B981' : '#EF4444');
  
  // Find min and max for scaling
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;
  
  // Calculate points
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    // Invert the y value since SVG y-axis is top to bottom
    const y = height - ((value - minValue) / (range || 1)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <polyline
        points={points}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default React.memo(SparklineChart);
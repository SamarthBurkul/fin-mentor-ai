import React from 'react';

interface ChartProps {
  type: 'pie' | 'line' | 'bar';
  data: any;
  title: string;
}

const Chart: React.FC<ChartProps> = ({ type, data, title }) => {
  const renderPieChart = () => {
    const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
    const colors = data.datasets[0].backgroundColor;
    
    return (
      <div className="relative w-80 h-80 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {data.datasets[0].data.map((value: number, index: number) => {
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = index === 0 ? 0 : data.datasets[0].data.slice(0, index).reduce((a: number, b: number) => a + b, 0) / total * 360;
            const endAngle = startAngle + angle;
            
            const x1 = 100 + 70 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 70 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 70 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 100 + 70 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = `M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index]}
                stroke="#0B0F19"
                strokeWidth="2"
                className="transition-all duration-1000 ease-in-out hover:opacity-80 cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-deep-black/80 rounded-full w-24 h-24 flex flex-col items-center justify-center">
            <div className="text-lg font-bold text-neon-blue">Total</div>
            <div className="text-sm text-teal-green font-semibold">₹{(total/100000).toFixed(1)}L</div>
          </div>
        </div>
      </div>
    );
  };

  const renderLineChart = () => {
    const maxValue = Math.max(...data.datasets.flatMap((d: any) => d.data));
    const chartHeight = 120;
    
    return (
      <div className="w-full h-32">
        <svg viewBox="0 0 300 120" className="w-full h-full">
          <defs>
            {data.datasets.map((dataset: any, index: number) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={dataset.borderColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={dataset.borderColor} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          
          {data.datasets.map((dataset: any, datasetIndex: number) => {
            const points = dataset.data.map((value: number, index: number) => {
              const x = (index / (dataset.data.length - 1)) * 280 + 10;
              const y = chartHeight - (value / maxValue) * 100 - 10;
              return `${x},${y}`;
            }).join(' ');
            
            const pathD = `M ${points.split(' ').join(' L ')}`;
            
            return (
              <g key={datasetIndex}>
                <path
                  d={`M ${points.split(' ').join(' L ')} L ${280 + 10},${chartHeight - 10} L 10,${chartHeight - 10} Z`}
                  fill={`url(#gradient-${datasetIndex})`}
                />
                <path
                  d={`M ${points.split(' ').join(' L ')}`}
                  fill="none"
                  stroke={dataset.borderColor}
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderBarChart = () => {
    const maxValue = Math.max(...data.datasets[0].data);
    const barWidth = 400 / data.labels.length - 20;
    const colors = ['#00E5FF', '#00FFC6', '#FACC15', '#EF4444', '#8B5CF6', '#10B981'];
    
    return (
      <div className="w-full h-80">
        <svg viewBox="0 0 500 300" className="w-full h-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(percent => (
            <line key={percent} x1="50" y1={250 - (percent * 2)} x2="450" y2={250 - (percent * 2)} stroke="#1E1E22" strokeWidth="1" />
          ))}
          
          {data.datasets[0].data.map((value: number, index: number) => {
            const height = (value / maxValue) * 200;
            const x = index * (barWidth + 20) + 60;
            const y = 250 - height;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  fill={colors[index % colors.length]}
                  className="transition-all duration-1000 ease-in-out hover:opacity-80 cursor-pointer"
                  rx="4"
                />
                <text x={x + barWidth/2} y={y - 10} textAnchor="middle" fill="#F9FAFB" fontSize="12" className="font-roboto">
                  ₹{(value/1000).toFixed(0)}K
                </text>
                <text x={x + barWidth/2} y={270} textAnchor="middle" fill="#9CA3AF" fontSize="10" className="font-roboto">
                  {data.labels[index]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="fintech-card p-6">
      <h4 className="text-xl font-bold text-main-white mb-6 text-center font-poppins">{title}</h4>
      
      {type === 'pie' && renderPieChart()}
      {type === 'line' && renderLineChart()}
      {type === 'bar' && renderBarChart()}
      
      {data.labels && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="flex items-center space-x-1 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] || data.datasets[0].borderColor }}
              ></div>
              <span className="text-subtext-gray">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chart;
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

// 定义图表数据项的接口
interface ChartDataItem {
  name: string;
  amount: number;
  color: string;
}

interface CostPieChartProps {
  data: ChartDataItem[];
  totalAmount: number;
}

const CostPieChart: React.FC<CostPieChartProps> = ({ data, totalAmount }) => {
  const { t } = useTranslation();

  // 预定义的颜色数组
  const COLORS = [
    '#4ade80', '#60a5fa', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'
  ];

  // 自定义工具提示
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.amount / totalAmount) * 100).toFixed(1);
      
      return (
        <div className="custom-tooltip">
          <p className="label">{data.name}</p>
          <p className="amount">{`${t('currency')}${data.amount.toLocaleString()}`}</p>
          <p className="percentage">{`${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // 自定义图例
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="custom-legend">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="legend-text">{entry.value}</span>
            <span className="legend-amount">
              {t('currency')}{data[index]?.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{t('costProportion')}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => {
              if (!name || percent === undefined || percent === null) return '';
              return `${name} ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="chart-summary">
        <div className="summary-item">
          <span className="label">{t('totalAmount')}:</span>
          <span className="value">{t('currency')}{totalAmount.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="label">{t('averageCost')}:</span>
          <span className="value">
            {t('currency')}{(totalAmount / data.length).toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CostPieChart;

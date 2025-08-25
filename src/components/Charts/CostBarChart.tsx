import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { useTranslation } from 'react-i18next';

// 定义图表数据项的接口
interface ChartDataItem {
  name: string;
  amount: number;
  color: string;
}

interface CostBarChartProps {
  data: ChartDataItem[];
  totalAmount: number;
}

const CostBarChart: React.FC<CostBarChartProps> = ({ data, totalAmount }) => {
  const { t } = useTranslation();

  // 自定义工具提示
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const amount = payload[0].value;
      const percentage = ((amount / totalAmount) * 100).toFixed(1);
      
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="amount">{`${t('currency')}${amount.toLocaleString()}`}</p>
          <p className="percentage">{`${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // 自定义Y轴标签
  const CustomYAxisLabel = ({ value }: any) => {
    return `${t('currency')}${value.toLocaleString()}`;
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{t('costDistribution')}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255, 255, 255, 0.7)"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.7)"
            tickFormatter={CustomYAxisLabel}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="#4ade80"
            radius={[4, 4, 0, 0]}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="chart-summary">
        <div className="summary-item">
          <span className="label">{t('totalCosts')}:</span>
          <span className="value">{t('currency')}{totalAmount.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="label">{t('costItems')}:</span>
          <span className="value">{data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CostBarChart;

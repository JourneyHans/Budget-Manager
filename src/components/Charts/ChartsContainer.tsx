import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CostBarChart from './CostBarChart';
import CostPieChart from './CostPieChart';
import './Charts.css';

// 定义成本项目的接口
interface CostItem {
  id: number;
  name: string;
  amount: string;
  description: string;
}

interface ChartsContainerProps {
  monthlyCosts: CostItem[];
}

// 图表类型枚举
enum ChartType {
  BAR = 'bar',
  PIE = 'pie'
}

const ChartsContainer: React.FC<ChartsContainerProps> = ({ monthlyCosts }) => {
  const { t } = useTranslation();
  const [activeChart, setActiveChart] = useState<ChartType>(ChartType.BAR);

  // 预定义的颜色数组，确保颜色一致性
  const COLORS = [
    '#4ade80', '#60a5fa', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'
  ];

  // 处理图表数据
  const chartData = useMemo(() => {
    const filteredCosts = monthlyCosts
      .filter(cost => cost.amount && parseFloat(cost.amount) > 0);
    
    return filteredCosts
      .map((cost, index) => ({
        name: cost.name || `${t('costItem')} ${index + 1}`,
        amount: parseFloat(cost.amount),
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.amount - a.amount); // 按金额降序排列
  }, [monthlyCosts, t]);

  // 计算总金额
  const totalAmount = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.amount, 0);
  }, [chartData]);

  // 如果没有数据，显示空状态
  if (chartData.length === 0) {
    return (
      <div className="charts-container">
        <div className="charts-header">
          <h3>{t('costCharts')}</h3>
        </div>
        <div className="no-data-message">
          <p>{t('noCostData')}</p>
          <p>{t('addCostsToViewCharts')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h3>{t('costCharts')}</h3>
        <div className="chart-tabs">
          <button
            className={`chart-tab ${activeChart === ChartType.BAR ? 'active' : ''}`}
            onClick={() => setActiveChart(ChartType.BAR)}
          >
            {t('barChart')}
          </button>
          <button
            className={`chart-tab ${activeChart === ChartType.PIE ? 'active' : ''}`}
            onClick={() => setActiveChart(ChartType.PIE)}
          >
            {t('pieChart')}
          </button>
        </div>
      </div>

      <div className="chart-content">
        {activeChart === ChartType.BAR ? (
          <CostBarChart data={chartData} totalAmount={totalAmount} />
        ) : (
          <CostPieChart data={chartData} totalAmount={totalAmount} />
        )}
      </div>

      <div className="charts-footer">
        <div className="data-summary">
          <div className="summary-stat">
            <span className="stat-label">{t('highestCost')}:</span>
            <span className="stat-value">
              {chartData.length > 0 ? chartData[0].name : '-'}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">{t('lowestCost')}:</span>
            <span className="stat-value">
              {chartData.length > 0 ? chartData[chartData.length - 1].name : '-'}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">{t('costRange')}:</span>
            <span className="stat-value">
              {chartData.length > 0 
                ? `${t('currency')}${(chartData[0].amount - chartData[chartData.length - 1].amount).toLocaleString()}`
                : '-'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsContainer;

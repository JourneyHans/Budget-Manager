import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './BudgetCalculator.css';
import ChartsContainer from './Charts/ChartsContainer';

// 定义成本项目的接口
interface CostItem {
  id: number;
  name: string;
  amount: string;
  description: string;
}

// 定义错误对象的接口
interface Errors {
  [key: string]: string;
}

const BudgetCalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [remainingAmount, setRemainingAmount] = useState<string>('');
  const [monthlyCosts, setMonthlyCosts] = useState<CostItem[]>([
    { id: 1, name: '', amount: '', description: '' }
  ]);
  const [monthsLeft, setMonthsLeft] = useState<number | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  // 实时计算
  useEffect(() => {
    if (remainingAmount && monthlyCosts.some(cost => cost.amount && !errors[`cost_${cost.id}`])) {
      calculateMonths();
    } else {
      setMonthsLeft(null);
    }
  }, [remainingAmount, monthlyCosts, errors]);

  const validateInput = (value: string, field: string): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      return t('inputError');
    }
    return '';
  };

  const handleInputChange = (value: string, field: string): void => {
    const error = validateInput(value, field);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    if (field === 'remainingAmount') {
      setRemainingAmount(value);
    }
  };

  const handleCostChange = (id: number, field: keyof CostItem, value: string): void => {
    setMonthlyCosts(prev => 
      prev.map(cost => 
        cost.id === id ? { ...cost, [field]: value } : cost
      )
    );

    // 验证金额输入
    if (field === 'amount') {
      const error = validateInput(value, `cost_${id}`);
      setErrors(prev => ({
        ...prev,
        [`cost_${id}`]: error
      }));
    }
  };

  const addCostItem = (): void => {
    const newId = Math.max(...monthlyCosts.map(cost => cost.id)) + 1;
    setMonthlyCosts(prev => [
      ...prev,
      { id: newId, name: '', amount: '', description: '' }
    ]);
  };

  const removeCostItem = (id: number): void => {
    if (monthlyCosts.length > 1) {
      setMonthlyCosts(prev => prev.filter(cost => cost.id !== id));
      // 清除相关错误
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`cost_${id}`];
        return newErrors;
      });
    }
  };

  const calculateMonths = (): void => {
    const remaining = parseFloat(remainingAmount);
    const totalMonthly = monthlyCosts
      .filter(cost => cost.amount && !errors[`cost_${cost.id}`])
      .reduce((sum, cost) => sum + parseFloat(cost.amount), 0);
    
    if (remaining <= totalMonthly) {
      setMonthsLeft(0);
    } else {
      const months = remaining / totalMonthly;
      setMonthsLeft(months);
    }
  };

  const handleReset = (): void => {
    setRemainingAmount('');
    setMonthlyCosts([{ id: 1, name: '', amount: '', description: '' }]);
    setMonthsLeft(null);
    setErrors({});
  };

  const toggleLanguage = (): void => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  const formatCurrency = (amount: string): string => {
    return `${t('currency')}${parseFloat(amount).toLocaleString()}`;
  };

  const getTotalMonthlyCost = (): number => {
    return monthlyCosts
      .filter(cost => cost.amount && !errors[`cost_${cost.id}`])
      .reduce((sum, cost) => sum + parseFloat(cost.amount), 0);
  };

  const getResultText = (): string => {
    if (monthsLeft === null) return '';
    
    if (monthsLeft === 0) {
      return t('insufficientFunds');
    }
    
    const wholeMonths = Math.floor(monthsLeft);
    const decimalPart = monthsLeft - wholeMonths;
    
    if (decimalPart === 0) {
      return t('monthsLeft', { months: wholeMonths });
    } else {
      return t('monthsLeftDecimal', { months: monthsLeft.toFixed(1) });
    }
  };

  return (
    <div className="budget-calculator">
      <div className="header">
        <h1>{t('appTitle')}</h1>
        <button 
          className="language-toggle"
          onClick={toggleLanguage}
        >
          {i18n.language === 'zh' ? 'EN' : '中文'}
        </button>
      </div>

      <div className="calculator-container">
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="remainingAmount">{t('remainingAmount')}</label>
            <input
              id="remainingAmount"
              type="number"
              value={remainingAmount}
              onChange={(e) => handleInputChange(e.target.value, 'remainingAmount')}
              placeholder={t('inputPlaceholder')}
              className={errors.remainingAmount ? 'error' : ''}
            />
            {errors.remainingAmount && (
              <span className="error-message">{errors.remainingAmount}</span>
            )}
          </div>

          <div className="costs-section">
            <div className="costs-header">
              <h3>{t('monthlyCosts')}</h3>
              <button 
                className="add-cost-btn"
                onClick={addCostItem}
                type="button"
              >
                + {t('addCost')}
              </button>
            </div>
            
            {monthlyCosts.map((cost, index) => (
              <div key={cost.id} className="cost-item">
                <div className="cost-item-header">
                  <span className="cost-number">{t('costItem')} {index + 1}</span>
                  {monthlyCosts.length > 1 && (
                    <button
                      className="remove-cost-btn"
                      onClick={() => removeCostItem(cost.id)}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div className="cost-inputs">
                  <div className="cost-input-group">
                    <input
                      type="text"
                      value={cost.name}
                      onChange={(e) => handleCostChange(cost.id, 'name', e.target.value)}
                      placeholder={t('costNamePlaceholder')}
                      className="cost-name-input"
                    />
                  </div>
                  
                  <div className="cost-input-group">
                    <input
                      type="number"
                      value={cost.amount}
                      onChange={(e) => handleCostChange(cost.id, 'amount', e.target.value)}
                      placeholder={t('inputPlaceholder')}
                      className={`cost-amount-input ${errors[`cost_${cost.id}`] ? 'error' : ''}`}
                    />
                    {errors[`cost_${cost.id}`] && (
                      <span className="error-message">{errors[`cost_${cost.id}`]}</span>
                    )}
                  </div>
                  
                  <div className="cost-input-group">
                    <input
                      type="text"
                      value={cost.description}
                      onChange={(e) => handleCostChange(cost.id, 'description', e.target.value)}
                      placeholder={t('costDescriptionPlaceholder')}
                      className="cost-description-input"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="total-costs">
              <span className="total-label">{t('totalMonthlyCost')}:</span>
              <span className="total-value">{formatCurrency(getTotalMonthlyCost().toString())}</span>
            </div>
          </div>

          <div className="button-group">
            <button 
              className="reset-btn"
              onClick={handleReset}
            >
              {t('reset')}
            </button>
          </div>
        </div>

        {monthsLeft !== null && (
          <div className="result-section">
            <h2>{t('result')}</h2>
            <div className="result-display">
              <p className="result-text">{getResultText()}</p>
            </div>
            
            <div className="summary">
              <h3>{t('summary')}</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">{t('totalAmount')}</span>
                  <span className="value">{formatCurrency(remainingAmount)}</span>
                </div>
                <div className="summary-item">
                  <span className="label">{t('totalMonthlyExpense')}</span>
                  <span className="value">{formatCurrency(getTotalMonthlyCost().toString())}</span>
                </div>
                <div className="summary-item">
                  <span className="label">{t('survivalTime')}</span>
                  <span className="value">
                    {monthsLeft === 0 ? '0' : monthsLeft.toFixed(1)} 个月
                  </span>
                </div>
              </div>
              
              <div className="costs-breakdown">
                <h4>{t('costsBreakdown')}</h4>
                <div className="costs-list">
                  {monthlyCosts
                    .filter(cost => cost.amount && !errors[`cost_${cost.id}`])
                    .map((cost, index) => (
                      <div key={cost.id} className="cost-breakdown-item">
                        <span className="cost-name">
                          {cost.name || `${t('costItem')} ${index + 1}`}
                        </span>
                        <span className="cost-amount">{formatCurrency(cost.amount)}</span>
                        {cost.description && (
                          <span className="cost-description">{cost.description}</span>
                        )}
                      </div>
                    ))}
                </div>
                             </div>
             </div>
           </div>
         )}

         {/* 图表展示区域 */}
         <ChartsContainer monthlyCosts={monthlyCosts} />
       </div>
     </div>
   );
 };

export default BudgetCalculator;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './BudgetCalculator.css';

const BudgetCalculator = () => {
  const { t, i18n } = useTranslation();
  const [remainingAmount, setRemainingAmount] = useState('');
  const [monthlyCost, setMonthlyCost] = useState('');
  const [monthsLeft, setMonthsLeft] = useState(null);
  const [errors, setErrors] = useState({});

  // 实时计算
  useEffect(() => {
    if (remainingAmount && monthlyCost && !errors.remainingAmount && !errors.monthlyCost) {
      calculateMonths();
    } else {
      setMonthsLeft(null);
    }
  }, [remainingAmount, monthlyCost, errors]);

  const validateInput = (value, field) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      return t('inputError');
    }
    return '';
  };

  const handleInputChange = (value, field) => {
    const error = validateInput(value, field);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    if (field === 'remainingAmount') {
      setRemainingAmount(value);
    } else if (field === 'monthlyCost') {
      setMonthlyCost(value);
    }
  };

  const calculateMonths = () => {
    const remaining = parseFloat(remainingAmount);
    const monthly = parseFloat(monthlyCost);
    
    if (remaining <= monthly) {
      setMonthsLeft(0);
    } else {
      const months = remaining / monthly;
      setMonthsLeft(months);
    }
  };

  const handleReset = () => {
    setRemainingAmount('');
    setMonthlyCost('');
    setMonthsLeft(null);
    setErrors({});
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  const formatCurrency = (amount) => {
    return `${t('currency')}${parseFloat(amount).toLocaleString()}`;
  };

  const getResultText = () => {
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

          <div className="input-group">
            <label htmlFor="monthlyCost">{t('monthlyCost')}</label>
            <input
              id="monthlyCost"
              type="number"
              value={monthlyCost}
              onChange={(e) => handleInputChange(e.target.value, 'monthlyCost')}
              placeholder={t('inputPlaceholder')}
              className={errors.monthlyCost ? 'error' : ''}
            />
            {errors.monthlyCost && (
              <span className="error-message">{errors.monthlyCost}</span>
            )}
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
                  <span className="label">{t('monthlyExpense')}</span>
                  <span className="value">{formatCurrency(monthlyCost)}</span>
                </div>
                <div className="summary-item">
                  <span className="label">{t('survivalTime')}</span>
                  <span className="value">
                    {monthsLeft === 0 ? '0' : monthsLeft.toFixed(1)} 个月
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;


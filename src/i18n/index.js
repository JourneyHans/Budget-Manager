import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      appTitle: '预算管理器',
      remainingAmount: '剩余金额',
      monthlyCost: '每月成本',
      monthlyCosts: '每月成本项目',
      addCost: '添加成本',
      costItem: '成本项目',
      costNamePlaceholder: '成本名称（如：房租、餐饮）',
      costDescriptionPlaceholder: '成本描述（可选）',
      totalMonthlyCost: '总每月成本',
      totalMonthlyExpense: '总月支出',
      costsBreakdown: '成本明细',
      calculate: '计算',
      result: '结果',
      monthsLeft: '您还能坚持 {{months}} 个月',
      monthsLeftDecimal: '您还能坚持 {{months}} 个月',
      insufficientFunds: '资金不足，无法坚持一个月',
      inputPlaceholder: '请输入金额',
      inputError: '请输入有效的金额',
      reset: '重置',
      summary: '预算摘要',
      totalAmount: '总金额',
      monthlyExpense: '月支出',
      survivalTime: '生存时间',
      currency: '¥'
    }
  },
  en: {
    translation: {
      appTitle: 'Budget Manager',
      remainingAmount: 'Remaining Amount',
      monthlyCost: 'Monthly Cost',
      monthlyCosts: 'Monthly Cost Items',
      addCost: 'Add Cost',
      costItem: 'Cost Item',
      costNamePlaceholder: 'Cost name (e.g., Rent, Food)',
      costDescriptionPlaceholder: 'Cost description (optional)',
      totalMonthlyCost: 'Total Monthly Cost',
      totalMonthlyExpense: 'Total Monthly Expense',
      costsBreakdown: 'Costs Breakdown',
      calculate: 'Calculate',
      result: 'Result',
      monthsLeft: 'You can survive for {{months}} months',
      monthsLeftDecimal: 'You can survive for {{months}} months',
      insufficientFunds: 'Insufficient funds to survive one month',
      inputPlaceholder: 'Enter amount',
      inputError: 'Please enter a valid amount',
      reset: 'Reset',
      summary: 'Budget Summary',
      totalAmount: 'Total Amount',
      monthlyExpense: 'Monthly Expense',
      survivalTime: 'Survival Time',
      currency: '$'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // 默认语言为中文
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;


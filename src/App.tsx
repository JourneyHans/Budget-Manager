import React from 'react';
import './i18n';
import BudgetCalculator from './components/BudgetCalculator';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <BudgetCalculator />
    </div>
  );
};

export default App;

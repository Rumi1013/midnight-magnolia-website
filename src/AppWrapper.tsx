import React from 'react';
import App from './App';
import { PerformanceProvider } from './context/PerformanceContext';

const AppWrapper: React.FC = () => {
  return (
    <PerformanceProvider>
      <App />
    </PerformanceProvider>
  );
};

export default AppWrapper;
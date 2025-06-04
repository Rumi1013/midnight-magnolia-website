import React, { useState, useEffect } from 'react';
import './ProgressIndicator.css';

interface ProgressIndicatorProps {
  color?: string;
  thickness?: number;
  showPercentage?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  color = 'var(--accent-color)',
  thickness = 4,
  showPercentage = true
}) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentPercentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      // Determine scroll direction
      if (scrollTop > lastScrollY) {
        setScrollDirection('down');
      } else if (scrollTop < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(scrollTop);
      
      // Only show indicator after scrolling a bit
      setIsVisible(scrollTop > 100);
      setScrollPercentage(currentPercentage);
    };

    // Calculate on mount
    calculateScrollPercentage();

    // Add event listener
    window.addEventListener('scroll', calculateScrollPercentage);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage);
    };
  }, [lastScrollY]);

  // Format percentage as string
  const percentageValue = Math.round(scrollPercentage);

  return (
    <div className={`progress-indicator ${isVisible ? 'visible' : ''} ${scrollDirection === 'up' ? 'emphasized' : ''}`}>
      <div 
        className="progress-bar"
        style={{ 
          width: `${scrollPercentage}%`,
          height: `${thickness}px`,
          backgroundColor: color
        }}
      />
      {showPercentage && (
        <div className="progress-percentage">
          <span>{percentageValue}%</span>
          <span className="visually-hidden">of page scrolled</span>
        </div>
      )}
      
      {/* Hidden description for screen readers */}
      <div className="visually-hidden">
        You are {percentageValue}% through the page
      </div>
    </div>
  );
};

export default ProgressIndicator;
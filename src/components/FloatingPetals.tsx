import React, { useEffect, useRef, useMemo } from 'react';
import './FloatingPetals.css';
import { usePerformance } from '../context/PerformanceContext';

const FloatingPetals: React.FC = () => {
  const petalsRef = useRef<HTMLDivElement>(null);
  
  // Get performance context
  const { allowAnimations, isReducedMotion, isLowPowerMode, isMobile } = usePerformance();
  
  // Determine if we should render the effect
  const shouldRender = allowAnimations && !isReducedMotion;
  
  // Determine how many petals to show based on device performance
  const petalCount = useMemo(() => {
    if (!shouldRender) return 0;
    if (isLowPowerMode) return 2;
    if (isMobile) return 3;
    return 5;
  }, [shouldRender, isLowPowerMode, isMobile]);
  
  useEffect(() => {
    // Skip effect completely if animations are disabled
    if (!shouldRender || !petalsRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-petals');
          } else {
            entry.target.classList.remove('animate-petals');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(petalsRef.current);
    
    return () => {
      if (petalsRef.current) {
        observer.unobserve(petalsRef.current);
      }
    };
  }, [shouldRender]);
  
  // Don't render anything if animations should be disabled
  if (!shouldRender) {
    return null;
  }

  return (
    <div ref={petalsRef} className="petals-container" aria-hidden="true">
      {[...Array(petalCount)].map((_, index) => (
        <div key={index} className={`petal petal-${index + 1}`}></div>
      ))}
    </div>
  );
};

export default FloatingPetals;
import React, { useEffect, useRef } from 'react';
import './FloatingPetals.css';

const FloatingPetals: React.FC = () => {
  const petalsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
    
    if (petalsRef.current) {
      observer.observe(petalsRef.current);
    }
    
    return () => {
      if (petalsRef.current) {
        observer.unobserve(petalsRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={petalsRef} className="petals-container">
      <div className="petal petal-1"></div>
      <div className="petal petal-2"></div>
      <div className="petal petal-3"></div>
      <div className="petal petal-4"></div>
      <div className="petal petal-5"></div>
    </div>
  );
};

export default FloatingPetals;
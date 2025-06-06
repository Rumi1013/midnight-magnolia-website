import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Extend Navigator interface to include deviceMemory
declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

interface PerformanceContextType {
  allowAnimations: boolean;
  isReducedMotion: boolean;
  isLowPowerMode: boolean;
  isMobile: boolean;
}

const defaultPerformanceContext: PerformanceContextType = {
  allowAnimations: true,
  isReducedMotion: false,
  isLowPowerMode: false,
  isMobile: false
};

export const PerformanceContext = createContext<PerformanceContextType>(defaultPerformanceContext);

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const [performanceState, setPerformanceState] = useState<PerformanceContextType>({
    allowAnimations: true,
    isReducedMotion: false,
    isLowPowerMode: false,
    isMobile: false
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if device is mobile
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    // Detect low power mode (basic approximation)
    const isLowPower = isMobileDevice && (navigator.deviceMemory !== undefined) && navigator.deviceMemory < 4;
    
    // Update state
    setPerformanceState({
      allowAnimations: !prefersReducedMotion && !isLowPower,
      isReducedMotion: prefersReducedMotion,
      isLowPowerMode: isLowPower,
      isMobile: isMobileDevice
    });
    
    // Event listener for reduced motion changes
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setPerformanceState(prev => ({
        ...prev,
        isReducedMotion: e.matches,
        allowAnimations: !e.matches && !prev.isLowPowerMode
      }));
    };
    
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleMotionPreferenceChange);
    } else {
      // For older browsers
      mediaQueryList.addListener(handleMotionPreferenceChange);
    }
    
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleMotionPreferenceChange);
      } else {
        // For older browsers
        mediaQueryList.removeListener(handleMotionPreferenceChange);
      }
    };
  }, []);

  return (
    <PerformanceContext.Provider value={performanceState}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Custom hook for using the performance context
export const usePerformance = () => useContext(PerformanceContext);
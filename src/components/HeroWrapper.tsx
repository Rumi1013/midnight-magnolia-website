import React from 'react';
import Hero from './Hero';

interface HeroWrapperProps {
  onNavigate: (section: string) => void;
}

const HeroWrapper: React.FC<HeroWrapperProps> = ({ onNavigate }) => {
  return <Hero onNavigate={onNavigate} />;
};

export default HeroWrapper;

import React, { ReactNode } from 'react'
import './MagicUI.css'

interface AnimatedCardProps {
  children: ReactNode
  variant?: 'default' | 'glow' | 'float' | 'tilt'
  glowColor?: string
  delay?: number
  className?: string
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  variant = 'default',
  glowColor = 'var(--accent-primary)',
  delay = 0,
  className = ''
}) => {
  const cardClasses = [
    'magic-card',
    `magic-card--${variant}`,
    className
  ].join(' ')

  return (
    <div 
      className={cardClasses}
      data-glow-color={glowColor}
      data-animation-delay={delay}
    >
      <div className="magic-card__border"></div>
      <div className="magic-card__content">
        {children}
      </div>
      <div className="magic-card__glow"></div>
    </div>
  )
}

export default AnimatedCard 
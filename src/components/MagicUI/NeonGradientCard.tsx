import React, { useRef, useEffect } from 'react'
import './MagicUI.css'

interface NeonGradientCardProps {
  children: React.ReactNode
  className?: string
  borderSize?: number
  borderRadius?: number
  neonColors?: {
    firstColor: string
    secondColor: string
  }
}

const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  children,
  className = '',
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: 'var(--accent-primary)',
    secondColor: 'var(--lavender-mist)'
  }
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--border-size', `${borderSize}px`)
      cardRef.current.style.setProperty('--border-radius', `${borderRadius}px`)
      cardRef.current.style.setProperty('--first-color', neonColors.firstColor)
      cardRef.current.style.setProperty('--second-color', neonColors.secondColor)
    }
  }, [borderSize, borderRadius, neonColors])

  return (
    <div 
      ref={cardRef}
      className={`neon-gradient-card ${className}`}
    >
      <div className="neon-gradient-card__content">
        {children}
      </div>
    </div>
  )
}

export default NeonGradientCard 
import React, { useEffect, useState, useRef } from 'react'
import './MagicUI.css'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

interface SparklesTextProps {
  text: string
  className?: string
  sparkleColor?: string
  sparkleCount?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

const SparklesText: React.FC<SparklesTextProps> = ({
  text,
  className = '',
  sparkleColor = 'var(--contrast-gold)',
  sparkleCount = 8,
  size = 'md',
  as: Component = 'span'
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const containerRef = useRef<any>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--sparkle-color', sparkleColor)
    }
  }, [sparkleColor])

  useEffect(() => {
    if (containerRef.current) {
      const sparkleElements = containerRef.current.querySelectorAll('.sparkles-text__sparkle')
      sparkleElements.forEach((element: Element, index: number) => {
        const sparkle = sparkles[index]
        if (sparkle && element instanceof HTMLElement) {
          element.style.setProperty('--sparkle-x', `${sparkle.x}%`)
          element.style.setProperty('--sparkle-y', `${sparkle.y}%`)
          element.style.setProperty('--sparkle-size', `${sparkle.size}px`)
          element.style.setProperty('--sparkle-delay', `${sparkle.delay}s`)
          element.style.setProperty('--sparkle-duration', `${sparkle.duration}s`)
        }
      })
    }
  }, [sparkles])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = []
      for (let i = 0; i < sparkleCount; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          delay: Math.random() * 2,
          duration: Math.random() * 1.5 + 1
        })
      }
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 3000)
    
    return () => clearInterval(interval)
  }, [sparkleCount])

  return (
    <Component 
      ref={containerRef}
      className={`sparkles-text sparkles-text--${size} ${className}`}
    >
      <span className="sparkles-text__content">
        {text}
      </span>
      <span className="sparkles-text__sparkles">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkles-text__sparkle"
          >
            ✨
          </span>
        ))}
      </span>
    </Component>
  )
}

export default SparklesText 
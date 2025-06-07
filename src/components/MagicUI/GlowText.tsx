import React, { useEffect, useState, useRef } from 'react'
import './MagicUI.css'

interface GlowTextProps {
  text: string
  variant?: 'glow' | 'gradient' | 'shimmer' | 'typing'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  colors?: string[]
  speed?: 'slow' | 'medium' | 'fast'
  delay?: number
  className?: string
}

const GlowText: React.FC<GlowTextProps> = ({
  text,
  variant = 'glow',
  size = 'md',
  colors = ['var(--accent-primary)', 'var(--accent-secondary)'],
  speed = 'medium',
  delay = 0,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.setProperty('--gradient-color-1', colors[0])
      textRef.current.style.setProperty('--gradient-color-2', colors[1] || colors[0])
      textRef.current.style.setProperty('--animation-delay', `${delay}ms`)
    }
  }, [colors, delay])

  useEffect(() => {
    if (variant === 'typing') {
      const timer = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      }, delay + (currentIndex * (speed === 'fast' ? 50 : speed === 'medium' ? 100 : 150)))

      return () => clearTimeout(timer)
    } else {
      setDisplayText(text)
    }
  }, [currentIndex, text, variant, speed, delay])

  const textClasses = [
    'magic-text',
    `magic-text--${variant}`,
    `magic-text--${size}`,
    `magic-text--${speed}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <span 
      ref={textRef}
      className={textClasses}
    >
      {variant === 'typing' ? (
        <>
          {displayText}
          {currentIndex < text.length && <span className="magic-text__cursor">|</span>}
        </>
      ) : (
        <>
          <span className="magic-text__content">{text}</span>
          {variant === 'shimmer' && <span className="magic-text__shimmer"></span>}
        </>
      )}
    </span>
  )
}

export default GlowText 
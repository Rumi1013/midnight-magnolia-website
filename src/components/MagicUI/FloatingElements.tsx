import React, { useEffect, useRef } from 'react'
import './MagicUI.css'

interface FloatingElement {
  id: number
  type: 'firefly' | 'petal' | 'star' | 'orb'
  delay: number
}

interface FloatingElementsProps {
  type?: 'firefly' | 'petal' | 'star' | 'orb'
  count?: number
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  type = 'firefly',
  count = 6
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      type,
      delay: Math.random() * 3000
    }))

    elements.forEach((element, index) => {
      const elementDiv = containerRef.current?.children[index] as HTMLElement
      if (elementDiv) {
        elementDiv.style.setProperty('--floating-x', `${Math.random() * 100}vw`)
        elementDiv.style.setProperty('--floating-y', `${Math.random() * 100}vh`)
        elementDiv.style.setProperty('--floating-delay', `${element.delay}ms`)
        elementDiv.style.setProperty('--floating-duration', `${8000 + Math.random() * 4000}ms`)
      }
    })
  }, [count, type])

  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    type,
    delay: Math.random() * 3000,
  }))

  return (
    <div ref={containerRef} className="floating-container">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`floating-element floating-${element.type}`}
        />
      ))}
    </div>
  )
}

export default FloatingElements 
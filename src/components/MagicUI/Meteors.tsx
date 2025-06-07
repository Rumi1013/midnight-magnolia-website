import React, { useEffect, useState, useRef } from 'react'
import './MagicUI.css'

interface Meteor {
  id: number
  left: number
  animationDelay: number
  animationDuration: number
}

interface MeteorsProps {
  number?: number
  className?: string
}

const Meteors: React.FC<MeteorsProps> = ({ 
  number = 20, 
  className = ''
}) => {
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newMeteors: Meteor[] = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * (400 - -400) + -400),
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2,
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2),
    }))
    setMeteors(newMeteors)
  }, [number])

  useEffect(() => {
    if (containerRef.current) {
      const meteorElements = containerRef.current.querySelectorAll('.meteor')
      meteorElements.forEach((element, index) => {
        const meteor = meteors[index]
        if (meteor && element instanceof HTMLElement) {
          element.style.setProperty('--meteor-left', `${meteor.left}px`)
          element.style.setProperty('--meteor-delay', `${meteor.animationDelay}s`)
          element.style.setProperty('--meteor-duration', `${meteor.animationDuration}s`)
        }
      })
    }
  }, [meteors])

  return (
    <div ref={containerRef} className={`meteors-container ${className}`}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="meteor"
        />
      ))}
    </div>
  )
}

export default Meteors 
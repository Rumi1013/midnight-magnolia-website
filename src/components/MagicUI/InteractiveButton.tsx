import React, { useRef, useState, MouseEvent, useEffect } from 'react'
import './MagicUI.css'

interface InteractiveButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'magic'
  size?: 'sm' | 'md' | 'lg'
  ripple?: boolean
  magnetic?: boolean
  glow?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ripple = true,
  magnetic = true,
  glow = false,
  onClick,
  className = '',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (buttonRef.current) {
      const rippleElements = buttonRef.current.querySelectorAll('.magic-button__ripple')
      rippleElements.forEach((element, index) => {
        const ripple = ripples[index]
        if (ripple && element instanceof HTMLElement) {
          element.style.setProperty('--ripple-x', `${ripple.x}px`)
          element.style.setProperty('--ripple-y', `${ripple.y}px`)
        }
      })
    }
  }, [ripples])

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    buttonRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current || disabled) return
    buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)'
  }

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ripple || !buttonRef.current || disabled) return

    setIsPressed(true)
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1000)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const buttonClasses = [
    'magic-button',
    `magic-button--${variant}`,
    `magic-button--${size}`,
    glow ? 'magic-button--glow' : '',
    disabled ? 'magic-button--disabled' : '',
    isPressed ? 'magic-button--pressed' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="magic-button__content">
        {children}
      </span>
      
      {ripple && (
        <div className="magic-button__ripples">
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="magic-button__ripple"
            />
          ))}
        </div>
      )}
      
      {glow && <div className="magic-button__glow" />}
      
      <div className="magic-button__shine" />
    </button>
  )
}

export default InteractiveButton 
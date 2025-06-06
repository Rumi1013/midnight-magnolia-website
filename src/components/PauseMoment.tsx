import React, { useState, useEffect } from 'react';
import './PauseMoment.css';

interface PauseMomentProps {
  onToggle?: (isPaused: boolean) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  keyboardShortcut?: string;
}

/**
 * PauseMoment component provides an accessible way for users (especially those with ADHD)
 * to pause animations and movements on the page to reduce cognitive overload.
 */
const PauseMoment: React.FC<PauseMomentProps> = ({
  onToggle,
  position = 'bottom-right',
  keyboardShortcut = 'p'
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show component after a delay to avoid immediate visual noise
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Add class to body for global pause styling
    if (isPaused) {
      document.body.classList.add('paused-animations');
    } else {
      document.body.classList.remove('paused-animations');
    }

    // Set up keyboard shortcut
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === keyboardShortcut.toLowerCase() && 
          !(['input', 'textarea'].includes((event.target as HTMLElement)?.tagName?.toLowerCase() || ''))) {
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPaused, keyboardShortcut, onToggle]);

  const togglePause = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    
    if (onToggle) {
      onToggle(newPausedState);
    }
  };

  // Render different buttons based on state to avoid dynamic ARIA attributes
  const renderButton = () => {
    if (isPaused) {
      return (
        <button
          className="pause-button paused"
          onClick={togglePause}
          aria-pressed="true"
          aria-label="Resume animations"
        >
          <div className="pause-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <span className="pause-label">Resume</span>
          <span className="pause-shortcut" aria-hidden="true">
            Press '{keyboardShortcut}'
          </span>
        </button>
      );
    } else {
      return (
        <button
          className="pause-button"
          onClick={togglePause}
          aria-pressed="false"
          aria-label="Pause animations"
        >
          <div className="pause-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
          <span className="pause-label">Pause</span>
          <span className="pause-shortcut" aria-hidden="true">
            Press '{keyboardShortcut}'
          </span>
        </button>
      );
    }
  };

  return (
    <div className={`pause-moment ${position} ${isVisible ? 'visible' : ''}`}>
      {renderButton()}
      {isPaused && (
        <div className="pause-message" role="status">
          <div className="pause-message-inner">
            <h2>Taking a moment</h2>
            <p>All animations are paused. Press the button or '{keyboardShortcut}' to resume.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PauseMoment;
import React from 'react';
import './SkipNavigation.css';

interface SkipNavigationProps {
  mainContentId?: string;
}

/**
 * SkipNavigation component provides a "Skip to Content" link for keyboard users
 * to bypass navigation and go directly to the main content.
 * This improves accessibility for keyboard and screen reader users.
 */
const SkipNavigation: React.FC<SkipNavigationProps> = ({
  mainContentId = 'main-content'
}) => {
  return (
    <a 
      href={`#${mainContentId}`} 
      className="skip-navigation"
    >
      Skip to main content
    </a>
  );
};

export default SkipNavigation;
# Midnight Magnolia Website Enhancement Plan - Phases 2 & 3

This document outlines the detailed implementation plans for Phases 2 and 3 of the Midnight Magnolia website enhancements, building upon the core experience improvements established in Phase 1.

## Phase 2: Technical Enhancements

### 1. Performance Optimization

#### Image Optimization & Lazy Loading

**Implementation Approach:**
- Implement lazy loading for images using Intersection Observer
- Optimize image assets with appropriate formats and compression
- Implement responsive image handling

**Code Example:**
```jsx
// Create a new component: src/components/LazyImage.tsx
import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = '#0A192F' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      className={`lazy-image-container ${className}`}
      style={{ 
        backgroundColor: placeholderColor,
        position: 'relative',
        overflow: 'hidden',
        height: 0,
        paddingBottom: '56.25%', // 16:9 aspect ratio by default
      }}
    >
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
```

**Implementation Steps:**
1. Create the LazyImage component
2. Replace standard img tags with LazyImage component
3. Add WebP format support with fallbacks
4. Optimize image sizes with responsive breakpoints

#### Code Splitting & Bundle Optimization

**Implementation Approach:**
- Implement React.lazy and Suspense for component-level code splitting
- Add dynamic imports for larger sections of the application
- Configure Vite for optimal chunk sizing

**Code Example:**
```jsx
// Modify App.tsx to use code splitting
import React, { lazy, Suspense } from 'react';
import './App.css';

// Regular imports for frequently used components
import Header from './components/Header';

// Lazy load less frequently used sections
const Home = lazy(() => import('./sections/Home'));
const About = lazy(() => import('./sections/About'));
const Services = lazy(() => import('./sections/Services'));
const Contact = lazy(() => import('./sections/Contact'));
const TarotDeck = lazy(() => import('./sections/TarotDeck'));
const ArtGallery = lazy(() => import('./sections/ArtGallery'));
const Blog = lazy(() => import('./sections/Blog'));
const Community = lazy(() => import('./sections/Community'));

// Loading component
const SectionLoader = () => (
  <div className="section-loader">
    <div className="loader-animation">
      <div className="moon-loader"></div>
    </div>
    <p>Manifesting your content...</p>
  </div>
);

function App() {
  // ... existing state management

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <Suspense fallback={<SectionLoader />}>
            <Home />
          </Suspense>
        );
      case 'about':
        return (
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        );
      // ... other sections
      default:
        return (
          <Suspense fallback={<SectionLoader />}>
            <Home />
          </Suspense>
        );
    }
  };

  // ... rest of component
}
```

**Implementation Steps:**
1. Restructure the application to separate section components
2. Implement lazy loading with Suspense
3. Create a visually appealing loading component
4. Test bundle sizes and load times

#### GPU-Accelerated Animations

**Implementation Approach:**
- Optimize animations to use transform and opacity for GPU acceleration
- Implement will-change property for complex animations
- Use composite properties for smooth animations

**Code Example:**
```css
/* Add to src/App.css */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .animation-sensitive {
    animation: none !important;
    transition: none !important;
  }
}

.transform-scale {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.transform-scale:hover {
  transform: scale(1.05);
}
```

**Implementation Steps:**
1. Audit existing animations for performance
2. Apply GPU acceleration classes to animated elements
3. Add prefers-reduced-motion support for accessibility
4. Test on various devices for smoothness

### 2. Integration Completion

#### Shopify Product Integration

**Implementation Approach:**
- Implement Shopify Storefront API client
- Create product components and cart functionality
- Integrate with existing design language

**Code Example:**
```jsx
// Create a new file: src/lib/shopify.ts
import { shopifyConfig } from './integrations';

export async function fetchProducts() {
  const { domain, storefrontAccessToken } = shopifyConfig;
  
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await fetch(
      `https://${domain}/api/2023-07/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: JSON.stringify({ query }),
      }
    );
    
    const { data } = await response.json();
    return data.products.edges.map(({ node }) => node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Additional functions for cart management, checkout, etc.
```

**Implementation Steps:**
1. Create Shopify API integration functions
2. Build product display components
3. Implement shopping cart functionality
4. Style to match Midnight Magnolia aesthetic

#### Patreon Membership Integration

**Implementation Approach:**
- Implement Patreon API integration
- Create membership tier components
- Add member-only content protection

**Code Example:**
```jsx
// Create a new file: src/lib/patreon.ts
import { patreonConfig } from './integrations';

export async function fetchPatreonTiers() {
  const { clientId, accessToken } = patreonConfig;
  
  try {
    const response = await fetch(
      'https://www.patreon.com/api/oauth2/v2/campaigns?include=tiers&fields[tier]=title,description,amount_cents,published,discord_role_ids,title_for_patrons,published,description_for_patrons,patron_count,url,image_url',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const data = await response.json();
    return data.included.filter(item => item.type === 'tier');
  } catch (error) {
    console.error('Error fetching Patreon tiers:', error);
    return [];
  }
}

// Functions for checking member status, etc.
```

**Implementation Steps:**
1. Create Patreon API integration functions
2. Build membership tier display components
3. Implement member login/authentication
4. Create protected content areas

#### Newsletter & Contact Integration

**Implementation Approach:**
- Implement email service integration (e.g., Mailchimp)
- Create contact form with validation
- Add subscription management

**Code Example:**
```jsx
// Create a new component: src/components/NewsletterSignup.tsx
import React, { useState } from 'react';
import './NewsletterSignup.css';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    setLoading(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="newsletter-container">
      <h3 className="newsletter-title">🌙 Join the Midnight Circle</h3>
      <p className="newsletter-description">
        Receive moon phase guidance, healing resources, and exclusive offers.
      </p>
      
      {status === 'success' ? (
        <div className="newsletter-success">
          <div className="success-icon">✨</div>
          <p>{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="form-group">
            <label htmlFor="name">Name (optional)</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="form-input"
              required
            />
          </div>
          
          {status === 'error' && (
            <div className="newsletter-error">{message}</div>
          )}
          
          <button
            type="submit"
            className="newsletter-submit gentle-button"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Subscribe'}
          </button>
          
          <p className="newsletter-privacy">
            Your information will be treated with care and reverence. 
            Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
```

**Implementation Steps:**
1. Create newsletter signup component
2. Implement contact form with validation
3. Set up serverless functions for form handling
4. Add success/error handling and feedback

### 3. Mobile Experience Refinement

#### Touch Interaction Optimization

**Implementation Approach:**
- Enhance touch targets for better mobile usability
- Implement swipe gestures for gallery and carousel components
- Optimize hover states for touch devices

**Code Example:**
```css
/* Add to src/index.css */
@media (hover: hover) {
  /* Only apply hover effects on devices that support hover */
  .hover-effect:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
}

/* Larger touch targets for mobile */
@media (max-width: 768px) {
  .nav-link {
    padding: 12px 16px;
  }
  
  .gentle-button, .gentle-cta {
    padding: 14px 20px;
    min-height: 44px;
  }
  
  .form-input {
    padding: 12px;
    height: 50px;
  }
}
```

**Implementation Steps:**
1. Audit all interactive elements for touch accessibility
2. Implement swipe detection for galleries
3. Optimize tap targets for minimum 44x44px
4. Test on various mobile devices

#### Responsive Layout Improvements

**Implementation Approach:**
- Refine layout breakpoints for optimal viewing on all devices
- Implement fluid typography for better readability
- Optimize spacing for mobile viewing

**Code Example:**
```css
/* Add to src/index.css */
:root {
  /* Fluid typography */
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
  --font-size-lg: clamp(1.2rem, 1.14rem + 0.3vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 1.38rem + 0.6vw, 2.1rem);
  --font-size-xxl: clamp(2rem, 1.8rem + 1vw, 3rem);
  
  /* Fluid spacing */
  --space-xs: clamp(0.5rem, 0.48rem + 0.1vw, 0.6rem);
  --space-sm: clamp(0.75rem, 0.7rem + 0.25vw, 1rem);
  --space-md: clamp(1.25rem, 1.15rem + 0.5vw, 1.75rem);
  --space-lg: clamp(2rem, 1.8rem + 1vw, 3rem);
  --space-xl: clamp(3rem, 2.7rem + 1.5vw, 4.5rem);
}

body {
  font-size: var(--font-size-base);
}

h1 {
  font-size: var(--font-size-xxl);
}

h2 {
  font-size: var(--font-size-xl);
}

h3 {
  font-size: var(--font-size-lg);
}

.content-container {
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
}
```

**Implementation Steps:**
1. Implement fluid typography and spacing system
2. Test on various screen sizes and orientations
3. Optimize image display for mobile
4. Add device-specific enhancements for iOS and Android

#### Offline Capability

**Implementation Approach:**
- Implement service worker for offline access
- Cache critical assets and content
- Add offline indicator and messaging

**Code Example:**
```jsx
// Create a new file: src/service-worker.ts
/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all assets generated by your build process
precacheAndRoute(self.__WB_MANIFEST);

// Cache the index page for single-page applications
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL('/index.html')
);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'midnight-magnolia-images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache API responses
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'midnight-magnolia-api',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 1 * 24 * 60 * 60, // 1 day
      }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

**Implementation Steps:**
1. Set up service worker with workbox
2. Configure caching strategies for different asset types
3. Add offline page and fallback content
4. Implement update notification mechanism

## Phase 3: Content & Community Features

### 1. Interactive Tarot Experience

#### Tarot Card Component

**Implementation Approach:**
- Create interactive card components with flip animations
- Implement card drawing mechanism
- Add interpretation display with affirmations

**Code Example:**
```jsx
// Create a new component: src/components/TarotCard.tsx
import React, { useState } from 'react';
import './TarotCard.css';

interface TarotCardProps {
  card: {
    id: string;
    name: string;
    persona: string;
    image: string;
    affirmation: string;
    prompt: string;
    description: string;
  };
  isRevealed: boolean;
  onReveal: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, isRevealed, onReveal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    if (!isRevealed) {
      onReveal();
    }
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div 
      className={`tarot-card ${isRevealed ? 'revealed' : 'hidden'} ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="tarot-card-inner">
        <div className="tarot-card-front">
          <img 
            src={isRevealed ? card.image : '/images/gallery/tarot-symbol.png'} 
            alt={isRevealed ? card.name : 'Card back'} 
            className="tarot-card-image"
          />
          {isRevealed && (
            <div className="tarot-card-title">
              <h3>{card.name}</h3>
              <p>{card.persona}</p>
            </div>
          )}
        </div>
        <div className="tarot-card-back">
          <h3 className="tarot-card-name">{card.name}</h3>
          <p className="tarot-card-persona">{card.persona}</p>
          <div className="tarot-card-content">
            <p className="tarot-card-affirmation">{card.affirmation}</p>
            <p className="tarot-card-description">{card.description}</p>
            <div className="tarot-card-prompt">
              <h4>Journal Prompt</h4>
              <p>{card.prompt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
```

```css
/* Create a new file: src/components/TarotCard.css */
.tarot-card {
  width: 250px;
  height: 400px;
  perspective: 1000px;
  margin: 1rem;
  cursor: pointer;
  position: relative;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.tarot-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.tarot-card.hidden {
  opacity: 0.7;
}

.tarot-card.revealed {
  opacity: 1;
}

.tarot-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
}

.tarot-card.flipped .tarot-card-inner {
  transform: rotateY(180deg);
}

.tarot-card-front, .tarot-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
}

.tarot-card-front {
  background: linear-gradient(135deg, var(--deep-night), var(--midnight-blue));
  border: 2px solid var(--warm-gold);
}

.tarot-card-back {
  background: linear-gradient(135deg, var(--midnight-blue), var(--deep-night));
  transform: rotateY(180deg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid var(--warm-gold);
}

.tarot-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tarot-card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.75rem;
  color: var(--warm-gold);
}

.tarot-card-name {
  color: var(--warm-gold);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.tarot-card-persona {
  color: var(--gentle-cream);
  font-style: italic;
  margin-bottom: 1rem;
}

.tarot-card-affirmation {
  font-style: italic;
  color: var(--warm-gold);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.4;
}

.tarot-card-description {
  color: var(--gentle-cream);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.tarot-card-prompt {
  background: rgba(10, 25, 47, 0.5);
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: auto;
}

.tarot-card-prompt h4 {
  color: var(--warm-gold);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.tarot-card-prompt p {
  color: var(--gentle-cream);
  font-size: 0.8rem;
  line-height: 1.4;
}
```

**Implementation Steps:**
1. Create TarotCard component with flip animation
2. Design card back and front templates
3. Implement card drawing mechanism
4. Create interpretation display with affirmations

#### Tarot Reading Experience

**Implementation Approach:**
- Create a complete tarot reading experience
- Implement card shuffling and selection animations
- Add meaning interpretations and journaling prompts

**Code Example:**
```jsx
// Create a new component: src/components/TarotReading.tsx
import React, { useState, useEffect } from 'react';
import TarotCard from './TarotCard';
import './TarotReading.css';

// Sample data - would come from API or data file
const tarotDeck = [
  {
    id: 'high-priestess',
    name: 'The High Priestess',
    persona: 'Audre Lorde',
    image: '/images/gallery/tarot-symbol.png',
    affirmation: 'I honor my intuition as the voice of ancestral wisdom.',
    prompt: 'What secrets is your intuition whispering that your logical mind is ignoring?',
    description: 'The High Priestess represents intuition, sacred knowledge, and divine feminine energy. She sits between the conscious and unconscious mind, inviting you to listen to your inner voice.'
  },
  {
    id: 'star',
    name: 'The Star',
    persona: 'Nina Simone',
    image: '/images/gallery/stars-glyph.png',
    affirmation: 'My light shines as a beacon of hope and inspiration.',
    prompt: 'How can you become a guiding star for others while staying true to your own path?',
    description: 'The Star brings hope, inspiration, and serenity. After difficult times, this card appears to remind you that the universe supports your highest good and that healing is possible.'
  },
  // More cards...
];

interface ReadingType {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  theme: string;
}

const readingTypes: ReadingType[] = [
  {
    id: 'single',
    name: 'Single Card',
    description: 'A focused insight for your day or a specific question.',
    cardCount: 1,
    theme: 'daily'
  },
  {
    id: 'past-present-future',
    name: 'Past, Present, Future',
    description: 'Understand your journey and where you're headed.',
    cardCount: 3,
    theme: 'timeline'
  },
  {
    id: 'five-card-cross',
    name: 'Five Card Cross',
    description: 'A deeper exploration of a specific situation.',
    cardCount: 5,
    theme: 'situation'
  }
];

const TarotReading: React.FC = () => {
  const [selectedReadingType, setSelectedReadingType] = useState<string | null>(null);
  const [readingCards, setReadingCards] = useState<any[]>([]);
  const [revealedCards, setRevealedCards] = useState<string[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  
  const shuffleCards = () => {
    setIsShuffling(true);
    
    // Find the selected reading type
    const reading = readingTypes.find(type => type.id === selectedReadingType);
    if (!reading) return;
    
    // Shuffle the deck and select cards
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const selectedCards = shuffled.slice(0, reading.cardCount);
    
    // Reset revealed cards
    setRevealedCards([]);
    
    // Animate shuffling
    setTimeout(() => {
      setReadingCards(selectedCards);
      setIsShuffling(false);
    }, 1500);
  };
  
  const handleRevealCard = (cardId: string) => {
    setRevealedCards(prev => [...prev, cardId]);
  };
  
  return (
    <div className="tarot-reading-container">
      <h2 className="reading-title">🔮 Southern Oracle Reading</h2>
      
      {!selectedReadingType ? (
        <div className="reading-selection">
          <p className="reading-intro">
            Select a reading type to begin your journey with the Southern Oracle Tarot.
            Each reading offers different insights and guidance.
          </p>
          
          <div className="reading-types">
            {readingTypes.map(type => (
              <div 
                key={type.id} 
                className="reading-type-card"
                onClick={() => setSelectedReadingType(type.id)}
              >
                <h3>{type.name}</h3>
                <p>{type.description}</p>
                <span className="card-count">{type.cardCount} card{type.cardCount > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="active-reading">
          <div className="reading-header">
            <h3>{readingTypes.find(type => type.id === selectedReadingType)?.name}</h3>
            {readingCards.length === 0 ? (
              <button 
                className="gentle-button shuffle-button"
                onClick={shuffleCards}
              >
                Shuffle & Draw Cards
              </button>
            ) : (
              <button 
                className="gentle-cta new-reading-button"
                onClick={() => {
                  setSelectedReadingType(null);
                  setReadingCards([]);
                }}
              >
                New Reading
              </button>
            )}
          </div>
          
          {isShuffling ? (
            <div className="shuffling-animation">
              <div className="shuffling-card"></div>
              <div className="shuffling-card"></div>
              <div className="shuffling-card"></div>
              <p>Connecting with the ancestral wisdom...</p>
            </div>
          ) : (
            <div className="cards-container">
              {readingCards.map((card, index) => (
                <div key={card.id} className="card-position">
                  <TarotCard 
                    card={card}
                    isRevealed={revealedCards.includes(card.id)}
                    onReveal={() => handleRevealCard(card.id)}
                  />
                  <div className="card-position-label">
                    {selectedReadingType === 'past-present-future' ? (
                      index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future'
                    ) : (
                      `Card ${index + 1}`
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {readingCards.length > 0 && revealedCards.length > 0 && (
            <div className="reading-interpretation">
              <h3>Your Reading</h3>
              <p className="reading-guidance">
                Click each card to reveal its message and flip between the 
                front and back to explore its meaning.
              </p>
              
              {revealedCards.length === readingCards.length && (
                <div className="full-interpretation">
                  <h4>Complete Interpretation</h4>
                  <p>
                    The cards you've drawn tell a story of transformation and growth.
                    Pay attention to how they connect and speak to your current situation.
                  </p>
                  <div className="journal-prompt">
                    <h4>Journal Prompt</h4>
                    <p>
                      Take some time to reflect on these cards. How do they resonate with
                      your current journey? What messages are they offering for your growth?
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TarotReading;
```

**Implementation Steps:**
1. Create TarotReading component with different reading types
2. Implement card shuffling and drawing mechanism
3. Add interpretations based on card combinations
4. Create journal prompt generator

#### Journal Integration

**Implementation Approach:**
- Create a journaling component for tarot reflections
- Implement prompt-based writing system
- Add save and export functionality

**Code Example:**
```jsx
// Create a new component: src/components/TarotJournal.tsx
import React, { useState, useEffect } from 'react';
import './TarotJournal.css';

interface JournalEntry {
  id: string;
  date: string;
  cards: string[];
  prompt: string;
  content: string;
}

const TarotJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('tarotJournalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);
  
  // Save entries to localStorage when updated
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('tarotJournalEntries', JSON.stringify(entries));
    }
  }, [entries]);
  
  const createNewEntry = (prompt: string, cards: string[]) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      cards,
      prompt,
      content: ''
    };
    
    setCurrentEntry(newEntry);
    setIsEditing(true);
  };
  
  const saveEntry = () => {
    if (!currentEntry) return;
    
    if (currentEntry.content.trim() === '') {
      // Don't save empty entries
      return;
    }
    
    const entryExists = entries.some(entry => entry.id === currentEntry.id);
    
    if (entryExists) {
      // Update existing entry
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      ));
    } else {
      // Add new entry
      setEntries([...entries, currentEntry]);
    }
    
    setIsEditing(false);
  };
  
  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (currentEntry?.id === id) {
      setCurrentEntry(null);
      setIsEditing(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="tarot-journal">
      <div className="journal-sidebar">
        <h3>Your Reflections</h3>
        
        {entries.length === 0 ? (
          <p className="no-entries">No journal entries yet. Complete a reading to begin.</p>
        ) : (
          <ul className="entry-list">
            {entries.map(entry => (
              <li 
                key={entry.id} 
                className={`entry-item ${currentEntry?.id === entry.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentEntry(entry);
                  setIsEditing(false);
                }}
              >
                <div className="entry-date">{formatDate(entry.date)}</div>
                <div className="entry-preview">
                  {entry.content.substring(0, 50)}...
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="journal-content">
        {currentEntry ? (
          <>
            <div className="journal-header">
              <h3>{formatDate(currentEntry.date)}</h3>
              <div className="journal-actions">
                {isEditing ? (
                  <button className="gentle-cta" onClick={saveEntry}>
                    Save
                  </button>
                ) : (
                  <>
                    <button className="gentle-cta" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                    <button 
                      className="gentle-cta secondary" 
                      onClick={() => deleteEntry(currentEntry.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="journal-prompt-container">
              <div className="journal-prompt">
                <h4>Reflection Prompt</h4>
                <p>{currentEntry.prompt}</p>
              </div>
            </div>
            
            {isEditing ? (
              <textarea
                className="journal-editor"
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({
                  ...currentEntry,
                  content: e.target.value
                })}
                placeholder="Write your reflections here..."
                autoFocus
              />
            ) : (
              <div className="journal-content-display">
                {currentEntry.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="empty-journal">
            <h3>Tarot Journal</h3>
            <p>
              Select an entry from the sidebar to view or edit it.
              Your journal entries are stored locally on your device.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarotJournal;
```

**Implementation Steps:**
1. Create TarotJournal component with localStorage integration
2. Implement CRUD functionality for journal entries
3. Add tarot-specific prompts and reflection guidance
4. Create export and backup functionality

### 2. Resource Library

#### Resource Component System

**Implementation Approach:**
- Create a comprehensive resource library
- Implement filtering and categorization
- Add download tracking and management

**Code Example:**
```jsx
// Create a new component: src/components/ResourceLibrary.tsx
import React, { useState, useEffect } from 'react';
import './ResourceLibrary.css';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'audio' | 'video' | 'template';
  categories: string[];
  tags: string[];
  downloadUrl: string;
  thumbnailUrl: string;
  dateAdded: string;
  memberOnly: boolean;
}

const ResourceLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Mock API call - replace with actual data fetching
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Replace with actual API call
        const data = [
          {
            id: 'resource-1',
            title: 'Digital Entrepreneur Starter Kit',
            description: 'Essential templates and guides for neurodivergent entrepreneurs.',
            type: 'pdf',
            categories: ['business', 'productivity'],
            tags: ['ADHD-friendly', 'templates', 'startup'],
            downloadUrl: '/resources/digital-entrepreneur-kit.pdf',
            thumbnailUrl: '/images/gallery/gothic-digital-planner.png',
            dateAdded: '2024-05-15',
            memberOnly: true
          },
          // More resources...
        ] as Resource[];
        
        setResources(data);
        setFilteredResources(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  // Filter resources based on category, type, and search query
  useEffect(() => {
    let filtered = [...resources];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(resource => 
        resource.categories.includes(activeCategory)
      );
    }
    
    if (activeType !== 'all') {
      filtered = filtered.filter(resource => 
        resource.type === activeType
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredResources(filtered);
  }, [resources, activeCategory, activeType, searchQuery]);
  
  const allCategories = ['all', ...new Set(resources.flatMap(r => r.categories))];
  const allTypes = ['all', ...new Set(resources.map(r => r.type))];
  
  const handleDownload = (resource: Resource) => {
    // Track download or handle member-only content
    if (resource.memberOnly) {
      // Redirect to membership page or show login modal
      console.log('Member-only content');
      return;
    }
    
    // Proceed with download
    window.open(resource.downloadUrl, '_blank');
  };
  
  return (
    <div className="resource-library">
      <h2 className="section-title">📚 Resource Library</h2>
      <p className="resource-intro">
        A collection of tools, templates, and guides to support your creative and 
        healing journey. Some resources are exclusive to community members.
      </p>
      
      <div className="resource-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="resource-search"
          />
        </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <label>Category:</label>
            <div className="filter-options">
              {allCategories.map(category => (
                <button
                  key={category}
                  className={`filter-button ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <label>Type:</label>
            <div className="filter-options">
              {allTypes.map(type => (
                <button
                  key={type}
                  className={`filter-button ${activeType === type ? 'active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading resources...</p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="no-results">
          <p>No resources found matching your criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-thumbnail">
                <img src={resource.thumbnailUrl} alt={resource.title} />
                {resource.memberOnly && (
                  <div className="member-badge">Member Only</div>
                )}
                <div className="resource-type">{resource.type.toUpperCase()}</div>
              </div>
              
              <div className="resource-details">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                
                <div className="resource-tags">
                  {resource.tags.map(tag => (
                    <span key={tag} className="resource-tag">{tag}</span>
                  ))}
                </div>
                
                <button 
                  className={`download-button ${resource.memberOnly ? 'member-only' : ''}`}
                  onClick={() => handleDownload(resource)}
                >
                  {resource.memberOnly ? 'Join to Download' : 'Download'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary;
```

**Implementation Steps:**
1. Create ResourceLibrary component with filtering
2. Implement member-only content protection
3. Add download tracking functionality
4. Style to match Midnight Magnolia aesthetic

#### Resource Creation & Management

**Implementation Approach:**
- Create an admin interface for resource management
- Implement upload and metadata editing
- Add analytics for download tracking

**Code Example:**
```jsx
// This would be part of an admin section not accessible to regular users
// Create a new component: src/admin/ResourceManager.tsx
import React, { useState, useEffect } from 'react';
import './ResourceManager.css';

interface ResourceData {
  id?: string;
  title: string;
  description: string;
  type: 'pdf' | 'audio' | 'video' | 'template';
  categories: string[];
  tags: string[];
  downloadUrl: string;
  thumbnailUrl: string;
  dateAdded?: string;
  memberOnly: boolean;
}

const ResourceManager: React.FC = () => {
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [currentResource, setCurrentResource] = useState<ResourceData>({
    title: '',
    description: '',
    type: 'pdf',
    categories: [],
    tags: [],
    downloadUrl: '',
    thumbnailUrl: '',
    memberOnly: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  
  // Fetch existing resources
  useEffect(() => {
    // Replace with actual API call
    const fetchResources = async () => {
      try {
        // Mock data
        const data = [
          // Resources data
        ];
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    
    fetchResources();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentResource({
      ...currentResource,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCurrentResource({
      ...currentResource,
      [name]: checked
    });
  };
  
  const addCategory = () => {
    if (newCategory && !currentResource.categories.includes(newCategory)) {
      setCurrentResource({
        ...currentResource,
        categories: [...currentResource.categories, newCategory]
      });
      setNewCategory('');
    }
  };
  
  const removeCategory = (category: string) => {
    setCurrentResource({
      ...currentResource,
      categories: currentResource.categories.filter(c => c !== category)
    });
  };
  
  const addTag = () => {
    if (newTag && !currentResource.tags.includes(newTag)) {
      setCurrentResource({
        ...currentResource,
        tags: [...currentResource.tags, newTag]
      });
      setNewTag('');
    }
  };
  
  const removeTag = (tag: string) => {
    setCurrentResource({
      ...currentResource,
      tags: currentResource.tags.filter(t => t !== tag)
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Replace with actual API call
      if (isEditing && currentResource.id) {
        // Update existing resource
        console.log('Updating resource:', currentResource);
      } else {
        // Create new resource
        const newResource = {
          ...currentResource,
          id: `resource-${Date.now()}`,
          dateAdded: new Date().toISOString().split('T')[0]
        };
        console.log('Creating resource:', newResource);
        setResources([...resources, newResource]);
      }
      
      // Reset form
      setCurrentResource({
        title: '',
        description: '',
        type: 'pdf',
        categories: [],
        tags: [],
        downloadUrl: '',
        thumbnailUrl: '',
        memberOnly: false
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving resource:', error);
    }
  };
  
  const editResource = (resource: ResourceData) => {
    setCurrentResource(resource);
    setIsEditing(true);
  };
  
  const deleteResource = async (id: string) => {
    try {
      // Replace with actual API call
      console.log('Deleting resource:', id);
      setResources(resources.filter(resource => resource.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };
  
  return (
    <div className="resource-manager">
      <h2>{isEditing ? 'Edit Resource' : 'Add New Resource'}</h2>
      
      <form onSubmit={handleSubmit} className="resource-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentResource.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={currentResource.description}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={currentResource.type}
            onChange={handleInputChange}
            required
          >
            <option value="pdf">PDF</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="template">Template</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Categories</label>
          <div className="tag-input-container">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add a category"
            />
            <button type="button" onClick={addCategory}>Add</button>
          </div>
          <div className="tags-container">
            {currentResource.categories.map(category => (
              <span key={category} className="tag">
                {category}
                <button type="button" onClick={() => removeCategory(category)}>×</button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Tags</label>
          <div className="tag-input-container">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
            />
            <button type="button" onClick={addTag}>Add</button>
          </div>
          <div className="tags-container">
            {currentResource.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="downloadUrl">Download URL</label>
          <input
            type="text"
            id="downloadUrl"
            name="downloadUrl"
            value={currentResource.downloadUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="thumbnailUrl">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={currentResource.thumbnailUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="memberOnly"
            name="memberOnly"
            checked={currentResource.memberOnly}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="memberOnly">Member Only</label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="gentle-button">
            {isEditing ? 'Update Resource' : 'Add Resource'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="gentle-cta"
              onClick={() => {
                setCurrentResource({
                  title: '',
                  description: '',
                  type: 'pdf',
                  categories: [],
                  tags: [],
                  downloadUrl: '',
                  thumbnailUrl: '',
                  memberOnly: false
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <h2>Existing Resources</h2>
      <div className="resources-list">
        {resources.length === 0 ? (
          <p>No resources yet.</p>
        ) : (
          <table className="resources-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Member Only</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(resource => (
                <tr key={resource.id}>
                  <td>{resource.title}</td>
                  <td>{resource.type.toUpperCase()}</td>
                  <td>{resource.memberOnly ? 'Yes' : 'No'}</td>
                  <td>{resource.dateAdded}</td>
                  <td>
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => editResource(resource)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this resource?')) {
                          deleteResource(resource.id as string);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ResourceManager;
```

**Implementation Steps:**
1. Create ResourceManager component for admin use
2. Implement CRUD operations for resources
3. Add file upload functionality with cloud storage
4. Implement access control for admin area

### 3. Community Engagement

#### Testimonial Showcase

**Implementation Approach:**
- Create a rotating testimonial component
- Implement submission and approval system
- Add social proof with client profiles

**Code Example:**
```jsx
// Create a new component: src/components/TestimonialShowcase.tsx
import React, { useState, useEffect } from 'react';
import './TestimonialShowcase.css';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization?: string;
  quote: string;
  avatar?: string;
  projectType: string;
  rating: 1 | 2 | 3 | 4 | 5;
  featured: boolean;
}

const TestimonialShowcase: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Mock API call - replace with actual data fetching
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Replace with actual API call
        const data = [
          {
            id: 'testimonial-1',
            name: 'Maya Johnson',
            role: 'Founder',
            organization: 'Healing Roots Collective',
            quote: 'Latisha brought both technical excellence and ancestral knowing to our project. The automation she built doesn't just work—it breathes with our organization's rhythm.',
            avatar: '/path/to/avatar1.jpg',
            projectType: 'Automation',
            rating: 5,
            featured: true
          },
          // More testimonials...
        ] as Testimonial[];
        
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    
    fetchTestimonials();
  }, []);
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoplay || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false); // Pause autoplay when user interacts
  };
  
  // Filter for featured testimonials
  const featuredTestimonials = testimonials.filter(t => t.featured);
  
  if (featuredTestimonials.length === 0) {
    return null;
  }
  
  return (
    <div className="testimonial-showcase">
      <h2 className="section-title">✨ Client Reflections</h2>
      
      <div className="testimonial-carousel">
        <div 
          className="testimonial-slider"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {featuredTestimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-slide">
              <div className="testimonial-content">
                <div className="quote-mark">"</div>
                <blockquote className="testimonial-quote">
                  {testimonial.quote}
                </blockquote>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`star ${i < testimonial.rating ? 'filled' : 'empty'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="testimonial-author">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="author-avatar"
                    />
                  ) : (
                    <div className="author-avatar-placeholder">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">
                      {testimonial.role}
                      {testimonial.organization && (
                        <>, {testimonial.organization}</>
                      )}
                    </div>
                    <div className="project-type">{testimonial.projectType} Project</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="carousel-controls">
          <button 
            className="prev-button"
            onClick={() => goToTestimonial(
              activeIndex === 0 ? featuredTestimonials.length - 1 : activeIndex - 1
            )}
            aria-label="Previous testimonial"
          >
            ←
          </button>
          
          <div className="carousel-indicators">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${activeIndex === index ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="next-button"
            onClick={() => goToTestimonial(
              activeIndex === featuredTestimonials.length - 1 ? 0 : activeIndex + 1
            )}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="testimonial-cta">
        <p>Ready to create your own digital transformation story?</p>
        <button className="gentle-button">Start Your Journey</button>
      </div>
    </div>
  );
};

export default TestimonialShowcase;
```

**Implementation Steps:**
1. Create TestimonialShowcase component with carousel
2. Implement autoplay and manual navigation
3. Add testimonial submission form for clients
4. Create admin approval interface

#### Social Sharing Integration

**Implementation Approach:**
- Implement social sharing buttons for content
- Create sharable card previews for blogs and resources
- Add easy sharing for tarot readings

**Code Example:**
```jsx
// Create a new component: src/components/SocialShare.tsx
import React from 'react';
import './SocialShare.css';

interface SocialShareProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  tags?: string[];
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  title, 
  description, 
  url, 
  image,
  tags
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = image ? encodeURIComponent(image) : '';
  const encodedTags = tags ? encodeURIComponent(tags.join(',')) : '';
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedTags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: image ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}` : null,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
  
  const handleShare = (platform: string, link: string) => {
    window.open(link, `share-${platform}`, 'width=600,height=400,resizable=yes');
    
    // Track share event
    console.log(`Shared on ${platform}`);
  };
  
  return (
    <div className="social-share">
      <div className="share-label">Share this:</div>
      <div className="share-buttons">
        <button 
          className="share-button twitter"
          onClick={() => handleShare('twitter', shareLinks.twitter)}
          aria-label="Share on Twitter"
        >
          <span className="share-icon">𝕏</span>
        </button>
        
        <button 
          className="share-button facebook"
          onClick={() => handleShare('facebook', shareLinks.facebook)}
          aria-label="Share on Facebook"
        >
          <span className="share-icon">f</span>
        </button>
        
        <button 
          className="share-button linkedin"
          onClick={() => handleShare('linkedin', shareLinks.linkedin)}
          aria-label="Share on LinkedIn"
        >
          <span className="share-icon">in</span>
        </button>
        
        {shareLinks.pinterest && (
          <button 
            className="share-button pinterest"
            onClick={() => handleShare('pinterest', shareLinks.pinterest as string)}
            aria-label="Share on Pinterest"
          >
            <span className="share-icon">P</span>
          </button>
        )}
        
        <button 
          className="share-button email"
          onClick={() => window.location.href = shareLinks.email}
          aria-label="Share via Email"
        >
          <span className="share-icon">✉</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
```

**Implementation Steps:**
1. Create SocialShare component with platform integrations
2. Add Open Graph meta tags for better sharing previews
3. Implement share tracking and analytics
4. Create custom share images for different content types

#### Event Registration System

**Implementation Approach:**
- Create event registration and management
- Implement calendar integration
- Add reminder and notification system

**Code Example:**
```jsx
// Create a new component: src/components/EventRegistration.tsx
import React, { useState, useEffect } from 'react';
import './EventRegistration.css';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: 'online' | 'in-person';
  locationDetails?: string;
  capacity: number;
  registered: number;
  price: number | 'free';
  image?: string;
  tags: string[];
}

const EventRegistration: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    questions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  // Mock API call - replace with actual data fetching
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Replace with actual API call
        const data = [
          {
            id: 'event-1',
            title: 'Digital Sanctuary Workshop',
            description: 'Learn how to create healing-centered digital spaces in this interactive workshop.',
            date: '2024-07-15',
            time: '18:00',
            duration: '90 minutes',
            location: 'online',
            locationDetails: 'Zoom link will be sent upon registration',
            capacity: 30,
            registered: 12,
            price: 25,
            image: '/images/gallery/gothic-digital-planner.png',
            tags: ['workshop', 'digital', 'healing']
          },
          // More events...
        ] as Event[];
        
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    fetchEvents();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value
    });
  };
  
  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEvent) return;
    
    setIsSubmitting(true);
    
    try {
      // Replace with actual API call
      console.log('Registering for event:', selectedEvent.id, registrationData);
      
      // Mock successful registration
      setTimeout(() => {
        setIsSubmitting(false);
        setRegistrationComplete(true);
        
        // Update event registration count
        setEvents(events.map(event => 
          event.id === selectedEvent.id 
            ? { ...event, registered: event.registered + 1 } 
            : event
        ));
      }, 1500);
    } catch (error) {
      console.error('Error registering for event:', error);
      setIsSubmitting(false);
    }
  };
  
  const resetRegistration = () => {
    setSelectedEvent(null);
    setRegistrationData({
      name: '',
      email: '',
      questions: '',
    });
    setRegistrationComplete(false);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="event-registration">
      <h2 className="section-title">🌙 Upcoming Events</h2>
      
      {selectedEvent ? (
        <div className="registration-flow">
          {registrationComplete ? (
            <div className="registration-success">
              <div className="success-icon">✨</div>
              <h3>You're registered!</h3>
              <p>
                Thank you for registering for <strong>{selectedEvent.title}</strong>.
                A confirmation email has been sent to <strong>{registrationData.email}</strong>.
              </p>
              
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{selectedEvent.time} ({selectedEvent.duration})</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">
                    {selectedEvent.location === 'online' ? 'Online' : 'In Person'} - {selectedEvent.locationDetails}
                  </span>
                </div>
              </div>
              
              <div className="calendar-links">
                <p>Add to your calendar:</p>
                <div className="calendar-buttons">
                  <button className="calendar-button">Google Calendar</button>
                  <button className="calendar-button">Apple Calendar</button>
                  <button className="calendar-button">Outlook</button>
                </div>
              </div>
              
              <button className="gentle-cta" onClick={resetRegistration}>
                Return to Events
              </button>
            </div>
          ) : (
            <div className="registration-form-container">
              <div className="selected-event-details">
                <h3>{selectedEvent.title}</h3>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{formatDate(selectedEvent.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{selectedEvent.time} ({selectedEvent.duration})</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">
                      {selectedEvent.location === 'online' ? 'Online' : 'In Person'} - {selectedEvent.locationDetails}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">
                      {selectedEvent.price === 'free' ? 'Free' : `$${selectedEvent.price}`}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Availability:</span>
                    <span className="detail-value">
                      {selectedEvent.capacity - selectedEvent.registered} spaces remaining
                    </span>
                  </div>
                </div>
                <button 
                  className="back-button gentle-cta secondary"
                  onClick={resetRegistration}
                >
                  Back to Events
                </button>
              </div>
              
              <form onSubmit={handleRegistration} className="registration-form">
                <h3>Register for this Event</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={registrationData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="questions">Questions or Special Requests</label>
                  <textarea
                    id="questions"
                    name="questions"
                    value={registrationData.questions}
                    onChange={handleInputChange}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="gentle-button register-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Complete Registration'}
                </button>
                
                <p className="registration-note">
                  By registering, you agree to receive emails related to this event. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="events-list">
          {events.length === 0 ? (
            <p className="no-events">No upcoming events at this time. Check back soon!</p>
          ) : (
            <div className="events-grid">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  {event.image && (
                    <div className="event-image">
                      <img src={event.image} alt={event.title} />
                    </div>
                  )}
                  
                  <div className="event-info">
                    <div className="event-date-badge">
                      <div className="event-month">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="event-day">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                    
                    <h3 className="event-title">{event.title}</h3>
                    
                    <div className="event-meta">
                      <div className="event-time">
                        <span className="meta-icon">🕒</span>
                        {event.time} • {event.duration}
                      </div>
                      <div className="event-location">
                        <span className="meta-icon">
                          {event.location === 'online' ? '💻' : '📍'}
                        </span>
                        {event.location === 'online' ? 'Online' : event.locationDetails}
                      </div>
                    </div>
                    
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-footer">
                      <div className="event-price">
                        {event.price === 'free' ? 'Free' : `$${event.price}`}
                      </div>
                      
                      <div className="event-capacity">
                        <div className="capacity-bar">
                          <div 
                            className="capacity-fill"
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <div className="capacity-text">
                          {event.capacity - event.registered} spaces left
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="gentle-button register-button"
                      onClick={() => setSelectedEvent(event)}
                      disabled={event.registered >= event.capacity}
                    >
                      {event.registered >= event.capacity ? 'Sold Out' : 'Register Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="events-cta">
            <h3>Host an Event with Midnight Magnolia</h3>
            <p>
              Interested in hosting a workshop or collaboration? 
              Let's create a healing-centered digital experience together.
            </p>
            <button className="gentle-cta">Contact for Collaboration</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistration;
```

**Implementation Steps:**
1. Create EventRegistration component with event listing
2. Implement registration form and confirmation
3. Add calendar integration for event reminders
4. Create admin interface for event management

## Implementation Timeline

### Phase 2: Technical Enhancements (Weeks 4-7)
- Week 4: Performance Optimization
- Week 5: Image Optimization & Code Splitting
- Week 6: Shopify & Patreon Integration
- Week 7: Mobile Experience Refinement

### Phase 3: Content & Community Features (Weeks 8-12)
- Week 8-9: Interactive Tarot Experience
- Week 10: Resource Library
- Week 11-12: Community Engagement Features

## Next Steps

After completing this detailed plan, we should:

1. Review and prioritize components
2. Establish the development environment
3. Set up CI/CD pipeline for testing
4. Begin implementation with Phase 1 components

Each implementation phase should be aligned with your health needs, with built-in rest periods and a focus on sustainable development pacing.
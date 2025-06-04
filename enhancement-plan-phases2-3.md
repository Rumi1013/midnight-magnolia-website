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

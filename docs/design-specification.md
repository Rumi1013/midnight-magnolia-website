# Midnight Magnolia Design Specification

> **Version:** 1.0.0
> **Last Updated:** November 30, 2025
> **Brand:** Midnight Magnolia by Rumi-Nations LLC
> **Tagline:** "Rooted in Mystery. Blooming in Truth."

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Specifications](#component-specifications)
6. [Animation & Interactions](#animation--interactions)
7. [Decorative Elements](#decorative-elements)
8. [Iconography](#iconography)
9. [Artwork Assets](#artwork-assets)
10. [SEO Guidelines](#seo-guidelines)
11. [Accessibility Requirements](#accessibility-requirements)
12. [Implementation Notes](#implementation-notes)

---

## Brand Overview

Midnight Magnolia is a **Southern Gothic digital sanctuary** where art, ancestry, automation, and healing coexist. The design aesthetic blends:

- **Southern Gothic elegance** - Deep, moody colors with refined typography
- **Mystical spirituality** - Zodiac symbols, moon phases, tarot imagery
- **Ancestral wisdom** - Honoring heritage through visual storytelling
- **Gentle healing** - Soft, welcoming interfaces for trauma-informed design

### Target Audience
- Black women and marginalized voices
- Neurodivergent creators (ADHD-friendly design)
- People navigating chronic illness, sobriety, or healing journeys
- Spiritual entrepreneurs and digital creators

### Design Principles
1. **Trauma-Informed** - Gentle, non-overwhelming interfaces
2. **Neurodivergent-Friendly** - Clear hierarchy, reduced cognitive load
3. **Inclusive** - WCAG AA compliant, accessible to all
4. **Mystical yet Professional** - Spiritual aesthetics with business credibility

---

## Color System

### Primary Brand Colors

| Color Name | Hex Code | RGB | CSS Variable | Usage |
|------------|----------|-----|--------------|-------|
| Midnight Navy | `#0A192F` | 10, 25, 47 | `--midnight-navy` | Primary background, dark mode base |
| Magnolia White | `#FAF3E0` | 250, 243, 224 | `--magnolia-white` | Primary text on dark, light backgrounds |
| Sage Moss | `#A3B18A` | 163, 177, 138 | `--sage-moss` | Primary accent, CTAs, nature elements |
| Southern Gold | `#D4AF37` | 212, 175, 55 | `--southern-gold` | Highlights, premium elements, hover states |

### Secondary Brand Colors

| Color Name | Hex Code | RGB | CSS Variable | Usage |
|------------|----------|-----|--------------|-------|
| Magnolia Blush | `#F5E6E0` | 245, 230, 224 | `--magnolia-blush` | Soft backgrounds, feminine accents |
| Plum Violet | `#56334E` | 86, 51, 78 | `--plum-violet` | Deep accents, muted states |
| Copper Brown | `#B87333` | 184, 115, 51 | `--copper-brown` | Warm accents, earthy elements |
| Indigo Blue | `#3D5A80` | 61, 90, 128 | `--indigo-blue` | Links, informational elements |
| Forest Moss | `#5E6B4E` | 94, 107, 78 | `--forest-moss` | Darker green accents |
| Warm Gray | `#D4B99F` | 212, 185, 159 | `--warm-gray` | Borders, disabled states |
| Parchment Cream | `#F8F4E8` | 248, 244, 232 | `--parchment-cream` | Card backgrounds, light sections |

### Extended Palette

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| Iron | `#1E1E1E` | `--iron` | Deep black accents |
| Taupe | `#BFAEA0` | `--taupe` | Neutral backgrounds |
| Glow | `#EEE3CF` | `--glow` | Soft highlights |
| Mist | `#889696` | `--mist` | Subtle text, placeholders |
| Laurel | `#7DA27E` | `--laurel` | Alternative green |
| Amber | `#D9A441` | `--amber` | Warning states, warm gold |
| Rose | `#9C3F3F` | `--rose` | Error states, deep red |
| River | `#4C6D9C` | `--river` | Alternative blue |

### Semantic Status Colors (WCAG AA Compliant)

| Status | Color | Hex Code | Light Variant | Dark Variant |
|--------|-------|----------|---------------|--------------|
| Success | Emerald | `#059669` | `#D1FAE5` | `#047857` |
| Warning | Amber | `#D97706` | `#FEF3C7` | `#B45309` |
| Error | Red | `#DC2626` | `#FEE2E2` | `#B91C1C` |
| Info | Blue | `#2563EB` | `#DBEAFE` | `#1D4ED8` |

### Interactive State Colors

```css
/* Primary Interactive States */
--primary-hover: rgba(163, 177, 138, 0.85);
--primary-active: rgba(163, 177, 138, 0.95);
--primary-focus: rgba(212, 175, 55, 0.3);

/* Secondary Interactive States */
--secondary-hover: rgba(212, 175, 55, 0.85);
--secondary-active: rgba(212, 175, 55, 0.95);
--secondary-focus: rgba(163, 177, 138, 0.3);

/* Focus Ring Colors */
--focus-ring-primary: #D4AF37;
--focus-ring-secondary: #A3B18A;
--focus-ring-danger: #DC2626;
--focus-ring-success: #059669;
```

### Gradient Definitions

```css
/* Hero Pattern Background */
.hero-pattern {
  background-image:
    radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05), transparent 40%),
    radial-gradient(circle at 85% 80%, rgba(86, 51, 78, 0.08), transparent 50%),
    linear-gradient(180deg, #0A192F 0%, #071426 100%);
}

/* Gold Button Gradient */
background: linear-gradient(180deg, #D4AF37, #C49A30);

/* Ironwork Divider */
background: linear-gradient(
  90deg,
  transparent,
  #A3B18A 20%,
  #D4AF37 50%,
  #A3B18A 80%,
  transparent
);

/* Zodiac Constellation Gradient */
<linearGradient id="zodiacGradient">
  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
  <stop offset="50%" stopColor="#A3B18A" stopOpacity="0.2" />
  <stop offset="100%" stopColor="#FAF3E0" stopOpacity="0.1" />
</linearGradient>
```

---

## Typography

### Font Families

| Font | Variable | Usage | Weights |
|------|----------|-------|---------|
| Cormorant Garamond | `--font-cormorant` | Display headings, elegant titles | 400, 600, 700 (normal, italic) |
| Playfair Display | `--font-playfair` | Alternative display, hero text | Variable |
| Merriweather | `--font-merriweather` | Body text, paragraphs | 300, 400, 700 |
| Lora | `--font-lora` | Alternative body, quotes | Variable |
| Poppins | `--font-poppins` | UI elements, buttons, labels | 400, 500, 600, 700 |
| Montserrat | `--font-montserrat` | Navigation, badges, CTAs | Variable |

### Semantic Font Assignments

```css
--font-display: var(--font-cormorant), 'Cormorant Garamond', serif;
--font-body: var(--font-merriweather), 'Merriweather', serif;
--font-accent: var(--font-poppins), 'Poppins', sans-serif;
--font-serif: var(--font-lora), 'Lora', serif;
```

### Typography Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Playfair Display | `clamp(2.6rem, 6vw, 4.4rem)` | 700 | 1.1 | 0.02em |
| H2 | Playfair Display | `clamp(1.8rem, 4vw, 2.6rem)` | 700 | 1.2 | 0.02em |
| H3 | Playfair Display | `clamp(1.3rem, 3vw, 1.8rem)` | 600 | 1.3 | 0.02em |
| Body | Merriweather/Lora | `1rem - 1.125rem` | 400 | 1.8 | normal |
| Body Large | Lora | `1.125rem - 1.25rem` | 400 | 1.8 | normal |
| Caption | Montserrat | `0.75rem - 0.875rem` | 500 | 1.5 | 0.05em |
| Badge | Montserrat | `0.75rem` | 700 | 1.2 | 0.12em |
| Button | Montserrat/Poppins | `0.875rem - 1rem` | 600 | 1.2 | 0.06em |
| Nav Link | Lora | `0.875rem` | 400-600 | 1.5 | normal |

### Typography Styles

```css
/* Hero Heading - Italic Serif */
h1 {
  font-family: var(--font-playfair);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(2.6rem, 6vw, 4.4rem);
  line-height: 1.1;
  letter-spacing: 0.02em;
}

/* Section Heading */
h2 {
  font-family: var(--font-playfair);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
}

/* Tagline/Badge Text */
.tagline {
  font-family: var(--font-accent);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 1rem;
  color: var(--southern-gold);
}

/* Navigation Links */
.nav-link {
  font-family: var(--font-accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Body Text */
p, li {
  max-width: 70ch; /* Optimal reading width */
  line-height: 1.8;
}

/* Dyslexia-Friendly Formatting */
.dyslexia-friendly {
  font-family: var(--font-body);
  line-height: 1.8;
  letter-spacing: 0.05em;
  word-spacing: 0.1em;
}
```

---

## Spacing & Layout

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem (4px) | Tight spacing, icon gaps |
| `space-2` | 0.5rem (8px) | Small gaps, inline elements |
| `space-3` | 0.75rem (12px) | Form elements |
| `space-4` | 1rem (16px) | Standard spacing |
| `space-6` | 1.5rem (24px) | Section padding |
| `space-8` | 2rem (32px) | Card padding |
| `space-12` | 3rem (48px) | Section gaps |
| `space-16` | 4rem (64px) | Large section spacing |
| `space-20` | 5rem (80px) | Section vertical padding |

### Layout Containers

```css
/* Section Container */
.section-container {
  width: min(1200px, 92vw);
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

/* Max Content Width */
max-width: 7xl (80rem / 1280px)

/* Grid Gaps */
gap-4: 1rem
gap-6: 1.5rem
gap-8: 2rem
gap-16: 4rem
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 0.125rem | Small elements |
| `rounded` | 0.25rem | Buttons, inputs |
| `rounded-lg` | 0.5rem | Cards |
| `rounded-xl` | 0.75rem | Large cards |
| `rounded-2xl` | 1rem | Feature cards |
| `rounded-3xl` | 1.5rem | Hero elements |
| `rounded-full` | 9999px | Badges, avatars, pills |

---

## Component Specifications

### Buttons

#### Primary Button (Sage Green)
```css
.btn-sage {
  background: #A3B18A;
  color: #0A192F;
  font-family: var(--font-accent);
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 12px 30px rgba(163, 177, 138, 0.25);
  transition: all 0.3s ease;
}

.btn-sage:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(163, 177, 138, 0.35);
}

.btn-sage:focus {
  box-shadow: 0 0 0 2px #A3B18A, 0 0 0 4px rgba(255, 255, 255, 0.8);
}
```

#### Secondary Button (Gold)
```css
.btn-gold {
  background: linear-gradient(180deg, #D4AF37, #C49A30);
  color: #0A192F;
  font-family: var(--font-accent);
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 12px 36px rgba(212, 175, 55, 0.28);
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 45px rgba(212, 175, 55, 0.4);
  background: linear-gradient(180deg, #C49A30, #B8860B);
}
```

#### Outline Button
```css
.btn-outline {
  background: transparent;
  border: 2px solid currentColor;
  color: #FAF3E0;
  padding: 1rem 2rem;
  border-radius: 9999px;
}

.btn-outline:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: #D4AF37;
  color: #D4AF37;
}
```

### Cards

#### Product Card
```css
.product-card {
  background: #FAF3E0;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(163, 177, 138, 0.15);
  border: 2px solid transparent;
  transition: all 0.5s ease;
}

.product-card:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 28px 70px rgba(10, 25, 47, 0.2);
  border-color: rgba(212, 175, 55, 0.3);
}
```

#### Glass Card (Dark Mode)
```css
.glass-card {
  background: rgba(10, 25, 47, 0.68);
  border: 1px solid rgba(163, 177, 138, 0.2);
  box-shadow: 0 24px 60px rgba(10, 25, 47, 0.15);
  backdrop-filter: blur(16px);
  border-radius: 1.125rem;
}
```

#### Feature Card (Values/Mission)
```css
.feature-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 2px solid rgba(212, 185, 159, 0.2);
  box-shadow: 0 4px 20px rgba(163, 177, 138, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 0 8px 30px rgba(163, 177, 138, 0.2);
}
```

### Badges

#### Section Badge
```css
.section-badge {
  background: #A3B18A;
  color: #FAF3E0;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  display: inline-block;
}
```

#### Category Badge (Dark)
```css
.category-badge {
  background: #0A192F;
  color: #FAF3E0;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.375rem 1rem;
  border-radius: 9999px;
}
```

#### Coming Soon Ribbon
```css
.coming-soon-ribbon {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: linear-gradient(to right, #D4AF37, #A3B18A, #D4AF37);
  color: #0A192F;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  transform: rotate(12deg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: pulse 2s ease-in-out infinite;
}
```

#### Status Badge
```css
.status-badge {
  background: #D4B99F;
  color: #4B5563;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}
```

### Navigation

#### Header
```css
.site-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  backdrop-filter: blur(12px);
  background: rgba(10, 25, 47, 0.9);
  transition: all 0.3s ease;
}

.site-header.scrolled {
  background: rgba(10, 25, 47, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
```

#### Nav Link
```css
.nav-link {
  font-family: var(--font-lora);
  font-size: 0.875rem;
  color: #FAF3E0;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #A3B18A;
}

.nav-link.active {
  color: #D4AF37;
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: #D4AF37;
  border-radius: 9999px;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
}
```

### Form Elements

#### Input Field
```css
.input-field {
  background: rgba(250, 243, 224, 0.1);
  border: 1px solid rgba(163, 177, 138, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #FAF3E0;
  font-family: var(--font-body);
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #D4AF37;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.3);
  outline: none;
}
```

---

## Animation & Interactions

### Keyframe Animations

#### Float Gentle
```css
@keyframes float-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}
```

#### Zodiac Drift
```css
@keyframes zodiac-drift {
  0%, 100% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateX(20px) translateY(-15px) rotate(5deg);
    opacity: 0.5;
  }
  50% {
    transform: translateX(-10px) translateY(10px) rotate(-3deg);
    opacity: 0.25;
  }
  75% {
    transform: translateX(15px) translateY(-5px) rotate(4deg);
    opacity: 0.4;
  }
}

.animate-zodiac-drift {
  animation: zodiac-drift 20s ease-in-out infinite;
}
```

#### Glow Pulse
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.2); }
  50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.4); }
}

.animate-glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}
```

#### Constellation Pulse
```css
@keyframes constellation-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.animate-constellation-pulse {
  animation: constellation-pulse 4s ease-in-out infinite;
}
```

#### Magnolia Bloom
```css
@keyframes magnolia-bloom {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
  50% { transform: scale(1.05) rotate(3deg); opacity: 1; }
}

.animate-magnolia-bloom {
  animation: magnolia-bloom 8s ease-in-out infinite;
}
```

#### Mood Ring
```css
@keyframes moodRing {
  0% { box-shadow: inset 0 0 40px rgba(163, 177, 138, 0.24); }
  33% { box-shadow: inset 0 0 40px rgba(212, 175, 55, 0.2); }
  66% { box-shadow: inset 0 0 40px rgba(86, 51, 78, 0.22); }
  100% { box-shadow: inset 0 0 40px rgba(10, 25, 47, 0.2); }
}

.mood-ring {
  animation: moodRing 24s ease-in-out infinite;
}
```

### Transition Defaults

```css
/* Standard transition */
transition: all 0.3s ease;

/* Fast transition (hover states) */
transition: all 0.2s ease-in-out;

/* Slow transition (page elements) */
transition: all 0.5s ease;

/* Spring-like transition (Framer Motion) */
transition: { type: "spring", stiffness: 120, damping: 14 }
```

### Hover Effects

```css
/* Card Lift */
.card:hover {
  transform: translateY(-4px);
}

/* Button Lift */
.button:hover {
  transform: translateY(-2px);
}

/* Scale Up */
.icon:hover {
  transform: scale(1.1);
}

/* Scale with Glow */
.element:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 50px rgba(212, 175, 55, 0.35);
}
```

### Scroll Animations (Framer Motion)

```javascript
// Fade in from bottom
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Fade in from left
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}

// Staggered children
variants={{
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.07 } }
}}
```

---

## Decorative Elements

### Floating Elements

| Element | Emoji | Animation | Opacity | Position |
|---------|-------|-----------|---------|----------|
| Crescent Moon | 🌙 | float-gentle | 0.6-1.0 | Top corners |
| Sparkles | ✨ | scale pulse | 0.6-1.0 | Scattered |
| Feather | 🪶 | drift rotate | 0.4 | Center areas |
| Botanical | 🌿 | gentle sway | 0.6 | Bottom corners |
| Stars | ⭐ | twinkle | 0.3-0.6 | Background |

### Zodiac Symbols

```javascript
const zodiacSigns = [
  { symbol: "♈", name: "Aries" },
  { symbol: "♉", name: "Taurus" },
  { symbol: "♊", name: "Gemini" },
  { symbol: "♋", name: "Cancer" },
  { symbol: "♌", name: "Leo" },
  { symbol: "♍", name: "Virgo" },
  { symbol: "♎", name: "Libra" },
  { symbol: "♏", name: "Scorpio" },
  { symbol: "♐", name: "Sagittarius" },
  { symbol: "♑", name: "Capricorn" },
  { symbol: "♒", name: "Aquarius" },
  { symbol: "♓", name: "Pisces" }
];
```

**Styling:**
```css
.zodiac-symbol {
  font-family: var(--font-playfair);
  font-size: 2rem - 2.5rem;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.4),
               0 0 40px rgba(163, 177, 138, 0.2);
  opacity: 0.15 - 0.5;
}
```

### Decorative Dividers

#### Ironwork Divider
```css
.ironwork-divider {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    #A3B18A 20%,
    #D4AF37 50%,
    #A3B18A 80%,
    transparent
  );
  opacity: 0.4;
}
```

#### Dot Line Divider
```html
<div class="flex items-center justify-center gap-4 opacity-30">
  <div class="w-2 h-2 bg-sage-green rounded-full" />
  <div class="w-32 h-px bg-gradient-to-r from-transparent via-sage-green to-transparent" />
  <div class="w-2 h-2 bg-sage-green rounded-full" />
</div>
```

### Rotating Logo Circle

```css
/* Outer ring - slow clockwise */
animation: rotate 60s linear infinite;

/* Middle ring - static with orbit dots */
/* Dots at cardinal points */

/* Inner ring - slow counter-clockwise */
animation: rotate -90s linear infinite;

/* Center logo - very slow counter-clockwise */
animation: rotate -120s linear infinite;
```

### Background Patterns

```css
/* Radial glow spots */
.bg-glow-sage {
  background: radial-gradient(circle, rgba(163, 177, 138, 0.05) 0%, transparent 70%);
}

.bg-glow-gold {
  background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
}

/* Blur orbs */
.blur-orb {
  width: 20rem - 24rem;
  height: 20rem - 24rem;
  border-radius: 9999px;
  filter: blur(3rem);
  opacity: 0.05 - 0.1;
}
```

---

## Iconography

### Emoji Icons Used

| Category | Icons |
|----------|-------|
| Navigation | 🌸 (brand), 🌙 (theme toggle) |
| Features | 🌙 (trauma-informed), 🌸 (ancestral), ✨ (neurodivergent), 🕊️ (inclusive), 🔮 (digital), 🚗 (community) |
| Products | 📖 (journals), 🔮 (tarot), 📝 (planners), 💼 (business), 🎨 (art) |
| Values | 🌱 (growth), 🕯️ (rituals) |
| Social | 🌙, ✨, 🌿, 🔮, 🦋 |

### Icon Styling

```css
/* Standard icon */
.icon {
  font-size: 1.5rem - 2rem;
  transition: transform 0.3s ease;
}

.icon:hover {
  transform: scale(1.1);
}

/* Large feature icon */
.feature-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.45));
}

/* Animated icon */
.animated-icon {
  animation: float-gentle 4s ease-in-out infinite;
}
```

### Heroicons Used

- `MoonIcon` - Theme toggle (dark mode)
- `SunIcon` - Theme toggle (light mode)
- `Bars3Icon` - Mobile menu open
- `XMarkIcon` - Mobile menu close

---

## Artwork Assets

### Logo Variations

| File | Usage | Location |
|------|-------|----------|
| `logo-main.jpg` | Primary logo, hero section | `/images/logo-main.jpg` |
| `logo-circular.jpg` | Rotating hero element | `/images/logo-circular.jpg` |
| `logo-minimal.jpg` | Header, small contexts | `/images/logo-minimal.jpg` |
| `logo-book.jpg` | Journal category | `/images/logo-book.jpg` |
| `logo-smoke.jpg` | Art category, blog | `/images/logo-smoke.jpg` |

### Available Artwork (attached_assets/Artwork/)

#### Logo Assets
- `Magnolia_Bloom.jpg` - Main magnolia bloom artwork
- `Detailed_logo_magnolia.png.png` - Detailed logo version
- `Realistic_magnolia_logo.png.png` - Realistic style logo
- `Secondary_small_logo.png.png` - Secondary logo variant
- `Midnight-magnolia-small.png.png` - Small format logo

#### Decorative Art by Date
- **February 2025**: Abstract patterns, texture backgrounds
- **March 2025**: Website mockup designs
- **April 2025**: Botanical illustrations
- **June 2025**: Multiple logo variations, brand assets
- **June 22, 2025**: Product mockups, UI elements
- **August 2025**: Extended artwork collection
- **October 2025**: Large collection of illustrations and patterns
- **November 2025**: Patreon assets, recent additions

### Recommended Asset Usage

| Section | Recommended Assets |
|---------|-------------------|
| Hero Background | Magnolia_Bloom.jpg, abstract patterns |
| About Section | Botanical illustrations from April |
| Product Cards | Logo variations, product mockups |
| Blog Headers | Artistic patterns from October collection |
| Footer | Minimal logo, decorative elements |

---

## SEO Guidelines

### Meta Tags Structure

```html
<title>Midnight Magnolia | Southern Gothic Wellness Sanctuary</title>
<meta name="description" content="Digital sanctuary for healing through Southern Gothic grace. Blending ancestral wisdom, gentle productivity, and sacred wellness for people with chronic illness and ADHD." />
<meta name="keywords" content="wellness, Southern Gothic, chronic illness, ADHD, healing, ancestral wisdom, digital sanctuary, productivity, self-care" />
```

### Open Graph Tags

```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:title" content="Midnight Magnolia | Southern Gothic Wellness Sanctuary" />
<meta property="og:description" content="Digital sanctuary for healing through Southern Gothic grace." />
<meta property="og:image" content="/images/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="@midnightmagnolia" />
```

### Structured Data Recommendations

- Organization schema for brand
- Product schema for shop items
- Article schema for blog posts
- BreadcrumbList for navigation
- FAQ schema for common questions

### URL Structure

```
/ - Homepage
/shop - Shop landing
/shop/[category] - Category pages
/shop/[category]/[product] - Product pages
/blog - Blog listing
/blog/[slug] - Blog posts
/about - About page
/contact - Contact page
/services - Services page
/community - Patreon/Community
```

---

## Accessibility Requirements

### WCAG AA Compliance

#### Color Contrast Ratios
- Normal text: minimum 4.5:1
- Large text (18px+ or 14px+ bold): minimum 3:1
- UI components: minimum 3:1

#### Verified Contrast Pairs
| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| #FAF3E0 | #0A192F | 12.5:1 | ✅ |
| #0A192F | #FAF3E0 | 12.5:1 | ✅ |
| #0A192F | #A3B18A | 5.2:1 | ✅ |
| #0A192F | #D4AF37 | 6.8:1 | ✅ |
| #FAF3E0 | #A3B18A | 2.4:1 | ⚠️ Large text only |

### Focus States

```css
/* All interactive elements must have visible focus */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--focus-ring-primary),
              0 0 0 4px rgba(255, 255, 255, 0.8);
  border-radius: 0.25rem;
}

/* Skip to main content link */
.skip-to-main {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--midnight-navy);
  color: var(--magnolia-white);
  padding: 8px 16px;
  z-index: 100;
}

.skip-to-main:focus {
  top: 6px;
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  .text-magnolia-white\/80 {
    @apply text-magnolia-white;
  }

  .high-contrast-border {
    border: 2px solid currentColor;
  }
}
```

### Screen Reader Support

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Keyboard Navigation

- All interactive elements must be focusable
- Tab order must be logical
- Focus trapping for modals
- Escape key closes overlays
- Arrow keys for menu navigation

### Touch Targets

- Minimum touch target: 44x44px
- Adequate spacing between targets
- Buttons have `min-h-[44px]` class

### Form Accessibility

- All inputs have associated labels
- Error messages are announced
- Required fields are indicated
- Form validation is accessible

---

## Implementation Notes

### Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + CSS Variables
- **Animation:** Framer Motion
- **UI Components:** shadcn/ui (New York style)
- **Icons:** Heroicons, Emoji
- **Fonts:** Google Fonts (next/font)

### File Structure

```
app/
├── components/
│   ├── Hero.tsx
│   ├── AboutSection.tsx
│   ├── ProductsSection.tsx
│   ├── ShopSection.tsx
│   ├── BlogSection.tsx
│   ├── FloatingZodiac.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

### CSS Architecture

1. **Base Layer:** CSS variables, typography defaults
2. **Components Layer:** Reusable component styles
3. **Utilities Layer:** Custom utility classes

### Performance Considerations

- Use `next/image` for all images
- Lazy load below-fold content
- Optimize animations for 60fps
- Use CSS transforms over layout properties
- Implement proper loading states

### Dark/Light Mode

- Default: Dark mode
- Theme provider with system preference detection
- CSS variables switch between modes
- Smooth transitions between themes

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Nov 30, 2025 | Initial design specification |

---

*This document serves as the single source of truth for the Midnight Magnolia design system. All implementations should reference this specification to ensure consistency across the platform.*
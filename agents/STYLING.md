# Midnight Magnolia — Styling Guidelines

This document ensures styling continuity across all Midnight Magnolia projects. Reference this guide when creating or modifying any visual elements, components, or content.

## Brand Essence

Midnight Magnolia channels **southern-gothic softness** — moonlit magnolia blooms, railroad hymns, and recovery letters. The tone is warm, poetic, resilient, and future-minded.

**Core Mantra:** *Rest is strategy. Creation is power.*

## Color System

### Primary Palette

The canonical color values used in the codebase are:

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Midnight Blue | `#0A192F` | `10, 25, 47` | Primary background, typography anchors, modal overlays |
| Magnolia White | `#FAF3E0` | `250, 243, 224` | Body text on dark backgrounds, highlights, form fields |
| Southern Gold | `#D4AF37` | `212, 175, 55` | CTAs, hover states, icons, accents |
| Sage Green | `#A3B18A` | `163, 177, 138` | Secondary buttons, supportive text, badges |
| Mulberry Plum | `#56334E` | `86, 51, 78` | Section dividers, alerts, footer gradients |
| Warm Gray | `#D4B99F` | `212, 185, 159` | Muted elements, borders, inputs |

### CSS Custom Properties

```css
:root {
  --midnight-blue: #0A192F;
  --magnolia-white: #FAF3E0;
  --sage-green: #A3B18A;
  --gold: #D4AF37;
  --warm-gray: #D4B99F;
  --plum: #56334E;
}
```

### Tailwind Classes

```javascript
colors: {
  "midnight-blue": "#0A192F",
  "magnolia-white": "#FAF3E0",
  "sage-green": "#A3B18A",
  "gold": "#D4AF37",
  "warm-gray": "#D4B99F",
  "plum": "#56334E",
}
```

## Typography

### Font Stack

| Usage | Font | Fallback | CSS Variable |
|-------|------|----------|--------------|
| Display/Headers | Playfair Display | serif | `--font-playfair` |
| Body Text | Lora | serif | `--font-lora` |
| Interface/UI | Montserrat | sans-serif | `--font-montserrat` |

### Typesetting Rules

- **Headers:** Playfair Display Bold Italic — hero lines, section titles, poetic pull quotes
- **Body:** Lora Regular — 18px, line-height 1.8×, max-width 70ch
- **Interface:** Montserrat Medium — uppercase or title case for controls, nav, labels
- **Headline tracking:** 0.02em to balance italics
- **Paragraph spacing:** 1.2× line-height with generous padding

## Imagery & Texture

### Photography Guidelines
- Moonlit porches, magnolia petals, textured paper, river reflections
- Soft, warm lighting with plum and gold undertones
- Avoid harsh shadows or high-contrast scenes

### Illustration Style
- Hand-drawn botanical line art
- Adinkra glyph overlays (Nyame Dua, Gye Nyame)
- Celestial gradients with subtle luminance shifts (<3%)

### Motion & Animation
- Slow cross-fades and breathing gradients
- Gentle parallax (max 8px offset)
- **Never:** Flash, strobe, or rapid animations
- Respect `prefers-reduced-motion` media query

## Animations

### Custom Keyframes

```css
@keyframes float-zodiac {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(5deg); }
  50% { transform: translateY(5px) rotate(-3deg); }
  75% { transform: translateY(-10px) rotate(2deg); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.2); }
  50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.4); }
}
```

### Utility Classes

```css
.shadow-gold-glow {
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.1);
}

.shadow-sage-glow {
  box-shadow: 0 0 30px rgba(163, 177, 138, 0.3), 0 0 60px rgba(163, 177, 138, 0.1);
}

.text-gradient {
  background: linear-gradient(to right, #A3B18A, #D4AF37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Voice & Copy

### Tone
- Tender mentor, soft power, ritual-rich storytelling
- Future-minded resilience
- Warm, grounded, culturally aware, trauma-informed

### Vocabulary
**Use:** ease, ritual, rooted, becoming, sanctuary, bloom, hush, ember, respite
**Avoid:** Hustle tropes, urgency marketing, harsh imperatives

### Format Guidelines
- Lora paragraphs for narratives
- Montserrat for action items
- Italicized Playfair quotes for mantras

## Accessibility

### Contrast Requirements
- **Minimum:** WCAG AA (4.5:1 ratio)
- **Target:** 7:1 for body text

### Layout Standards
- Line height: 1.8×
- Comfortable letter spacing
- Maximum width: 70ch

### Interaction
- Keyboard-first navigation
- Skip-to-content links
- Focus-visible styles using Southern Gold or Sage Moss
- `focus-visible { outline: 2px solid #D4AF37; }`

### Content
- Alt text with sensory grounding
- Example: *"Magnolia bloom cradled by a crescent moon, soft plum shadows."*
- Captions/transcripts for audio content

## Component Patterns

### Cards

```css
.card {
  background: rgba(10, 15, 20, 0.6);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 24px 60px rgba(10, 15, 20, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 28px 70px rgba(10, 15, 20, 0.6);
}
```

### Buttons

```css
.btn-gold {
  background: var(--gold);
  color: var(--midnight-blue);
  border-radius: 999px;
  padding: 0.85rem 1.6rem;
  font-family: var(--font-montserrat);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 45px rgba(193, 154, 51, 0.34);
}
```

### Navigation

```css
.nav-link {
  font-family: var(--font-montserrat);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(246, 244, 239, 0.82);
  transition: color 0.2s ease, text-shadow 0.3s ease;
}

.nav-link:hover {
  color: var(--gold);
  text-shadow: 0 0 18px rgba(193, 154, 51, 0.4);
}
```

## Agent Coordination

When implementing styling:

1. **Zora** clarifies the styling scope and priorities
2. **Business Agent** ensures brand alignment and strategic fit
3. **Saimon** implements the technical CSS/styling code

Always validate changes against this guide before deployment.

---

*Last updated: November 2025*
*Maintained by: Midnight Magnolia Agent Triad*

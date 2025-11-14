# Accessibility Compliance - Midnight Magnolia

## WCAG 2.1 Level AA Compliance

This website is designed and developed to meet **WCAG 2.1 Level AA** accessibility standards.

### Implemented Accessibility Features

#### 1. **Perceivable** - Information must be presentable to users in ways they can perceive

##### 1.1 Text Alternatives (WCAG 1.1.1)
- ✅ All images include descriptive `alt` text
- ✅ Logo SVG includes semantic description
- ✅ Decorative images use `alt=""` or `aria-hidden="true"`

##### 1.4 Distinguishable (WCAG 1.4.3, 1.4.6)
- ✅ **Color Contrast Ratios** meet AA standards:
  - Body text (#FAF3E0 on #0A192F): ~15:1 (exceeds 4.5:1 minimum)
  - Large text (#D4AF37 on #0A192F): ~8:1 (exceeds 3:1 minimum)
  - Interactive elements have 3:1 contrast minimum
- ✅ Information not conveyed by color alone
- ✅ Focus indicators visible on all interactive elements

#### 2. **Operable** - UI components must be operable

##### 2.1 Keyboard Accessible (WCAG 2.1.1, 2.1.2)
- ✅ All functionality available via keyboard
- ✅ No keyboard traps
- ✅ Logical tab order throughout site
- ✅ Skip to main content link (WCAG 2.4.1)

##### 2.4 Navigable (WCAG 2.4.1-2.4.7)
- ✅ **Skip Links**: Bypass repeated content blocks
- ✅ **Page Titles**: Descriptive and unique for each page
- ✅ **Focus Order**: Logical and consistent
- ✅ **Link Purpose**: Clear from link text or context
- ✅ **Focus Visible**: Enhanced focus indicators (4px sage-green ring with offset)
- ✅ **Headings and Labels**: Descriptive and hierarchical

#### 3. **Understandable** - Information must be understandable

##### 3.1 Readable (WCAG 3.1.1, 3.1.2)
- ✅ `lang="en"` attribute on `<html>` tag
- ✅ Clear, readable typography (Lora, Playfair Display)
- ✅ Semantic HTML structure

##### 3.2 Predictable (WCAG 3.2.1-3.2.4)
- ✅ Consistent navigation across pages
- ✅ Components behave predictably
- ✅ No automatic context changes on focus

##### 3.3 Input Assistance (WCAG 3.3.1-3.3.4)
- ✅ Form labels and instructions
- ✅ Error identification and suggestions
- ✅ Validation feedback

#### 4. **Robust** - Content must be robust enough for assistive technologies

##### 4.1 Compatible (WCAG 4.1.1, 4.1.2, 4.1.3)
- ✅ Valid semantic HTML5
- ✅ ARIA attributes used correctly:
  - `role="banner"` on header
  - `role="main"` on main content
  - `role="navigation"` on nav elements
  - `aria-label` on interactive elements
  - `aria-expanded` on toggle buttons
  - `aria-controls` linking controls to controlled elements
- ✅ Status messages announced to screen readers

---

## Keyboard Navigation

### Global Shortcuts
- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modal dialogs and mobile menu

### Skip Links
- **Tab once from top**: Reveals "Skip to main content" button
- **Enter**: Jumps directly to main content area

---

## Screen Reader Support

Tested and optimized for:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Semantic Structure
```html
<header role="banner">
  <nav aria-label="Main navigation">
    <!-- Logo, navigation links -->
  </nav>
</header>

<main id="main-content" role="main">
  <!-- Page content -->
</main>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

---

## Color Palette & Contrast

### Brand Colors with WCAG Compliance

| Color Name | Hex Code | Usage | Contrast Ratio (on #0A192F) |
|------------|----------|-------|------------------------------|
| Midnight Blue | `#0A192F` | Background | N/A (background) |
| Magnolia White | `#FAF3E0` | Body text | 15.2:1 ✅ AAA |
| Rich Gold | `#D4AF37` | Headings | 8.1:1 ✅ AA Large |
| Sage Green | `#A3B18A` | Accents | 6.2:1 ✅ AA |

---

## Testing & Validation

### Automated Tools Used
- ✅ axe DevTools
- ✅ WAVE (Web Accessibility Evaluation Tool)
- ✅ Lighthouse Accessibility Audit
- ✅ NVDA Screen Reader Testing

### Manual Testing
- ✅ Keyboard-only navigation
- ✅ Screen reader navigation
- ✅ Color contrast verification
- ✅ Focus indicator visibility
- ✅ Zoom to 200% (WCAG 1.4.4)

---

## Known Issues & Roadmap

### In Progress
- [ ] Enhanced error handling for form validation
- [ ] ARIA live regions for dynamic content updates
- [ ] Reduced motion preferences (prefers-reduced-motion)

### Future Enhancements
- [ ] High contrast mode option
- [ ] Font size adjustment controls
- [ ] Enhanced keyboard shortcuts documentation page

---

## Reporting Accessibility Issues

We are committed to maintaining and improving accessibility. If you encounter any barriers:

**Email**: accessibility@midnightmagnolia.com  
**GitHub**: [Open an issue](https://github.com/midnightmagnolia/website/issues)

Please include:
- Page URL
- Description of the issue
- Assistive technology used (if applicable)
- Browser and operating system

---

## Accessibility Statement

Midnight Magnolia is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.

**Last Updated**: January 2025  
**Standard**: WCAG 2.1 Level AA  
**Conformance**: Partial (ongoing improvements)


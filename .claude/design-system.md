# PowerHour Design System

## Overview
This document defines the design system for the PowerHour marketing website. The design uses HSL color values for flexibility and supports both light and dark modes.

---

## Color Palette

### Light Mode (Default)
```
--background: 210 15% 94%        # Very light blue-gray background
--foreground: 205 45% 18%        # Dark blue text
--card: 0 0% 100%                # Pure white surfaces
--card-foreground: 205 45% 18%   # Dark blue on cards
--primary: 205 59% 25%           # Strong blue (brand color)
--primary-foreground: 0 0% 100%  # White text on primary
--secondary: 205 35% 35%         # Medium blue (strong brand)
--secondary-foreground: 0 0% 100% # White text on secondary
--tertiary: 210 17% 70%          # Light blue (accent)
--tertiary-foreground: 205 45% 18% # Dark blue on tertiary
--accent: 210 17% 88%            # Very light blue surface
--accent-foreground: 205 45% 18% # Dark blue on accent
--muted: 210 15% 92%             # Light gray background
--muted-foreground: 210 17% 37%  # Medium gray text
--destructive: 0 72% 51%         # Bright red (errors)
--destructive-foreground: 0 0% 100% # White on destructive
--warning: 33 61% 32%            # Orange/amber (warnings)
--success: 146 45% 29%           # Green (success states)
--border: 210 17% 85%            # Light border color
--input: 210 17% 85%             # Input field border
--ring: 205 59% 25%              # Focus ring (primary)
```

### Dark Mode
```
--background: 210 25% 10%        # Very dark blue background
--foreground: 210 15% 95%        # Light gray/white text
--card: 210 25% 13%              # Dark surface
--primary: 205 50% 55%           # Lighter blue (for contrast)
--secondary: 205 35% 25%         # Dark blue
--tertiary: 210 17% 45%          # Medium gray-blue
--accent: 210 20% 22%            # Dark surface variant
--muted: 210 20% 18%             # Dark gray
--muted-foreground: 210 15% 65%  # Light gray text
--destructive: 0 62% 50%         # Red (slightly lighter)
--warning: 33 55% 56%            # Orange (brighter)
--success: 146 42% 46%           # Green (brighter)
--border: 210 20% 22%            # Dark border
--ring: 205 50% 55%              # Focus ring (light blue)
```

### Color Aliases
- **`border`**: Light dividers and borders (hsl(var(--border)))
- **`background`**: Page/container background (hsl(var(--background)))
- **`foreground`**: Primary text color (hsl(var(--foreground)))
- **`bg`**: Alias for background
- **`surface`**: Card/elevated surfaces (hsl(var(--card)))
- **`surface-alt`**: Alternative surface color (hsl(var(--accent)))
- **`text`**: Primary text (hsl(var(--foreground)))
- **`text-muted`**: Secondary/muted text (hsl(var(--muted-foreground)))
- **`brand`**: Primary brand color (hsl(var(--primary)))
- **`brand-strong`**: Secondary brand color (hsl(var(--secondary)))
- **`accent`**: Tertiary accent color (hsl(var(--tertiary)))
- **`danger`**: Error/destructive states (hsl(var(--destructive)))
- **`warning`**: Warning states (hsl(var(--warning)))
- **`success`**: Success states (hsl(var(--success)))

---

## Typography

### Font Families
- **Display Font**: PP Kyoto
  - Used for headings (h1-h6)
  - Weights: 300 (Light), 500 (Medium), 800 (Extrabold)
  - Letter-spacing: -0.02em
  - Line-height: 1.15

- **Body Font**: PP Mori
  - Used for body text and default sans-serif
  - Weights: 400 (Regular), 600 (Semibold)
  - Line-height: 1.6

### Heading Styles
All headings (h1-h6) use:
- Font family: PP Kyoto (var(--font-display))
- Line-height: 1.15
- Letter-spacing: -0.02em

---

## Spacing & Sizing

### Border Radius
- **Card Radius**: `0.75rem` (var(--radius))
- Applied to cards, inputs, and elevated components

### Shadows
- **Card Shadow**: `0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)`
  - Subtle default shadow for cards

- **Card Hover Shadow**: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`
  - Lifted shadow on hover/interaction

### Focus State
- **Focus Ring**: 2px solid border using `--ring` color
- **Outline Offset**: 2px

---

## Animations

### Rise Animation
The site features entrance animations for staggered element reveals:

- **`animate-rise`**: 500ms entrance with `cubic-bezier(0.2, 0.8, 0.2, 1)`
  - Translates from 12px below with 0 opacity → full opacity at final position

- **`animate-rise-delayed`**: 620ms for staggered timing

- **`animate-rise-100/200/300/400/500`**: 550ms animation with 100ms, 200ms, 300ms, 400ms, 500ms delays respectively
  - Creates cascading entrance effect

### Motion Preferences
All animations respect `prefers-reduced-motion: reduce` and are disabled for accessibility.

---

## Hero Section

### Hero Background Gradient
```css
.hero-bg {
  radial-gradient(circle at 15% 20%, hsl(var(--tertiary) / 0.35), transparent 38%),
  radial-gradient(circle at 80% 10%, hsl(var(--primary) / 0.26), transparent 44%),
  linear-gradient(180deg, hsl(var(--accent) / 0.62) 0%, hsl(var(--background) / 0) 100%)
}
```
- Layered radial and linear gradients using brand colors
- Creates depth with subtle color shifts
- Pointer-events: none (doesn't interfere with interactions)

---

## Components

### Available Components
- `site-header`: Navigation header
- `site-footer`: Footer with links/info
- `home-sections`: Home page section layouts
- `hero-shader-gradient`: WebGL shader gradient with Three.js
- `docs-nav`: Documentation navigation
- `sticky-toc`: Sticky table of contents

### Dark Mode Implementation
- Dark mode enabled via `class` strategy in Tailwind
- Add `.dark` class to root element to toggle dark mode
- All colors automatically adjust via CSS custom properties

---

## Tailwind Configuration

### Extending Theme
Colors, fonts, and other tokens are extended in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-sans)"],
      display: ["var(--font-display)"],
    },
    colors: { /* color aliases as listed above */ },
    borderRadius: {
      card: "var(--radius)",
    },
    boxShadow: {
      card: "...",
      "card-hover": "...",
    },
  },
}
```

---

## Usage Guidelines

### Color Usage
- Use semantic color names: `bg-brand`, `text-muted`, `border-border`
- Never hardcode color values; always use Tailwind classes or CSS variables
- Light/dark mode is automatic via CSS variables

### Typography
- Headings: Use `font-display` (automatically applied to h1-h6)
- Body text: Default uses `font-sans` (PP Mori)
- Maintain 1.6 line-height for body text

### Components
- Use `rounded-card` for component borders
- Use `shadow-card` for default elevations
- Use `shadow-card-hover` for interactive states

### Accessibility
- Always include focus states using `focus-visible` (ring applied automatically)
- Respect motion preferences with `prefers-reduced-motion`
- Maintain sufficient contrast between text and background

---

## Dependencies
- **Framework**: Next.js 14.2+
- **Styling**: Tailwind CSS 3.4+
- **UI Enhancements**: ShaderGradient (WebGL), Three.js for advanced visuals
- **Fonts**: Custom PP Kyoto (display) and PP Mori (sans-serif) fonts

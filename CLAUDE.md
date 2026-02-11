# OLMA USA Project

**IMPORTANT: Always update this file after implementing any changes to the project.**

## What This Is
Website for Olma USA — a business that provides **Security/CCTV camera systems** and **POS (Point of Sale) systems**. This is a **template/starting point** being built ahead of full customer requirements. Expect iterative changes as the customer provides branding, copy, and feature requests.

## Tech Stack
- Plain HTML, CSS, vanilla JavaScript — no frameworks, no build tools
- **Formspree** for contact form submission (no backend needed)
- Deployable anywhere (Netlify, GitHub Pages, any static host)

## File Structure
```
index.html          # Single-page scrolling site (all sections in one file)
css/styles.css      # All styles (mobile-first, responsive, CSS custom properties)
js/main.js          # Nav, smooth scroll, form handling, mobile menu, particle animation
assets/images/      # Future images (currently empty)
OLMAUSA_LOGO.jpg    # Original logo file (kept as brand reference, not used in HTML)
CLAUDE.md           # This file — project context for Claude Code
```

## Site Sections (in order)
1. **Navigation** — Fixed/sticky, hamburger on mobile, links: Home, About, Services, Contact
2. **Hero** — Full-viewport, dark gradient with particle network canvas animation, tagline "Empowering Businesses with Tech Solutions", CTA button to contact
3. **About Us** — Company intro (placeholder copy)
4. **Services** — Two cards: Security & CCTV Systems, POS Systems (side-by-side on desktop, stacked on mobile)
5. **Contact** — Formspree form (name, email, phone, message) + contact info sidebar
6. **Footer** — Copyright "2025 Olma Point of Sales & Security", nav links

## Design System
- **Theme**: Dark & professional
- **CSS Custom Properties** (defined in `:root`): `--bg-dark`, `--bg-section`, `--bg-card`, `--text-primary`, `--text-secondary`, `--accent`, `--accent-hover`, `--nav-height`, `--font`
- **Backgrounds**: `#0d0d0d` (dark), `#1a1a1a` (sections), `#242424` (cards)
- **Text**: `#f5f5f5` (primary), `#b0b0b0` (secondary)
- **Accent**: `#00b4d8` (teal) — buttons, links, highlights
- **Logo colors**: `#80ff00` (lime green for "OLMA"), `#ffffff` (white for "POS & SECURITY")
- **Font**: Inter (Google Fonts) with system font fallback
- **Responsive breakpoints**: 768px (tablet), 1024px (desktop)
- **BEM naming**: CSS classes follow BEM convention (e.g., `.nav__logo-brand`, `.card__title`)

## Visual Enhancements
- **Logo**: Pure CSS text logo in the nav — lime green `#80ff00` "OLMA" (font-weight 900, text-stroke for extra boldness) with white "POS & SECURITY" subtitle below. Replaced an original image logo (`OLMAUSA_LOGO.jpg`) that was unreadable at nav size.
- **Particle network**: Canvas-based teal particle animation in hero (60 particles desktop, 30 mobile), with connecting lines. Skips drawing when hero is off-screen for performance. HiDPI-aware.
- **SVG section dividers**: Curved dividers at top of About, Services, Contact sections. Fill matches preceding section's background for smooth flow.
- **Scroll fade-in**: `.fade-in` class with `IntersectionObserver` (15% threshold). Applied to section titles, about content, service cards (staggered 150ms/300ms), contact form & info. `<noscript>` fallback ensures visibility without JS.
- **Accessibility**: All animations respect `prefers-reduced-motion: reduce`. Decorative elements have `aria-hidden="true"`.

## JavaScript Features (js/main.js)
- Sticky nav with background change on scroll
- Mobile hamburger menu toggle (with outside-click close)
- Active nav link highlighting based on scroll position
- Contact form: client-side validation + Formspree fetch submission
- IntersectionObserver-based scroll fade-in animations (with no-IntersectionObserver fallback)
- Particle network canvas system (debounced resize, visibility-gated rendering, reduced-motion aware)

## TODOs / Placeholders
- **Formspree**: Replace `YOUR_FORM_ID` in `index.html` form action with real Formspree endpoint
- **Contact info**: Update email (`info@olmausa.com`) and phone (`(000) 000-0000`) with real values
- **About text**: Replace placeholder copy with real company description
- **Service descriptions**: Swap placeholder text when real copy is available
- **Brand colors**: Accent color `#00b4d8` and logo green `#80ff00` are provisional — update when brand colors are confirmed
- **Images**: No real images yet — add product/service photos when available
- **Deployment**: Not yet deployed — no hosting configured

## Key Decisions Made
- **No frameworks** — intentionally kept as vanilla HTML/CSS/JS for simplicity, fast load times, and easy handoff
- **CSS text logo over image logo** — the original `OLMAUSA_LOGO.jpg` was a black rectangle with text that was unreadable at nav size and clashed with the dark background
- **Single-page layout** — all content in one scrolling page rather than multi-page navigation
- **Dark theme** — chosen as the default aesthetic; customer may request changes

## Preview
```
cd /Users/danob/Projects/olmausa && python3 -m http.server 8000
# Visit http://localhost:8000
```

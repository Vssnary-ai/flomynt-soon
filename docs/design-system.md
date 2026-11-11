# Flomynt Design System (v2.0 - World-Class Bento & Glass)

Generated via `ui-ux-pro-max` intelligence for **AI Workflow Automation SaaS for Agencies (Dark, Premium, Glassmorphic, Trustworthy)**.

---

## 1. Core Principles & Philosophy
- **Name**: Flomynt
- **Signature Experience**: "The Flomynt Wire" — a continuous glowing amber path connecting cards across the page, powering components as the user journeys down.
- **Visual Mood**: Liquid Glass meets OLED Deep Black (#050505) with warm amber radiance (#e9b45b fading from #ffffff).
- **Quality Bar**: Show, don't tell. Zero emoji icons. Pure 1.5px/1px SVG wireframes and live interactive mini-demos.

---

## 2. Color Palette & Tokens (CSS Variables)

```css
:root {
  /* Surfaces & Canvas */
  --bg-canvas: #050505;
  --bg-card: rgba(18, 18, 20, 0.65);
  --bg-card-hover: rgba(24, 24, 28, 0.85);
  --bg-card-highlight: #0d0d0d;
  
  /* Text & Contrast (WCAG AA Compliant >= 4.5:1) */
  --text-primary: #ffffff;
  --text-secondary: #a8a8a8; /* High contrast muted */
  --text-tertiary: #71717a;  /* Subtle captions / borders */
  
  /* Signature Flomynt Amber */
  --accent-amber: #e9b45b;
  --accent-amber-light: #fbe2a7;
  --accent-amber-glow: rgba(233, 180, 91, 0.35);
  --accent-amber-subtle: rgba(233, 180, 91, 0.12);
  --accent-amber-wire: #e9b45b;
  
  /* Hairline Borders */
  --border-hairline: rgba(255, 255, 255, 0.12);
  --border-hairline-bright: rgba(255, 255, 255, 0.24);
  --border-amber-active: rgba(233, 180, 91, 0.6);
  
  /* Glass Surface Tokens */
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-bg-subtle: rgba(255, 255, 255, 0.02);
  --glass-border: rgba(255, 255, 255, 0.10);
  --glass-blur: 24px;
}
```

---

## 3. Typography Scale

Fonts:
- **Headings & Body**: Geist Sans / Inter / Satoshi
- **Monospace Labels, Chips & Tech Badges**: Geist Mono / JetBrains Mono

| Token | Size | Line Height | Tracking | Weight | Used For |
|---|---|---|---|---|---|
| `display-hero` | clamp(44px, 6vw, 76px) | 1.05 | -0.035em | 300 Light | Hero big headings |
| `h1` | clamp(32px, 4vw, 56px) | 1.1 | -0.025em | 300 Light | Section primary headings |
| `h2` | clamp(22px, 2.5vw, 32px) | 1.2 | -0.02em | 400 Regular | Card titles |
| `h3` | 18px - 20px | 1.35 | -0.01em | 400 Regular | Sub-card headers |
| `body-lg` | 17px - 18px | 1.6 | 0 | 300 / 400 | Section lede copy |
| `body-md` | 15px - 16px | 1.55 | 0 | 300 / 400 | Card descriptions |
| `mono-label`| 12px | 1.4 | 0.08em | 500 Medium (Uppercase) | Section tags `[ FEATURES ]`, step badges |
| `mono-sm` | 11px - 12px | 1.3 | 0.06em | 400 Regular (Uppercase) | Buttons, status pills |

*Strict Rule: No body/description text below 14px; no UI micro-labels below 11px.*

---

## 4. Spacing Scale (8px Base Grid)

```
space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-6: 24px
space-8: 32px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px
space-32: 128px
```
- Container Max Width: `1200px` (or `1280px` for bento grid)
- Section Vertical Padding: `120px` desktop / `72px` mobile

---

## 5. Radius & Elevation

- **Pill**: `9999px` (Action buttons, nav pills, status tags)
- **Interactive Container (Input / Cards)**: `16px` to `24px`
- **Inner Demo Surfaces**: `12px`
- **Elevation / Glows**:
  - `card-shadow`: `0 20px 50px rgba(0, 0, 0, 0.65)`
  - `amber-glow-sm`: `0 0 16px rgba(233, 180, 91, 0.25)`
  - `amber-glow-lg`: `0 0 35px rgba(233, 180, 91, 0.45)`

---

## 6. Motion & Animation Rules

- **Easing**: Custom cubic-bezier `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) for snappy, buttery feel.
- **Duration**:
  - Micro-interactions (hover, focus): `150ms - 250ms`
  - Card power-on / reveal: `400ms - 600ms`
  - Ambient pulses: `3s - 5s`
- **Accessibility**:
  - Check `prefers-reduced-motion: reduce`. When active, disable continuous particle drift, parallax scaling, and wire pulse speed.
  - Animations are strictly hardware accelerated (`transform`, `opacity`). Never animate width, height, or margins.

---

## 7. Interactive Component Specs

### 7.1 "The Flomynt Wire" (SVG Path)
- **Role**: Visual spine linking all 7 features in logical lifecycle sequence:
  1. Live Agentic Talk-to-Build (Design)
  2. Pre-Flight Sandbox Verification (Test)
  3. Unlimited Scale & Smart AI Routing (Compute)
  4. 1-Click Self-Healing Engine (Resilience)
  5. Instant White-Label SaaS (Packaging)
  6. Zero-Trust Data Privacy (Security)
  7. Agency Template Marketplace (Distribution)
- **Animation**: Scroll-driven stroke dashoffset reveal + an ambient pulse packet traveling continuously along the wire.
- **Trigger**: When the pulse arrives at a node, the card border activates with an amber specular flash and powers up its live mini-demo.

### 7.2 7 Live Mini-Demos (Interactive Showcase)
1. **TalkToBuildDemo**: Voice waveform + typing prompt -> auto-spawning nodes.
2. **SandboxDemo**: Dynamic verification gauge (0 -> 96%) + instant passing test checklist.
3. **SmartRoutingDemo**: 5 AI providers with simulated latency/cost tier switching and automatic failover pulse.
4. **SelfHealingDemo**: Telegram webhook error simulation + 1-click self-healing patch replay.
5. **WhiteLabelDemo**: Interactive client portal skinning: instant live accent color switcher and branding preview.
6. **ZeroTrustDemo**: Cryptographic SHA-256 signed audit stream with locked key rotation.
7. **MarketplaceDemo**: One-click agency template publisher with API key redacting effect.

---

## 8. Anti-Patterns to Avoid
- ❌ No emoji icons anywhere (use Lucide / customized geometric SVGs).
- ❌ No low contrast gray-on-black (ensure 4.5:1+ contrast on all body text).
- ❌ No tiny unreadable labels below 11px.
- ❌ No touch targets smaller than 44px x 44px on mobile.
- ❌ No flat black backgrounds with zero refraction (ensure ambient lighting blobs shine through glass).
- ❌ No layout shift on card hovers.

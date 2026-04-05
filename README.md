# 📞 Call Control Bar

A premium, production-grade call control bar UI built with **Next.js 14 (App Router)**, **Framer Motion**, and **modern CSS**. Inspired by the motion quality of Linear.app, the polish of Stripe, and Apple's interaction detail.

---

## ✨ Features

### 🎥 Motion System
- **Spring-only animations** — zero cubic-bezier shortcuts; all physics-based
- **Icon crossfade morphs** — active/inactive icon swap with blur + scale + rotate
- **Staggered bar entrance** — each button animates in on mount with child variants
- **AnimatePresence** on every mount/unmount — menus, tooltips, glows, ripples

### 🖱️ Micro-interactions
| Interaction | Detail |
|---|---|
| **Magnetic hover** | Buttons subtly translate toward cursor via `useMotionValue` |
| **Press compression** | `scale: 0.94` spring bounce on click |
| **Ripple effect** | Radial expand on every click, position-accurate |
| **Hover bloom** | Soft radial glow expands behind button on hover |
| **Icon lift** | Icons scale + shadow on hover |

### 🎙️ Mic Button
- Animated **audio wave bars** (10 bars, staggered breathing animation) when mic is ON
- Smooth icon swap: `Mic` ↔ `MicOff` with blur morph
- Radial glow pulse (breathing) when active
- Dim/desaturated when muted

### 📷 Camera Button
- Same icon swap system as mic
- Active glow when camera is on

### 🖥️ Screen Share
- Green tinted active state (`rgba(26, 180, 96, 0.12)`)
- Icon morphs between `MonitorUp` ↔ `MonitorX`

### ✋ Raise Hand
- Emoji icon with shake animation on activate

### ⚙️ Options Menu
- **Glassmorphism** — `backdrop-filter: blur(40px) saturate(180%)`
- Scale + opacity + Y-translate entrance with spring
- 5 menu items with stagger children
- **Shared layout hover bg** via Framer `layoutId`
- Chevron animates on hover
- Keyboard shortcuts shown
- Full keyboard nav: `↑` `↓` `Enter` `Space` `Escape`
- Outside-click to close
- Focus managed on open/close

### 📞 Hangup Button
- Strong red `#D12525` with inner gradient
- **Idle pulse ring** — expanding box-shadow animation
- Hover glow intensifies
- **Shake animation** on click
- Deep compression `scale: 0.91` on press

### 💎 Wow Factor
1. **Animated audio wave** — 10 bars, each with unique staggered breathing
2. **Breathing glow** — active buttons emit a pulsing radial glow
3. **Ripple click animation** — accurate to pointer position
4. **Magnetic movement** — buttons respond to cursor proximity
5. **Dynamic shadow** — hover state deepens button shadows

### ♿ Accessibility (WCAG 2.2 AA)
- `aria-label` on all buttons
- `aria-pressed` state on toggle buttons
- `role="toolbar"` on bar, `role="menu"` + `role="menuitem"` on options
- Full keyboard: `Tab` navigation, `Enter`/`Space` activation, `Escape` closes
- Visible `:focus-visible` ring (2px cyan)
- 48px minimum touch target on all buttons
- `prefers-reduced-motion` — disables all animations via CSS

---

## 🚀 Setup

### Prerequisites
- Node.js 18.17+ 
- npm

### NPM Install & Run

```bash

# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
open http://localhost:3000
```

### Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
call-control-bar/
├── app/
│   ├── layout.tsx          # Root layout with global CSS import
│   ├── page.tsx            # Demo page with ambient bg + video grid
│   └── page.module.css     # Page styles
│
├── components/
│   ├── call-control/
│   │   ├── CallControlBar.tsx        # Main bar — composes all buttons
│   │   ├── CallControlBar.module.css
│   │   ├── ControlButton.tsx         # Reusable toggle button (mic, cam, etc.)
│   │   ├── ControlButton.module.css
│   │   ├── HangupButton.tsx          # Red end-call button
│   │   ├── HangupButton.module.css
│   │   ├── OptionsMenu.tsx           # MoreHorizontal → glassmorphic menu
│   │   └── OptionsMenu.module.css
│   │
│   └── ui/
│       ├── Tooltip.tsx               # Animated tooltip (AnimatePresence)
│       └── Tooltip.module.css
│
├── lib/
│   └── motion.ts           # All Framer Motion variants + spring configs
│
├── styles/
│   ├── variables.css       # Design tokens (colors, spacing, shadows)
│   └── globals.css         # Reset + global styles
│
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🎨 Design Tokens

All values live in `styles/variables.css`:

| Token | Value |
|---|---|
| `--color-bg-bar` | `rgba(0,0,0,0.72)` |
| `--color-danger` | `#D12525` |
| `--color-accent-glow` | `rgba(99,213,255,0.18)` |
| `--btn-size` | `48px` |
| `--btn-radius` | `10px` |
| `--bar-radius` | `16px` |

---

## 🧪 Motion Config

All animation configs in `lib/motion.ts`:

| Config | stiffness | damping | Use |
|---|---|---|---|
| `springSnappy` | 320 | 24 | Button press, icon swap |
| `springGentle` | 260 | 28 | Menu entrance, bar entrance |
| `springBouncy` | 400 | 20 | Hangup button |
| `springMedium` | 280 | 22 | General purpose |

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14.2 | App Router, SSR |
| React | 18.3 | UI framework |
| Framer Motion | 11 | All animations |
| Lucide React | 0.400 | Icons |
| TypeScript | 5 | Type safety |
| CSS Modules | — | Scoped styling |

---

## 📸 What You'll See

- **Dark ambient background** with animated color blobs + grain texture
- **4-tile video call grid** (mocked) with participant names
- **Floating call control bar** at bottom center
- Hover over any button → tooltip + magnetic movement
- Click mic → wave bars animate, icon morphs
- Click camera → icon morphs, glow fades
- Click screen share → green active state
- Click `···` → glassmorphic menu slides up
- Click red button → shake + ripple

---

*Built as a UI/motion showcase. No real media device APIs are used.*

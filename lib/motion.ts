import type { Variants, Transition } from "framer-motion";

// ─── Spring presets ────────────────────────────────────────────────────
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 24,
  mass: 0.8,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 1,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 20,
  mass: 0.6,
};

export const springMedium: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 22,
  mass: 0.9,
};

// ─── Button press ──────────────────────────────────────────────────────
export const buttonPressVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.06 },
  press: { scale: 0.94 },
};

export const buttonPressTransition: Transition = springSnappy;

// ─── Icon swap (active / inactive) ────────────────────────────────────
export const iconSwapVariants: Variants = {
  enter: { opacity: 0, scale: 0.6, rotate: -12, filter: "blur(3px)" },
  center: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.6, rotate: 12, filter: "blur(3px)" },
};

export const iconSwapTransition: Transition = {
  ...springSnappy,
  opacity: { duration: 0.14 },
  filter: { duration: 0.14 },
};

// ─── Slash (muted overlay) ─────────────────────────────────────────────
export const slashVariants: Variants = {
  enter: { pathLength: 0, opacity: 0 },
  center: { pathLength: 1, opacity: 1 },
  exit: { pathLength: 0, opacity: 0 },
};

export const slashTransition: Transition = {
  pathLength: { type: "spring", stiffness: 260, damping: 22 },
  opacity: { duration: 0.1 },
};

// ─── Glow pulse (breathing) ────────────────────────────────────────────
export const glowPulseVariants: Variants = {
  idle: { opacity: 0.5, scale: 1 },
  pulse: {
    opacity: [0.5, 0.85, 0.5],
    scale: [1, 1.15, 1],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ─── Ripple ────────────────────────────────────────────────────────────
export const rippleVariants: Variants = {
  start: { scale: 0, opacity: 0.5 },
  end: {
    scale: 2.8,
    opacity: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Options menu ──────────────────────────────────────────────────────
export const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 12,
    transformOrigin: "bottom center",
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...springGentle, staggerChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 8,
    filter: "blur(4px)",
    transition: { ...springSnappy, duration: 0.16 },
  },
};

export const menuItemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: springSnappy },
  exit: { opacity: 0, x: -4, transition: { duration: 0.1 } },
};

// ─── Tooltip ───────────────────────────────────────────────────────────
export const tooltipVariants: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springSnappy, delay: 0.35 },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.92,
    transition: { duration: 0.1 },
  },
};

// ─── Bar entrance ──────────────────────────────────────────────────────
export const barEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.92, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...springGentle, staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const barChildVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springSnappy },
};

// ─── Danger idle pulse ─────────────────────────────────────────────────
export const dangerPulseVariants: Variants = {
  idle: { boxShadow: "0 0 0 0px rgba(209,37,37,0.0)" },
  pulse: {
    boxShadow: [
      "0 0 0 0px rgba(209,37,37,0.0)",
      "0 0 0 6px rgba(209,37,37,0.25)",
      "0 0 0 0px rgba(209,37,37,0.0)",
    ],
    transition: { duration: 2.8, repeat: Infinity, ease: "easeOut" },
  },
};

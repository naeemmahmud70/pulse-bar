'use client';

import { useState, useCallback, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  buttonPressVariants,
  buttonPressTransition,
  iconSwapVariants,
  iconSwapTransition,
  glowPulseVariants,
  rippleVariants,
  springSnappy,
} from '@/lib/motion';
import { Tooltip } from '@/components/ui/Tooltip';
import styles from './ControlButton.module.css';

export interface ControlButtonProps {
  /** Icon to show when active/on */
  iconOn: ReactNode;
  /** Icon to show when inactive/off — if undefined, same icon is shown dimmed */
  iconOff?: ReactNode;
  /** Whether the button is currently active */
  isActive: boolean;
  /** Accessible label */
  ariaLabel: string;
  /** Tooltip text */
  tooltip: string;
  /** Toggle callback */
  onToggle: () => void;
  /** Show animated audio wave (mic button) */
  showWave?: boolean;
  /** Accent color CSS var override */
  accentVar?: string;
  /** Extra class */
  className?: string;
  /** Whether this is a "danger" variant */
  danger?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let rippleCounter = 0;

export function ControlButton({
  iconOn,
  iconOff,
  isActive,
  ariaLabel,
  tooltip,
  onToggle,
  showWave = false,
  className,
}: ControlButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Magnetic hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const translateX = useTransform(mouseX, [-24, 24], [-4, 4]);
  const translateY = useTransform(mouseY, [-24, 24], [-3, 3]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setShowTooltip(false);
  }, [mouseX, mouseY]);

  const spawnRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleCounter++;
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    spawnRipple(e);
    onToggle();
  }, [spawnRipple, onToggle]);

  const currentVariant = isPressed ? 'press' : isHovered ? 'hover' : 'idle';

  return (
    <div className={styles.wrapper}>
      <motion.button
        ref={btnRef}
        className={[
          styles.button,
          isActive ? styles.active : styles.inactive,
          className,
        ].filter(Boolean).join(' ')}
        aria-label={ariaLabel}
        aria-pressed={isActive}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setIsHovered(true); setShowTooltip(true); }}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPressed(true); }}
        onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPressed(false); }}
        style={{ x: translateX, y: translateY }}
        variants={buttonPressVariants}
        animate={currentVariant}
        transition={buttonPressTransition}
        layout
      >
        {/* Glow background when active */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              className={styles.glow}
              variants={glowPulseVariants}
              initial="idle"
              animate="pulse"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          )}
        </AnimatePresence>

        {/* Ripples */}
        <AnimatePresence>
          {ripples.map(r => (
            <motion.span
              key={r.id}
              className={styles.ripple}
              style={{ left: r.x, top: r.y }}
              variants={rippleVariants}
              initial="start"
              animate="end"
            />
          ))}
        </AnimatePresence>

        {/* Icon swap */}
        <span className={styles.iconWrap} aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isActive ? 'on' : 'off'}
              className={styles.iconInner}
              variants={iconSwapVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={iconSwapTransition}
            >
              {isActive ? iconOn : (iconOff ?? iconOn)}
            </motion.span>
          </AnimatePresence>
        </span>

        {/* Audio wave bars (mic on) */}
        {showWave && isActive && (
          <motion.span
            className={styles.waveWrap}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={springSnappy}
          >
            <AudioWave />
          </motion.span>
        )}

        {/* OFF slash overlay */}
        <AnimatePresence>
          {!isActive && iconOff === undefined && (
            <motion.span
              className={styles.slashWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg viewBox="0 0 20 20" fill="none" width={20} height={20}>
                <motion.line
                  x1="3" y1="3" x2="17" y2="17"
                  stroke="rgba(255,80,80,0.80)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Hover bloom */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              className={styles.bloom}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springSnappy}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <Tooltip label={tooltip} visible={showTooltip} />
    </div>
  );
}

// ─── Audio Wave ─────────────────────────────────────────────────────────
const BARS = [3, 5, 7, 5, 8, 6, 4, 7, 5, 3];

function AudioWave() {
  return (
    <span className={styles.wave} aria-hidden="true">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className={styles.waveBar}
          animate={{ scaleY: [1, h / 4, 1, h / 6, 1] }}
          transition={{
            duration: 0.9 + i * 0.07,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.06,
          }}
          style={{ '--bar-base': `${h * 1.5}px` } as React.CSSProperties}
        />
      ))}
    </span>
  );
}

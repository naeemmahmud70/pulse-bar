"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneOff } from "lucide-react";
import {
  dangerPulseVariants,
  rippleVariants,
  springSnappy,
  springBouncy,
} from "@/lib/motion";
import { Tooltip } from "@/components/ui/Tooltip";
import styles from "./HangupButton.module.css";

interface HangupButtonProps {
  onHangup: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}
let ripId = 0;

export function HangupButton({ onHangup }: HangupButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [showTip, setShowTip] = useState(false);
  const [isHov, setIsHov] = useState(false);
  const [isPres, setIsPres] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const spawnRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = ripId++;
    setRipples((p) => [
      ...p,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 600);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      spawnRipple(e);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      onHangup();
    },
    [spawnRipple, onHangup],
  );

  return (
    <div className={styles.wrapper}>
      <motion.button
        className={styles.button}
        aria-label="End call"
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHov(true);
          setShowTip(true);
        }}
        onMouseLeave={() => {
          setIsHov(false);
          setShowTip(false);
        }}
        onMouseDown={() => setIsPres(true)}
        onMouseUp={() => setIsPres(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsPres(true);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsPres(false);
        }}
        animate={
          [
            isPres ? "press" : isHov ? "hover" : "idle",
            isShaking ? "shake" : "",
          ].filter(Boolean) as string[]
        }
        variants={{
          idle: { scale: 1, rotate: 0 },
          hover: { scale: 1.08 },
          press: { scale: 0.91 },
          shake: {
            rotate: [0, -8, 8, -5, 5, -2, 2, 0],
            transition: { duration: 0.45, ease: "easeInOut" },
          },
        }}
        transition={springBouncy}
      >
        {/* Idle pulse ring */}
        <motion.span
          className={styles.pulseRing}
          variants={dangerPulseVariants}
          initial="idle"
          animate="pulse"
        />

        {/* Hover glow */}
        <AnimatePresence>
          {isHov && (
            <motion.span
              className={styles.hoverGlow}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springSnappy}
            />
          )}
        </AnimatePresence>

        {/* Ripples */}
        <AnimatePresence>
          {ripples.map((r) => (
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

        <span className={styles.icon} aria-hidden="true">
          <PhoneOff size={20} />
        </span>
      </motion.button>

      <Tooltip label="End call" visible={showTip} />
    </div>
  );
}

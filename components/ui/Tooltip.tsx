"use client";

import { AnimatePresence, motion } from "framer-motion";
import { tooltipVariants } from "@/lib/motion";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  label: string;
  visible: boolean;
}

export function Tooltip({ label, visible }: TooltipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.tooltip}
          role="tooltip"
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {label}
          <span className={styles.arrow} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

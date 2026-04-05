"use client";

import { motion } from "framer-motion";
import { CallControlBar } from "@/components/call-control/CallControlBar";
import styles from "./page.module.css";

const participants = ["Jane Doe", "Alex Kim", "Sam Reyes", "Morgan E."];

export default function Page() {
  return (
    <main className={styles.main}>
      {/* Ambient background */}
      <div className={styles.ambientBg} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        <div className={styles.grain} />
      </div>

      {/* Simulated video grid */}
      <div className={styles.videoGrid} aria-hidden="true">
        {participants.map((name, i) => {
          const nameParts = name.trim().split(" ");
          const initials =
            nameParts.length >= 2
              ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
              : name.slice(0, 2).toUpperCase();

          return (
            <motion.div
              key={name}
              className={styles.videoTile}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 24,
              }}
            >
              <div className={styles.avatarRing}>
                <span className={styles.avatarInitial}>{initials}</span>
              </div>
              <div className={styles.tileInfo}>
                <span className={styles.tileName}>{name}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Call Control Bar ── */}
      <div className={styles.barWrapper}>
        <CallControlBar />
      </div>
    </main>
  );
}

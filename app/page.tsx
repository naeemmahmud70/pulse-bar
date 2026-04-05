'use client';

import { motion } from 'framer-motion';
import { CallControlBar } from '@/components/call-control/CallControlBar';
import styles from './page.module.css';

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
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.videoTile}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 24 }}
          >
            <div className={styles.avatarRing}>
              <span className={styles.avatarInitial}>
                {['JD', 'AK', 'SR', 'ME'][i]}
              </span>
            </div>
            <div className={styles.tileInfo}>
              <span className={styles.tileName}>
                {['Jane Doe', 'Alex Kim', 'Sam Reyes', 'Morgan E.'][i]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Call Control Bar ── */}
      <div className={styles.barWrapper}>
        <CallControlBar />
      </div>
    </main>
  );
}

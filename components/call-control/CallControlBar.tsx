'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Mic, MicOff,
  Video, VideoOff,
  MonitorUp, MonitorX,
  Hand,
} from 'lucide-react';
import { barEntranceVariants, barChildVariants } from '@/lib/motion';
import { ControlButton } from './ControlButton';
import { HangupButton } from './HangupButton';
import { OptionsMenu } from './OptionsMenu';
import styles from './CallControlBar.module.css';

interface CallState {
  micActive: boolean;
  cameraActive: boolean;
  screenActive: boolean;
  handRaised: boolean;
  callActive: boolean;
}

export function CallControlBar() {
  const [state, setState] = useState<CallState>({
    micActive: true,
    cameraActive: true,
    screenActive: false,
    handRaised: false,
    callActive: true,
  });

  const toggle = useCallback((key: keyof CallState) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleHangup = useCallback(() => {
    setState(prev => ({ ...prev, callActive: false }));
    // Visual reset after "end call"
    setTimeout(() => setState(prev => ({ ...prev, callActive: true })), 1800);
  }, []);

  return (
    <motion.div
      className={styles.bar}
      role="toolbar"
      aria-label="Call controls"
      variants={barEntranceVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Inner highlight stripe */}
      <span className={styles.topHighlight} aria-hidden="true" />

      {/* ── Mic ────────────────────────────── */}
      <motion.div variants={barChildVariants}>
        <ControlButton
          iconOn={<Mic size={20} />}
          iconOff={<MicOff size={20} />}
          isActive={state.micActive}
          ariaLabel={state.micActive ? 'Mute microphone' : 'Unmute microphone'}
          tooltip={state.micActive ? 'Mute' : 'Unmute'}
          onToggle={() => toggle('micActive')}
          showWave
        />
      </motion.div>

      {/* ── Camera ─────────────────────────── */}
      <motion.div variants={barChildVariants}>
        <ControlButton
          iconOn={<Video size={20} />}
          iconOff={<VideoOff size={20} />}
          isActive={state.cameraActive}
          ariaLabel={state.cameraActive ? 'Stop video' : 'Start video'}
          tooltip={state.cameraActive ? 'Stop video' : 'Start video'}
          onToggle={() => toggle('cameraActive')}
        />
      </motion.div>

      {/* ── Divider ────────────────────────── */}
      <motion.span
        className={styles.divider}
        variants={barChildVariants}
        aria-hidden="true"
      />

      {/* ── Screen share ───────────────────── */}
      <motion.div variants={barChildVariants}>
        <ControlButton
          iconOn={<MonitorUp size={20} />}
          iconOff={<MonitorX size={20} />}
          isActive={state.screenActive}
          ariaLabel={state.screenActive ? 'Stop sharing' : 'Share screen'}
          tooltip={state.screenActive ? 'Stop sharing' : 'Share screen'}
          onToggle={() => toggle('screenActive')}
          className={state.screenActive ? styles.shareActive : ''}
        />
      </motion.div>

      {/* ── Raise hand ─────────────────────── */}
      <motion.div variants={barChildVariants}>
        <ControlButton
          iconOn={
            <motion.span
              animate={state.handRaised ? { rotate: [0, -12, 12, -8, 8, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex' }}
            >
              <span style={{ fontSize: 18 }}>✋</span>
            </motion.span>
          }
          isActive={state.handRaised}
          ariaLabel={state.handRaised ? 'Lower hand' : 'Raise hand'}
          tooltip={state.handRaised ? 'Lower hand' : 'Raise hand'}
          onToggle={() => toggle('handRaised')}
        />
      </motion.div>

      {/* ── Divider ────────────────────────── */}
      <motion.span
        className={styles.divider}
        variants={barChildVariants}
        aria-hidden="true"
      />

      {/* ── Options ────────────────────────── */}
      <motion.div variants={barChildVariants}>
        <OptionsMenu />
      </motion.div>

      {/* ── Hangup ─────────────────────────── */}
      <motion.div variants={barChildVariants}>
        <HangupButton onHangup={handleHangup} />
      </motion.div>
    </motion.div>
  );
}

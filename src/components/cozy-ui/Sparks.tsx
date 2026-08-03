import type { CSSProperties } from 'react';
import styles from './Sparks.module.css';

/**
 * Uneven angles and distances, not an even radial fan — a hand-flicked
 * scatter reads more like a real spark burst than a symmetric one.
 */
const PARTICLES = [
  { tx: 20, ty: -9, size: 3.6, delay: 0, color: 'var(--color-yellow-primary)' },
  { tx: -21, ty: -11, size: 3, delay: 30, color: 'var(--color-brand-brown)' },
  { tx: 22, ty: 10, size: 3.2, delay: 15, color: 'var(--color-capy-nose)' },
  { tx: -18, ty: 14, size: 2.6, delay: 45, color: 'var(--color-brand-brown)' },
  { tx: 3, ty: -22, size: 3, delay: 10, color: 'var(--color-yellow-primary)' },
  { tx: -4, ty: 21, size: 2.6, delay: 35, color: 'var(--color-capy-nose)' },
] as const;

/** Small particles that burst outward once, timed alongside the checkmark's hand-drawn reveal. */
export function Sparks() {
  return (
    <span className={styles.sparks} aria-hidden>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={styles.spark}
          style={
            {
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              '--spark-size': `${p.size}px`,
              background: p.color,
              animationDelay: `${p.delay}ms`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

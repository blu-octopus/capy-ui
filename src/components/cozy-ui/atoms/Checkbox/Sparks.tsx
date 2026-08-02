import type { CSSProperties } from 'react';
import styles from './Sparks.module.css';

/**
 * Uneven angles and distances, not an even radial fan — a hand-flicked
 * scatter reads more like a real spark burst than a symmetric one.
 */
const PARTICLES = [
  { tx: 14, ty: -6, size: 2.2, delay: 0, color: 'var(--color-yellow-primary)' },
  { tx: -15, ty: -8, size: 1.8, delay: 30, color: 'var(--color-brand-brown)' },
  { tx: 16, ty: 7, size: 2, delay: 15, color: 'var(--color-green-primary)' },
  { tx: -13, ty: 10, size: 1.6, delay: 45, color: 'var(--color-blue-primary)' },
  { tx: 2, ty: -16, size: 1.8, delay: 10, color: 'var(--color-yellow-primary)' },
  { tx: -3, ty: 15, size: 1.6, delay: 35, color: 'var(--color-brand-brown)' },
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

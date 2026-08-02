import * as React from 'react';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
import styles from './TrendCard.module.css';

/**
 * One number in the card's stat row.
 *
 * @example
 * { value: '2/4', unit: 'completed' }
 * { value: 12, unit: 'hr' } // paired with a second stat: { value: 40, unit: 'min' }
 */
export interface TrendCardStat {
  /** The large number/fraction itself — a string or number, rendered as-is (no formatting applied). */
  value: React.ReactNode;
  /** Small trailing label, e.g. "completed", "hr", "min". Omit for a bare number. */
  unit?: React.ReactNode;
}

export interface TrendCardProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  /** One stat renders as a single big number; two render side by side (e.g. "12 hr" + "40 min"). */
  stats: [TrendCardStat] | [TrendCardStat, TrendCardStat];
  /** Small element pinned top-right of the title, e.g. a `<ProgressRing />`. */
  indicator?: React.ReactNode;
}

export const TrendCard = React.forwardRef<HTMLDivElement, TrendCardProps>(function TrendCard(
  { title, stats, indicator, className, ...props },
  ref,
) {
  const [setRef, size] = useElementSize<HTMLDivElement>(ref);
  return (
    <div ref={setRef} className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      <WobbleBorder width={size.width} height={size.height} radius={10} seed={6} />
      <span className={styles.title}>{title}</span>
      {indicator && <div className={styles.indicator}>{indicator}</div>}
      <div className={styles.stats}>
        {stats.map((stat, i) => (
          <span key={i}>
            <span className={styles.value}>{stat.value}</span>
            {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
          </span>
        ))}
      </div>
    </div>
  );
});

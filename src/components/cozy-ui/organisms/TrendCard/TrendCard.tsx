import * as React from 'react';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
import styles from './TrendCard.module.css';

export interface TrendCardStat {
  value: React.ReactNode;
  unit?: React.ReactNode;
}

export interface TrendCardProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  /** One stat renders as a single big number; two render side by side (e.g. "12 hr" + "40 min"). */
  stats: [TrendCardStat] | [TrendCardStat, TrendCardStat];
  indicator?: React.ReactNode;
}

export const TrendCard = React.forwardRef<HTMLDivElement, TrendCardProps>(function TrendCard(
  { title, stats, indicator, className, ...props },
  ref,
) {
  const [setRef, size] = useElementSize<HTMLDivElement>(ref);
  return (
    <div ref={setRef} className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      <WobbleBorder
        width={size.width}
        height={size.height}
        radius={10}
        strokeWidth={0.5}
        color="var(--color-brand-grey)"
        seed={6}
        frequency={0.05}
        wiggle={0.8}
        widthVariance={0.5}
      />
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

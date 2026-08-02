import * as React from 'react';
import { useHandDrawnFilter } from '../../HandDrawnFilterDefs';
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
  { title, stats, indicator, className, style, ...props },
  ref,
) {
  const { filterId, filter } = useHandDrawnFilter({ scale: 1, seed: 6 });
  return (
    <div
      ref={ref}
      className={[styles.card, className].filter(Boolean).join(' ')}
      style={{ ...style, '--wobble-filter': `url(#${filterId})` } as React.CSSProperties}
      {...props}
    >
      {filter}
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

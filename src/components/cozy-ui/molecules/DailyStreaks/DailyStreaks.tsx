import * as React from 'react';
import { Checkbox } from '../../atoms/Checkbox';
import styles from './DailyStreaks.module.css';

export interface DailyStreaksRow {
  label: string;
  /** One entry per day column; missing days are treated as unchecked. */
  checked: boolean[];
}

export interface DailyStreaksProps extends React.ComponentPropsWithoutRef<'div'> {
  heading?: string;
  days?: string[];
  rows: DailyStreaksRow[];
}

export const DailyStreaks = React.forwardRef<HTMLDivElement, DailyStreaksProps>(function DailyStreaks(
  { heading = 'Streaks', days = ['M', 'T', 'W', 'T', 'F'], rows, className, style, ...props },
  ref,
) {
  const gridStyle = { '--day-count': days.length, ...style } as React.CSSProperties;
  return (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(' ')} style={gridStyle} {...props}>
      <span className={styles.heading}>{heading}</span>
      <div className={styles.header}>
        <span />
        {days.map((day, i) => (
          <span key={i} className={styles.dayLabel}>
            {day}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <span className={styles.rowLabel}>{row.label}</span>
          {days.map((_, i) => (
            <span key={i} className={styles.cell}>
              <Checkbox checked={row.checked[i] ?? false} readOnly />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
});

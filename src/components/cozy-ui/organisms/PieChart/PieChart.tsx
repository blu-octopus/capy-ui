import * as React from 'react';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
import styles from './PieChart.module.css';

/**
 * One wedge. Wedges are drawn in array order starting at 12 o'clock; `value`
 * is unitless — it's normalized against the sum of every datum's `value`, so
 * pass raw counts/minutes/whatever, not pre-computed percentages.
 *
 * @example
 * { label: 'study', value: 30, color: 'var(--color-green-secondary)' }
 */
export interface PieChartDatum {
  /** Shown in the legend and as the tooltip/title on hover. */
  label: string;
  /** This wedge's share of the total — normalized against the sum of all data's `value`, not a 0-100 percent. */
  value: number;
  /** Wedge fill and legend dot color — any valid CSS color, typically a `var(--color-*-secondary)` token. */
  color: string;
}

export interface PieChartProps extends React.ComponentPropsWithoutRef<'div'> {
  /** @default 'Categories' */
  title?: string;
  /** Wedges in draw order — see `PieChartDatum`. */
  data: PieChartDatum[];
  /** Diameter of the pie itself, in px (the card grows to fit). @default 120 */
  size?: number;
}

function wedgePath(center: number, radius: number, startPct: number, endPct: number) {
  const angleFor = (pct: number) => (pct / 100) * 2 * Math.PI - Math.PI / 2;
  const start = angleFor(startPct);
  const end = angleFor(endPct);
  const x1 = center + radius * Math.cos(start);
  const y1 = center + radius * Math.sin(start);
  const x2 = center + radius * Math.cos(end);
  const y2 = center + radius * Math.sin(end);
  const largeArc = endPct - startPct > 50 ? 1 : 0;
  return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

/**
 * Figma's own secondary-palette colors fail colorblind/contrast validation when
 * used categorically (e.g. grey vs. red ΔE 9.8, below the 15 floor) — see
 * PieChart.stories.tsx. Rather than silently substituting different brand
 * colors, this renders the spec as designed and leans on the mitigations the
 * dataviz guidance allows short of a repaint: thin surface gaps between
 * wedges, text-based legend labels (identity never rests on color alone), and
 * a numeric readout in both the legend and the hover tooltip.
 */
export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(function PieChart(
  { title = 'Categories', data, size = 120, className, ...props },
  ref,
) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cursor = 0;
  const center = size / 2;
  const [setRef, boxSize] = useElementSize<HTMLDivElement>(ref);

  return (
    <div ref={setRef} className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      <WobbleBorder width={boxSize.width} height={boxSize.height} radius={10} seed={7} />
      <span className={styles.title}>{title}</span>
      <div className={styles.body}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((d) => {
            const pct = (d.value / total) * 100;
            const start = cursor;
            const end = cursor + pct;
            cursor = end;
            return (
              <path
                key={d.label}
                d={wedgePath(center, center, start, end)}
                fill={d.color}
                stroke="var(--color-brand-white)"
                strokeWidth={2}
              >
                <title>{`${d.label}: ${Math.round(pct)}%`}</title>
              </path>
            );
          })}
        </svg>
        <ul className={styles.legend}>
          {data.map((d) => (
            <li key={d.label} className={styles.legendRow}>
              <span className={styles.dot} style={{ background: d.color }} />
              <span className={styles.label}>{d.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

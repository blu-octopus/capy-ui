import * as React from 'react';
import { useHandDrawnFilter } from '../../HandDrawnFilterDefs';
import styles from './BarChart.module.css';

export interface BarChartDatum {
  value: number;
  /** Only some bars carry an x-axis label in the Figma reference (e.g. every other one). */
  label?: string;
}

export interface BarChartProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  data: BarChartDatum[];
  /** @default smallest multiple of 30 at or above the largest value */
  max?: number;
  unit?: string;
  barColor?: string;
}

const PLOT_WIDTH = 250;
const PLOT_HEIGHT = 90;
const LEFT_MARGIN = 42;
const TOP_MARGIN = 8;
const BOTTOM_MARGIN = 20;
const BAR_RADIUS = 4;

function barPath(x: number, width: number, top: number, bottom: number, radius: number) {
  const r = Math.min(radius, width / 2, Math.max(bottom - top, 0));
  if (r <= 0) return `M ${x} ${top} H ${x + width} V ${bottom} H ${x} Z`;
  return `M ${x} ${top + r}
    A ${r} ${r} 0 0 1 ${x + r} ${top}
    H ${x + width - r}
    A ${r} ${r} 0 0 1 ${x + width} ${top + r}
    V ${bottom}
    H ${x} Z`;
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  { title, data, max, unit = 'min', barColor, className, style, ...props },
  ref,
) {
  const { filterId, filter } = useHandDrawnFilter({ scale: 1, seed: 8 });
  const dataMax = Math.max(...data.map((d) => d.value), 1);
  const axisMax = max ?? (Math.ceil(dataMax / 30) * 30 || 30);
  const ticks = [axisMax / 3, (axisMax * 2) / 3, axisMax];

  const width = LEFT_MARGIN + PLOT_WIDTH;
  const height = TOP_MARGIN + PLOT_HEIGHT + BOTTOM_MARGIN;
  const gap = 6;
  const barWidth = (PLOT_WIDTH - gap * (data.length - 1)) / data.length;

  return (
    <div
      ref={ref}
      className={[styles.card, className].filter(Boolean).join(' ')}
      style={{ ...style, '--wobble-filter': `url(#${filterId})` } as React.CSSProperties}
      {...props}
    >
      {filter}
      {title && <span className={styles.title}>{title}</span>}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(0, ${TOP_MARGIN})`}>
        {ticks.map((t) => {
          const y = PLOT_HEIGHT - (t / axisMax) * PLOT_HEIGHT;
          return (
            <text key={t} x={LEFT_MARGIN - 6} y={y + 4} textAnchor="end" className={styles.gridLabel}>
              {t} {unit}
            </text>
          );
        })}
        <line
          x1={LEFT_MARGIN}
          y1={0}
          x2={LEFT_MARGIN}
          y2={PLOT_HEIGHT}
          stroke="var(--color-brand-black)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={LEFT_MARGIN}
          y1={PLOT_HEIGHT}
          x2={LEFT_MARGIN + PLOT_WIDTH}
          y2={PLOT_HEIGHT}
          stroke="var(--color-brand-black)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {data.map((d, i) => {
          const x = LEFT_MARGIN + i * (barWidth + gap);
          const barHeight = (d.value / axisMax) * PLOT_HEIGHT;
          const top = PLOT_HEIGHT - barHeight;
          return (
            <g key={i}>
              <path
                d={barPath(x, barWidth, top, PLOT_HEIGHT, BAR_RADIUS)}
                className={barColor ? undefined : styles.bar}
                fill={barColor}
              >
                <title>
                  {d.value} {unit}
                </title>
              </path>
              {d.label && (
                <text x={x + barWidth / 2} y={PLOT_HEIGHT + 16} className={styles.xLabel}>
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
        </g>
      </svg>
    </div>
  );
});

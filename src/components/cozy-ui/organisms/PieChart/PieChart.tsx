import * as React from 'react';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
import { ChartTooltip } from '../../ChartTooltip';
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
  /** Shown in the legend and as the tooltip title on hover. */
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
  /** Fires on hover-in/out (desktop) with the wedge's index, or `null` on hover-out. Tapping a wedge on touch devices also fires this, immediately followed by `onSliceClick`. */
  onSliceHover?: (index: number | null) => void;
  /** Fires when a wedge (or its legend row) is clicked or tapped — wire this up for drill-down/detail views. */
  onSliceClick?: (datum: PieChartDatum, index: number) => void;
  /** Formats the tooltip's value line, given the datum and its rounded percent. @default `${percent}% · ${value}` */
  formatTooltipValue?: (datum: PieChartDatum, percent: number) => React.ReactNode;
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
 * a numeric readout in both the legend and the hover/press tooltip.
 *
 * Hover (mouse) and press (touch — tapping a wedge pins its tooltip open
 * until something else is tapped) both drive the same active-wedge state,
 * following the pattern in Lucid UI's `PieChart`: hovering scales the
 * active wedge up slightly and raises one shared tooltip anchored above the
 * pie, its content swapped to match — rather than moving a tooltip to chase
 * each wedge's own position, which reads as jumpier for a shape this small.
 */
export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(function PieChart(
  {
    title = 'Categories',
    data,
    size = 120,
    onSliceHover,
    onSliceClick,
    formatTooltipValue,
    className,
    ...props
  },
  ref,
) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const center = size / 2;
  const [setRef, boxSize] = useElementSize<HTMLDivElement>(ref);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [pinIndex, setPinIndex] = React.useState<number | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      cardRef.current = node;
      setRef(node);
    },
    [setRef],
  );
  const activeIndex = pinIndex ?? hoverIndex;

  // Tapping a wedge pins its tooltip open (there's no hover on touch); tapping
  // anywhere outside the card dismisses it, same as a native picker/menu.
  React.useEffect(() => {
    if (pinIndex === null) return;
    // `mousedown` rather than `pointerdown` — browsers fire a compatibility
    // mouse-event sequence after touch input too, so this one listener
    // reliably catches both a real tap and a mouse click without needing
    // separate touch handling.
    const handleMouseDown = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setPinIndex(null);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [pinIndex]);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
    onSliceHover?.(index);
  };
  const handleMouseLeave = () => {
    setHoverIndex(null);
    onSliceHover?.(null);
  };
  const handleClick = (index: number) => {
    setPinIndex((prev) => (prev === index ? null : index));
    onSliceClick?.(data[index], index);
  };

  const activeDatum = activeIndex != null ? data[activeIndex] : null;
  const activePercent = activeDatum ? Math.round((activeDatum.value / total) * 100) : 0;

  let cursor = 0;
  const wedges = data.map((d, i) => {
    const pct = (d.value / total) * 100;
    const start = cursor;
    const end = cursor + pct;
    cursor = end;
    return { datum: d, start, end, index: i };
  });

  return (
    <div ref={combinedRef} className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      <WobbleBorder width={boxSize.width} height={boxSize.height} radius={10} seed={7} />
      <span className={styles.title}>{title}</span>
      <div className={styles.body}>
        <div className={styles.pieWrap}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {wedges.map(({ datum: d, start, end, index }) => (
              <g
                key={d.label}
                className={styles.wedgeEnter}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                  animationDelay: `${index * 60}ms`,
                }}
              >
                <path
                  d={wedgePath(center, center, start, end)}
                  fill={d.color}
                  stroke="var(--color-brand-white)"
                  strokeWidth={2}
                  className={styles.wedge}
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    transform: activeIndex === index ? 'scale(1.06)' : undefined,
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index)}
                >
                  <title>{`${d.label}: ${Math.round(end - start)}%`}</title>
                </path>
              </g>
            ))}
          </svg>
          <ChartTooltip
            x={center}
            y={center}
            boundsWidth={size}
            visible={activeDatum != null}
            title={activeDatum?.label ?? ''}
            value={
              activeDatum
                ? formatTooltipValue
                  ? formatTooltipValue(activeDatum, activePercent)
                  : `${activePercent}% · ${activeDatum.value}`
                : ''
            }
          />
        </div>
        <ul className={styles.legend}>
          {data.map((d, i) => {
            const pct = Math.round((d.value / total) * 100);
            return (
              <li
                key={d.label}
                className={styles.legendRow}
                data-active={activeIndex === i || undefined}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(i)}
              >
                <span className={styles.dot} style={{ background: d.color }} />
                <span className={styles.label}>{d.label}</span>
                <span className={styles.percent}>{pct}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

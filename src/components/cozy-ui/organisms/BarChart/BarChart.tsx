import * as React from 'react';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
import { ChartTooltip } from '../../ChartTooltip';
import { niceMax, niceTicks } from '../../chartTicks';
import styles from './BarChart.module.css';

/**
 * One bar. `value` shares its unit with the chart's `unit` prop — pass
 * minutes if `unit="min"`, sessions if `unit="sessions"`, etc.
 *
 * @example
 * { value: 45, label: '9:00am' }
 */
export interface BarChartDatum {
  /** Bar height, in the same unit as the chart's `unit` prop. */
  value: number;
  /** Only some bars carry an x-axis label in the Figma reference (e.g. every other one). */
  label?: string;
}

export interface BarChartProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  /** One entry per bar, left to right — see `BarChartDatum`. */
  data: BarChartDatum[];
  /** Value at the top of the y-axis; bars are scaled against this. @default a "nice" round number at or above the largest value (see `niceMax`) */
  max?: number;
  /** Unit label appended to y-axis ticks and the per-bar tooltip (e.g. "min", "sessions"). @default 'min' */
  unit?: string;
  /** Overrides the default fill for every bar. @default var(--color-green-primary) via .bar in BarChart.module.css */
  barColor?: string;
  /** Fires on hover-in/out (desktop) with the bar's index, or `null` on hover-out. Tapping a bar on touch devices also fires this, immediately followed by `onBarClick`. */
  onBarHover?: (index: number | null) => void;
  /** Fires when a bar (or its full-column hit zone) is clicked or tapped — wire this up for drill-down/detail views. */
  onBarClick?: (datum: BarChartDatum, index: number) => void;
  /** Formats the tooltip's value line. @default `${value} ${unit}` */
  formatTooltipValue?: (datum: BarChartDatum) => React.ReactNode;
}

const PLOT_WIDTH = 250;
const PLOT_HEIGHT = 90;
const LEFT_MARGIN = 42;
const TOP_MARGIN = 8;
const BOTTOM_MARGIN = 20;
const BAR_RADIUS = 4;
const TICK_COUNT = 3;

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

/**
 * Hover (mouse) and press (touch — tapping a bar pins its tooltip open
 * until something else is tapped) both drive one shared "active bar" state,
 * following the pattern in Lucid UI's `Bars`: each bar's hover hit zone
 * spans the bar's full column height, not just its own (possibly short)
 * rect, so a low bar is still easy to target. Axis ticks are picked with
 * the same "nice round number" algorithm d3-scale uses under Lucid's
 * `Axis` — see `chartTicks.ts`.
 */
export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  { title, data, max, unit = 'min', barColor, onBarHover, onBarClick, formatTooltipValue, className, ...props },
  ref,
) {
  const [setRef, boxSize] = useElementSize<HTMLDivElement>(ref);
  const [setPlotRef, plotSize] = useElementSize<HTMLDivElement>();
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
    onBarHover?.(index);
  };
  const handleMouseLeave = () => {
    setHoverIndex(null);
    onBarHover?.(null);
  };
  const handleClick = (index: number) => {
    setPinIndex((prev) => (prev === index ? null : index));
    onBarClick?.(data[index], index);
  };

  const dataMax = Math.max(...data.map((d) => d.value), 1);
  const axisMax = max ?? niceMax(dataMax, TICK_COUNT);
  const ticks = niceTicks(axisMax, TICK_COUNT);

  const width = LEFT_MARGIN + PLOT_WIDTH;
  const height = TOP_MARGIN + PLOT_HEIGHT + BOTTOM_MARGIN;
  const gap = 6;
  const barWidth = (PLOT_WIDTH - gap * (data.length - 1)) / data.length;

  // The svg itself renders at `width: 100%` (see .svg) so it shrinks on
  // narrow screens instead of overflowing the card — but the tooltip is
  // plain absolutely-positioned HTML, not SVG, so its coordinates need
  // converting from the chart's fixed viewBox units into whatever the svg
  // actually rendered at.
  const scale = plotSize.width ? plotSize.width / width : 1;

  const activeDatum = activeIndex != null ? data[activeIndex] : null;
  const activeBarX = activeIndex != null ? LEFT_MARGIN + activeIndex * (barWidth + gap) : 0;
  const activeBarTop = activeDatum
    ? TOP_MARGIN + PLOT_HEIGHT - (activeDatum.value / axisMax) * PLOT_HEIGHT
    : 0;

  return (
    <div ref={combinedRef} className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      <WobbleBorder width={boxSize.width} height={boxSize.height} radius={10} seed={8} />
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles.plotWrap} ref={setPlotRef}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`}>
          <g transform={`translate(0, ${TOP_MARGIN})`}>
          {ticks.map((t) => {
            const y = PLOT_HEIGHT - (t / axisMax) * PLOT_HEIGHT;
            return (
              <text key={t} x={LEFT_MARGIN - 6} y={y + 4} textAnchor="end" className={styles.gridLabel}>
                {t} {unit}
              </text>
            );
          })}
          {data.map((d, i) => {
            const x = LEFT_MARGIN + i * (barWidth + gap);
            const barHeight = (d.value / axisMax) * PLOT_HEIGHT;
            const top = PLOT_HEIGHT - barHeight;
            const isActive = activeIndex === i;
            return (
              <g key={i}>
                <g
                  className={styles.barEnter}
                  style={{
                    transformOrigin: `${x + barWidth / 2}px ${PLOT_HEIGHT}px`,
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <path
                    d={barPath(x, barWidth, top, PLOT_HEIGHT, BAR_RADIUS)}
                    className={[barColor ? undefined : styles.bar, isActive ? styles.barActive : undefined]
                      .filter(Boolean)
                      .join(' ')}
                    fill={barColor}
                  />
                </g>
                <rect
                  className={styles.hitZone}
                  x={x}
                  y={0}
                  width={barWidth}
                  height={PLOT_HEIGHT}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(i)}
                />
                {d.label && (
                  <text x={x + barWidth / 2} y={PLOT_HEIGHT + 16} className={styles.xLabel}>
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
          {/* Painted after the bars, not before, so a bar that touches the axis never covers it. */}
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
          </g>
        </svg>
        <ChartTooltip
          x={(activeBarX + barWidth / 2) * scale}
          y={activeBarTop * scale}
          boundsWidth={plotSize.width || width}
          visible={activeDatum != null}
          title={activeDatum?.label ?? (activeIndex != null ? `#${activeIndex + 1}` : '')}
          value={
            activeDatum
              ? formatTooltipValue
                ? formatTooltipValue(activeDatum)
                : `${activeDatum.value} ${unit}`
              : ''
          }
        />
      </div>
    </div>
  );
});

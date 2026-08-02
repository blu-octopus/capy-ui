import * as React from 'react';
import styles from './ChartTooltip.module.css';

export interface ChartTooltipProps {
  /** Anchor point, in the same px units as the relatively-positioned wrapper this renders inside (typically the same coordinate space as the chart's own SVG). */
  x: number;
  /** Anchor point's y — the tooltip renders just above this. */
  y: number;
  /** Whether to render visible/interactable — kept mounted either way so its fade/scale transition can play. */
  visible: boolean;
  /** Width of the wrapper this is positioned within, used to keep the tooltip from sliding past the left/right edge. */
  boundsWidth: number;
  title: React.ReactNode;
  value: React.ReactNode;
}

const EDGE_MARGIN = 8;

/**
 * A small floating detail popover for chart hover/press states (see
 * `PieChart`/`BarChart`). Positioned by plain absolute coordinates rather
 * than a portal — our chart SVGs render at a fixed pixel size (no
 * responsive viewBox scaling), so 1 SVG unit already equals 1 CSS px and no
 * coordinate conversion is needed.
 */
export function ChartTooltip({ x, y, visible, boundsWidth, title, value }: ChartTooltipProps) {
  const clampedX = boundsWidth > EDGE_MARGIN * 2 ? Math.min(Math.max(x, EDGE_MARGIN), boundsWidth - EDGE_MARGIN) : x;

  return (
    <div
      className={styles.tooltip}
      aria-hidden={!visible}
      style={{
        left: clampedX,
        top: y,
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, calc(-100% - 10px)) scale(${visible ? 1 : 0.92})`,
      }}
    >
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

import * as React from 'react';
import { roundedRectBoundary, generateWobbleRibbon, type BoundarySample } from '../../sketch';
import { STROKE_COLOR, STROKE_WIDTH, STROKE_FREQUENCY, STROKE_WIGGLE, STROKE_WIDTH_VARIANCE } from './strokeDefaults';

export interface WobbleBorderProps {
  width: number;
  height: number;
  radius: number;
  strokeWidth?: number;
  color?: string;
  seed: number;
  frequency?: number;
  wiggle?: number;
  smoothen?: number;
  widthVariance?: number;
  className?: string;
}

/**
 * A generated, variable-width hand-drawn border overlay for fixed-radius
 * boxes — Modal, TrendCard, PieChart, BarChart, InAppPurchaseCard's featured
 * tier, and Button's outlined variant. Same wobble-ribbon engine as
 * Bubble's outline (see `src/sketch`), just applied to a plain rect instead
 * of a live-measured stadium, so this design system reads as one
 * continuous hand-drawn language instead of "one shape wobbles, everything
 * else has a crisp machine border." Only renders the ribbon itself — the
 * parent's own `background` CSS already provides the fill.
 */
export function WobbleBorder({
  width,
  height,
  radius,
  strokeWidth = STROKE_WIDTH,
  color = STROKE_COLOR,
  seed,
  frequency = STROKE_FREQUENCY,
  wiggle = STROKE_WIGGLE,
  smoothen = 0.5,
  widthVariance = STROKE_WIDTH_VARIANCE,
  className,
}: WobbleBorderProps) {
  const ribbonPath = React.useMemo(() => {
    if (width <= 0 || height <= 0) return null;
    const inset = strokeWidth / 2;
    const boundary: BoundarySample[] = roundedRectBoundary(width - strokeWidth, height - strokeWidth, radius).map(
      (p) => ({ ...p, x: p.x + inset, y: p.y + inset }),
    );
    return generateWobbleRibbon(boundary, { seed, halfWidth: strokeWidth / 2, frequency, wiggle, smoothen, widthVariance })
      .ribbonPath;
  }, [width, height, radius, strokeWidth, seed, frequency, wiggle, smoothen, widthVariance]);

  if (!ribbonPath) return null;

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
    >
      <path d={ribbonPath} fill={color} fillRule="evenodd" />
    </svg>
  );
}

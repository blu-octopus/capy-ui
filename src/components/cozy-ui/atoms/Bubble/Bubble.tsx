import * as React from 'react';
import { roundedRectBoundary, generateWobbleRibbon, type BoundarySample } from '../../../../sketch';
import { useElementSize } from '../../useElementSize';
import { STROKE_WIDTH, STROKE_FREQUENCY, STROKE_WIGGLE, STROKE_WIDTH_VARIANCE } from '../../strokeDefaults';
import styles from './Bubble.module.css';

/** Stroke weight used by the hand-drawn outline — DialogueBubble's tail matches this. */
export const BUBBLE_STROKE_WIDTH = STROKE_WIDTH;

/**
 * Bubble's outline wobbles more tightly than the shared stroke language
 * elsewhere (Button, Modal, cards) to match the denser hand-drawn line in
 * the original Figma path — scoped here rather than raising the shared
 * `STROKE_FREQUENCY` default, which would also affect every other
 * WobbleBorder consumer. DialogueBubble's tail matches this too, so the
 * wobble "rhythm" is consistent across the seam.
 */
export const BUBBLE_STROKE_FREQUENCY = STROKE_FREQUENCY * 4.4;

/**
 * A rounded-rect this tall (min-height 48) renders as a full stadium — the
 * whole left/right edge is curve, with no straight run at all. Anything that
 * anchors to a Bubble's top/bottom edge — like DialogueBubble's tail — should
 * stay clear of the corner radius, which is roughly half the bubble's height.
 */
export const BUBBLE_CORNER_RADIUS = 24;

export interface BubbleProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Horizontal (left/right) inner padding, in px. @default 28 */
  paddingX?: number;
  /** Vertical (top/bottom) inner padding, in px. @default 16 */
  paddingY?: number;
  /** Whether the hand-drawn outline stroke renders — the white fill behind it stays either way. @default true */
  showStroke?: boolean;
  /** How tightly the outline wobbles along its own length — higher reads as a shakier, denser line. @default 0.22 */
  strokeFrequency?: number;
}

/**
 * The plain hand-drawn pill, no tail — grows with its content. The outline
 * is a generated, variable-width ribbon (see `src/sketch`), not a stroked
 * rect or a tiled border-image: a hand-drawn line doesn't repeat at a fixed
 * period (tiling always shows a seam) and doesn't hold a constant width
 * (that's what makes a stroke read as machine-drawn). Pure path generation
 * also means this renders identically outside the browser — e.g. via
 * react-native-svg's `Path` — since nothing here depends on SVG filters.
 */
/**
 * The rounded-rect boundary a Bubble's outline wobbles from, stroke-inset
 * already applied — factored out so DialogueBubble can splice its tail
 * directly into these samples before the wobble pass runs, instead of
 * generating the tail as a separate shape that has to visually line up
 * with an already-wobbled edge after the fact.
 */
export function buildBubbleBoundary(width: number, height: number): BoundarySample[] {
  const inset = BUBBLE_STROKE_WIDTH / 2;
  const innerWidth = width - BUBBLE_STROKE_WIDTH;
  const innerHeight = height - BUBBLE_STROKE_WIDTH;
  const radius = Math.min(innerHeight / 2, BUBBLE_CORNER_RADIUS);
  return roundedRectBoundary(innerWidth, innerHeight, radius).map((p) => ({
    ...p,
    x: p.x + inset,
    y: p.y + inset,
  }));
}

export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(function Bubble(
  { children, className, style, paddingX, paddingY, showStroke = true, strokeFrequency = BUBBLE_STROKE_FREQUENCY, ...props },
  ref,
) {
  const [setRef, { width, height }] = useElementSize<HTMLDivElement>(ref);

  const paddingStyle = {
    ...(paddingX !== undefined && { '--bubble-padding-x': `${paddingX}px` }),
    ...(paddingY !== undefined && { '--bubble-padding-y': `${paddingY}px` }),
  } as React.CSSProperties;

  const ribbon = React.useMemo(() => {
    if (width <= 0 || height <= 0) return null;
    return generateWobbleRibbon(buildBubbleBoundary(width, height), {
      seed: 4,
      halfWidth: BUBBLE_STROKE_WIDTH / 2,
      wiggle: STROKE_WIGGLE,
      frequency: strokeFrequency,
      smoothen: 0.5,
      widthVariance: STROKE_WIDTH_VARIANCE,
    });
  }, [width, height, strokeFrequency]);

  return (
    <div
      ref={setRef}
      className={[styles.bubble, className].filter(Boolean).join(' ')}
      style={{ ...paddingStyle, ...style }}
      {...props}
    >
      {ribbon && (
        <svg className={styles.outline} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
          <path d={ribbon.fillPath} fill="var(--color-brand-white)" />
          {showStroke && <path d={ribbon.ribbonPath} fill="var(--color-brand-brown)" fillRule="evenodd" />}
        </svg>
      )}
      <span className={styles.text}>{children}</span>
    </div>
  );
});

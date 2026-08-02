import * as React from 'react';
import { roundedRectBoundary, generateWobbleRibbon, type BoundarySample } from '../../../../sketch';
import { useElementSize } from '../../useElementSize';
import styles from './Bubble.module.css';

/** Stroke weight used by the hand-drawn outline — DialogueBubble's tail matches this. */
export const BUBBLE_STROKE_WIDTH = 3;

/**
 * A rounded-rect this tall (min-height 48) renders as a full stadium — the
 * whole left/right edge is curve, with no straight run at all. Anything that
 * anchors to a Bubble's top/bottom edge — like DialogueBubble's tail — should
 * stay clear of the corner radius, which is roughly half the bubble's height.
 */
export const BUBBLE_CORNER_RADIUS = 24;

export interface BubbleProps extends React.ComponentPropsWithoutRef<'div'> {}

/**
 * The plain hand-drawn pill, no tail — grows with its content. The outline
 * is a generated, variable-width ribbon (see `src/sketch`), not a stroked
 * rect or a tiled border-image: a hand-drawn line doesn't repeat at a fixed
 * period (tiling always shows a seam) and doesn't hold a constant width
 * (that's what makes a stroke read as machine-drawn). Pure path generation
 * also means this renders identically outside the browser — e.g. via
 * react-native-svg's `Path` — since nothing here depends on SVG filters.
 */
export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(function Bubble(
  { children, className, style, ...props },
  ref,
) {
  const [setRef, { width, height }] = useElementSize<HTMLDivElement>(ref);

  const ribbon = React.useMemo(() => {
    if (width <= 0 || height <= 0) return null;
    const inset = BUBBLE_STROKE_WIDTH / 2;
    const innerWidth = width - BUBBLE_STROKE_WIDTH;
    const innerHeight = height - BUBBLE_STROKE_WIDTH;
    const radius = Math.min(innerHeight / 2, BUBBLE_CORNER_RADIUS);
    const boundary: BoundarySample[] = roundedRectBoundary(innerWidth, innerHeight, radius).map((p) => ({
      ...p,
      x: p.x + inset,
      y: p.y + inset,
    }));
    return generateWobbleRibbon(boundary, {
      seed: 4,
      halfWidth: BUBBLE_STROKE_WIDTH / 2,
      wiggle: 1.4,
      frequency: 0.045,
      smoothen: 0.5,
      widthVariance: 0.55,
    });
  }, [width, height]);

  return (
    <div ref={setRef} className={[styles.bubble, className].filter(Boolean).join(' ')} style={style} {...props}>
      {ribbon && (
        <svg className={styles.outline} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
          <path d={ribbon.fillPath} fill="var(--color-brand-white)" />
          <path d={ribbon.ribbonPath} fill="var(--color-brand-brown)" fillRule="evenodd" />
        </svg>
      )}
      <span className={styles.text}>{children}</span>
    </div>
  );
});

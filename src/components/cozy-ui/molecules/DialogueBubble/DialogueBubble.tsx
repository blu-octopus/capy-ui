import * as React from 'react';
import {
  BUBBLE_CORNER_RADIUS,
  BUBBLE_STROKE_WIDTH,
  BUBBLE_STROKE_FREQUENCY,
  buildBubbleBoundary,
  type BubbleProps,
} from '../../atoms/Bubble';
import bubbleStyles from '../../atoms/Bubble/Bubble.module.css';
import { generateWobbleRibbon, type Point, type BoundarySample } from '../../../../sketch';
import { useElementSize } from '../../useElementSize';
import { STROKE_WIGGLE, STROKE_WIDTH_VARIANCE } from '../../strokeDefaults';

/**
 * The 9-point grid used by CSS object-position/background-position, reused
 * here as a tooltip-style placement: each point names an edge (or corner) of
 * the Bubble the tail points from. 'center' has no edge of its own — a tail
 * can't point at the bubble's own middle — so it's an alias for 'bottom',
 * the conventional default for a chat bubble.
 */
export type DialogueBubblePlacement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

type Edge = 'top' | 'right' | 'bottom' | 'left';

const EDGE_OF: Record<DialogueBubblePlacement, Edge> = {
  'top-left': 'top',
  top: 'top',
  'top-right': 'top',
  left: 'left',
  center: 'bottom',
  right: 'right',
  'bottom-left': 'bottom',
  bottom: 'bottom',
  'bottom-right': 'bottom',
};

// Where along that edge, as a 0-1 fraction before clamping away from the corners.
const ALIGN_OF: Record<DialogueBubblePlacement, number> = {
  'top-left': 0,
  top: 0.5,
  'top-right': 1,
  left: 0.5,
  center: 0.5,
  right: 0.5,
  'bottom-left': 0,
  bottom: 0.5,
  'bottom-right': 1,
};

const EDGE_NORMAL: Record<Edge, { nx: number; ny: number }> = {
  top: { nx: 0, ny: -1 },
  right: { nx: 1, ny: 0 },
  bottom: { nx: 0, ny: 1 },
  left: { nx: -1, ny: 0 },
};

// Whether that edge's samples walk with increasing x/y as arc-length increases,
// per roundedRectBoundary's clockwise winding (top and right count up; bottom
// and left count down, since the loop doubles back along those edges).
const EDGE_WALKS_INCREASING: Record<Edge, boolean> = {
  top: true,
  right: true,
  bottom: false,
  left: false,
};

const EDGE_WALK_AXIS: Record<Edge, 'x' | 'y'> = {
  top: 'x',
  bottom: 'x',
  left: 'y',
  right: 'y',
};

/**
 * A real hand-drawn nub is never a mirrored isoceles triangle — it's a
 * scalene shape with a clearly obtuse-leaning point: one edge short and
 * steep, the other long and shallow, so the apex reads as "flicked" toward
 * one side rather than dropped straight down the middle. These three
 * constants reproduce that same asymmetry (half the base span, how far
 * along the base-to-base run the apex sits, and how far it protrudes)
 * regardless of which edge the tail is spliced into.
 */
const TAIL_HALF_BASE = 7.75;
const TAIL_APEX_FRACTION = 0.677;
const TAIL_DEPTH = 19;

function edgeCenterline(edge: Edge, width: number, height: number): number {
  switch (edge) {
    case 'bottom':
      return height - BUBBLE_STROKE_WIDTH / 2;
    case 'top':
      return BUBBLE_STROKE_WIDTH / 2;
    case 'right':
      return width - BUBBLE_STROKE_WIDTH / 2;
    case 'left':
      return BUBBLE_STROKE_WIDTH / 2;
  }
}

function segmentNormal(a: Point, b: Point) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { nx: dy / len, ny: -dx / len };
}

/**
 * Splices the tail's three vertices (base, apex, base) directly into the
 * bubble's own boundary samples, in place of whatever samples fell under
 * it — so the tail becomes part of the exact same sample sequence that a
 * single `generateWobbleRibbon` pass then perturbs as one continuous line.
 * This replaces the earlier approach of generating the tail as its own
 * independent wobble shape and overlapping it onto the bubble's already-
 * wobbled edge, which could never quite line up since the two were
 * different noise samples. `along` is the same tooltip-arrow anchor
 * position already computed for CSS-based positioning (clamped clear of
 * the corners), just consumed here to place the splice instead.
 */
function spliceTailNotch(boundary: BoundarySample[], edge: Edge, along: number, width: number, height: number): BoundarySample[] {
  const walkAxis = EDGE_WALK_AXIS[edge];
  const increasing = EDGE_WALKS_INCREASING[edge];
  const normal = EDGE_NORMAL[edge];
  const centerline = edgeCenterline(edge, width, height);
  const outwardSign = edge === 'bottom' || edge === 'right' ? 1 : -1;

  const aWalk = increasing ? along - TAIL_HALF_BASE : along + TAIL_HALF_BASE;
  const bWalk = increasing ? along + TAIL_HALF_BASE : along - TAIL_HALF_BASE;
  const apexWalk = aWalk + (bWalk - aWalk) * TAIL_APEX_FRACTION;
  const apexOutward = centerline + outwardSign * TAIL_DEPTH;

  const toPoint = (walk: number, outward: number): Point =>
    walkAxis === 'x' ? { x: walk, y: outward } : { x: outward, y: walk };

  const pointA = toPoint(aWalk, centerline);
  const apex = toPoint(apexWalk, apexOutward);
  const pointB = toPoint(bWalk, centerline);

  const minWalk = Math.min(aWalk, bWalk);
  const maxWalk = Math.max(aWalk, bWalk);

  const result: BoundarySample[] = [];
  const newIndices: number[] = [];
  let inserted = false;
  for (const sample of boundary) {
    const onEdge = sample.nx === normal.nx && sample.ny === normal.ny;
    const w = walkAxis === 'x' ? sample.x : sample.y;
    if (onEdge && w > minWalk && w < maxWalk) {
      if (!inserted) {
        newIndices.push(result.length, result.length + 1, result.length + 2);
        result.push(
          { ...pointA, nx: 0, ny: 0, t: 0 },
          { ...apex, nx: 0, ny: 0, t: 0 },
          { ...pointB, nx: 0, ny: 0, t: 0 },
        );
        inserted = true;
      }
      continue;
    }
    result.push(sample);
  }

  // The 3 new points need real normals (mitered against their new
  // neighbors) — everything else keeps the normal roundedRectBoundary
  // already gave it.
  const n = result.length;
  for (const i of newIndices) {
    const prev = result[(i - 1 + n) % n];
    const next = result[(i + 1) % n];
    const n1 = segmentNormal(prev, result[i]);
    const n2 = segmentNormal(result[i], next);
    const nx = n1.nx + n2.nx;
    const ny = n1.ny + n2.ny;
    const len = Math.hypot(nx, ny) || 1;
    result[i] = { ...result[i], nx: nx / len, ny: ny / len };
  }

  // Arc-length has to be re-threaded across the whole spliced sequence so
  // the noise function samples continuously through the splice instead of
  // jumping.
  let t = 0;
  result[0] = { ...result[0], t: 0 };
  for (let i = 1; i < n; i++) {
    t += Math.hypot(result[i].x - result[i - 1].x, result[i].y - result[i - 1].y);
    result[i] = { ...result[i], t };
  }

  return result;
}

export interface DialogueBubbleProps extends BubbleProps {
  /**
   * Which edge (and where along it) the tail points from, using the same
   * 9-point grid as CSS object-position. Clamped at render time so the tail
   * can only land on the straight run of that edge — like a tooltip arrow,
   * it never points into the bubble's curved corner.
   * @default 'bottom'
   */
  placement?: DialogueBubblePlacement;
  /** Hide the tail to get a plain hand-drawn pill (equivalent to rendering a bare Bubble). */
  showTail?: boolean;
}

/**
 * A Bubble with a tail — positioned with the same anchor + clamp pattern a
 * tooltip uses to keep its arrow pinned to its trigger (the bubble is
 * measured live, and the tail's position along its edge is clamped clear of
 * the corners), but rendered as ONE hand-drawn outline: the tail's vertices
 * are spliced directly into the bubble's own rounded-rect boundary before a
 * single wobble pass runs, so the tail is structurally part of the same
 * line as the rest of the bubble rather than a separate shape trying to
 * overlap it.
 */
export const DialogueBubble = React.forwardRef<HTMLDivElement, DialogueBubbleProps>(function DialogueBubble(
  {
    placement = 'bottom',
    showTail = true,
    children,
    className,
    style,
    paddingX,
    paddingY,
    showStroke = true,
    strokeFrequency = BUBBLE_STROKE_FREQUENCY,
    ...props
  },
  ref,
) {
  const [setRef, { width, height }] = useElementSize<HTMLDivElement>(ref);

  const edge = EDGE_OF[placement];
  const isHorizontalEdge = edge === 'top' || edge === 'bottom';
  const runLength = isHorizontalEdge ? width : height;
  const align = ALIGN_OF[placement];

  const raw = align * runLength;
  const along = runLength > 0 ? Math.min(Math.max(raw, BUBBLE_CORNER_RADIUS), runLength - BUBBLE_CORNER_RADIUS) : raw;

  const paddingStyle = {
    ...(paddingX !== undefined && { '--bubble-padding-x': `${paddingX}px` }),
    ...(paddingY !== undefined && { '--bubble-padding-y': `${paddingY}px` }),
  } as React.CSSProperties;

  const ribbon = React.useMemo(() => {
    if (width <= 0 || height <= 0) return null;
    const baseBoundary = buildBubbleBoundary(width, height);
    const boundary = showTail ? spliceTailNotch(baseBoundary, edge, along, width, height) : baseBoundary;
    return generateWobbleRibbon(boundary, {
      seed: 4,
      halfWidth: BUBBLE_STROKE_WIDTH / 2,
      wiggle: STROKE_WIGGLE,
      frequency: strokeFrequency,
      smoothen: 0.5,
      widthVariance: STROKE_WIDTH_VARIANCE,
    });
  }, [width, height, showTail, edge, along, strokeFrequency]);

  return (
    <div
      ref={setRef}
      className={[bubbleStyles.bubble, className].filter(Boolean).join(' ')}
      style={{ ...paddingStyle, ...style }}
      {...props}
    >
      {ribbon && (
        <svg
          className={bubbleStyles.outline}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden
        >
          <path d={ribbon.fillPath} fill="var(--color-brand-white)" />
          {showStroke && <path d={ribbon.ribbonPath} fill="var(--color-brand-brown)" fillRule="evenodd" />}
        </svg>
      )}
      <span className={bubbleStyles.text}>{children}</span>
    </div>
  );
});

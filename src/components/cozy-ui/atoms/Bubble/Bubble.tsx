import * as React from 'react';
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
 * The plain hand-drawn pill, no tail — grows with its content. The outline is
 * a single SVG rect run through an feTurbulence/feDisplacementMap filter, not
 * a tiled border-image: a hand-drawn line doesn't repeat at a fixed period,
 * so tiling it always shows a seam where the tile wraps. Generating the wobble
 * live means the stroke stays one continuous, organic line at any width.
 */
export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(function Bubble(
  { children, className, style, ...props },
  ref,
) {
  const filterId = React.useId();
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, []);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const { width, height } = size;
  const half = BUBBLE_STROKE_WIDTH / 2;
  const radius = height > 0 ? Math.min(height / 2 - half, BUBBLE_CORNER_RADIUS) : BUBBLE_CORNER_RADIUS;

  return (
    <div ref={setRefs} className={[styles.bubble, className].filter(Boolean).join(' ')} style={style} {...props}>
      {width > 0 && height > 0 && (
        <svg className={styles.outline} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
          <defs>
            <filter id={filterId} x="-15%" y="-60%" width="130%" height="220%">
              <feTurbulence type="fractalNoise" baseFrequency="0.06 0.4" numOctaves={2} seed={4} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.4} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect
            x={half}
            y={half}
            width={width - BUBBLE_STROKE_WIDTH}
            height={height - BUBBLE_STROKE_WIDTH}
            rx={radius}
            ry={radius}
            fill="var(--color-brand-white)"
            stroke="var(--color-brand-brown)"
            strokeWidth={BUBBLE_STROKE_WIDTH}
            filter={`url(#${filterId})`}
          />
        </svg>
      )}
      <span className={styles.text}>{children}</span>
    </div>
  );
});

import * as React from 'react';
import { Bubble, BUBBLE_CORNER_RADIUS, BUBBLE_STROKE_WIDTH, type BubbleProps } from '../Bubble';
import styles from './DialogueBubble.module.css';

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

const EDGE_OF: Record<DialogueBubblePlacement, 'top' | 'right' | 'bottom' | 'left'> = {
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

const ROTATION_OF: Record<'top' | 'right' | 'bottom' | 'left', number> = {
  bottom: 0,
  left: 90,
  top: 180,
  right: 270,
};

const TAIL_SIZE = 20;

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
 * A Bubble with a tail attached using tooltip-anchor positioning: the Bubble
 * is the "anchor" element, its rendered box is measured live, and the tail —
 * a plain triangle, not a hand-cropped chunk of a bigger shape — is placed
 * and clamped against that measurement so it always lands on a straight run,
 * the same anchor + clamp pattern a tooltip uses to keep its arrow pinned to
 * its trigger and off the trigger's rounded corners.
 */
export const DialogueBubble = React.forwardRef<HTMLDivElement, DialogueBubbleProps>(
  function DialogueBubble({ placement = 'bottom', showTail = true, className, ...props }, ref) {
    const filterId = React.useId();
    const anchorRef = React.useRef<HTMLDivElement | null>(null);
    const [anchor, setAnchor] = React.useState({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
      const el = anchorRef.current;
      if (!el) return;
      const measure = () => setAnchor({ width: el.clientWidth, height: el.clientHeight });
      const observer = new ResizeObserver(measure);
      observer.observe(el);
      measure();
      return () => observer.disconnect();
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        anchorRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const edge = EDGE_OF[placement];
    const isHorizontalEdge = edge === 'top' || edge === 'bottom';
    const runLength = isHorizontalEdge ? anchor.width : anchor.height;
    const align = ALIGN_OF[placement];

    const raw = align * runLength;
    const along =
      runLength > 0 ? Math.min(Math.max(raw, BUBBLE_CORNER_RADIUS), runLength - BUBBLE_CORNER_RADIUS) : raw;

    const tailStyle: React.CSSProperties = { transform: `rotate(${ROTATION_OF[edge]}deg)` };
    if (isHorizontalEdge) {
      tailStyle.left = `${along}px`;
      tailStyle[edge === 'top' ? 'bottom' : 'top'] = `calc(100% - ${BUBBLE_STROKE_WIDTH}px)`;
      tailStyle.marginLeft = -TAIL_SIZE / 2;
    } else {
      tailStyle.top = `${along}px`;
      tailStyle.left =
        edge === 'left' ? `${-(TAIL_SIZE - BUBBLE_STROKE_WIDTH)}px` : `calc(100% - ${BUBBLE_STROKE_WIDTH}px)`;
      tailStyle.marginTop = -TAIL_SIZE / 2;
    }

    return (
      <span className={styles.wrapper}>
        <Bubble ref={setRefs} className={className} {...props} />
        {showTail && anchor.width > 0 && (
          <svg
            className={styles.tail}
            style={tailStyle}
            width={TAIL_SIZE}
            height={TAIL_SIZE}
            viewBox={`0 0 ${TAIL_SIZE} ${TAIL_SIZE}`}
            aria-hidden
          >
            <defs>
              <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
                <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves={2} seed={9} result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.8} xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            {/*
              Two separate paths: a solid fill (no stroke) whose top edge sits
              above the visible box, hidden under the bubble's own overlap, and
              a stroke-only path that draws just the two slanted sides — never
              the top edge, which would otherwise draw a second, redundant line
              (and a sliver of white) right where the tail is meant to read as
              one continuous outline with the bubble.
            */}
            <path d={`M0 -3 L${TAIL_SIZE} -3 L${TAIL_SIZE / 2} ${TAIL_SIZE - 1} Z`} fill="var(--color-brand-white)" />
            <path
              d={`M2 0 L${TAIL_SIZE / 2} ${TAIL_SIZE - 1} L${TAIL_SIZE - 2} 0`}
              fill="none"
              stroke="var(--color-brand-brown)"
              strokeWidth={BUBBLE_STROKE_WIDTH}
              strokeLinejoin="round"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
            />
          </svg>
        )}
      </span>
    );
  },
);

import * as React from 'react';
import { Bubble, BUBBLE_CAP_WIDTH, type BubbleProps } from '../Bubble';
import styles from './DialogueBubble.module.css';

export interface DialogueBubbleProps extends BubbleProps {
  /**
   * Where the tail meets the underside of the bubble, as a percentage of the
   * anchor Bubble's width. Clamped at render time so it can only land on the
   * straight edge between the two rounded end-caps — like a tooltip arrow,
   * it never points into the curved corner.
   * @default 73
   */
  tailOffset?: number;
  /** Hide the tail to get a plain hand-drawn pill (equivalent to rendering a bare Bubble). */
  showTail?: boolean;
}

/**
 * A Bubble with a tail attached using tooltip-style anchor positioning: the
 * Bubble is the "anchor" element, its rendered width is measured live, and
 * the tail is a separate floating piece whose position is computed and
 * clamped against that measurement — the same pattern a tooltip uses to keep
 * its arrow pinned to its trigger and off the trigger's rounded corners.
 */
export const DialogueBubble = React.forwardRef<HTMLDivElement, DialogueBubbleProps>(
  function DialogueBubble({ tailOffset = 73, showTail = true, className, ...props }, ref) {
    const anchorRef = React.useRef<HTMLDivElement | null>(null);
    const [anchorWidth, setAnchorWidth] = React.useState(0);

    React.useLayoutEffect(() => {
      const el = anchorRef.current;
      if (!el) return;
      const observer = new ResizeObserver(([entry]) => setAnchorWidth(entry.contentRect.width));
      observer.observe(el);
      setAnchorWidth(el.getBoundingClientRect().width);
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

    const rawLeft = (tailOffset / 100) * anchorWidth;
    const clampedLeft =
      anchorWidth > 0
        ? Math.min(Math.max(rawLeft, BUBBLE_CAP_WIDTH), anchorWidth - BUBBLE_CAP_WIDTH)
        : rawLeft;
    const tailStyle = anchorWidth > 0 ? { left: `${clampedLeft}px` } : { left: `${tailOffset}%` };

    return (
      <span className={styles.wrapper}>
        <Bubble ref={setRefs} className={className} {...props} />
        {showTail && <span className={styles.tail} style={tailStyle} aria-hidden />}
      </span>
    );
  },
);

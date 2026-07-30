import * as React from 'react';
import styles from './Bubble.module.css';

/**
 * Width of the rounded end-cap baked into the border-image (matches
 * border-width's 28px side). Anything that anchors to a Bubble — like
 * DialogueBubble's tail — needs this to know where the straight run starts,
 * since nothing should render into the curved part of the border.
 */
export const BUBBLE_CAP_WIDTH = 28;

export interface BubbleProps extends React.ComponentPropsWithoutRef<'div'> {}

/** The plain hand-drawn pill, no tail — grows with its content. */
export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(function Bubble(
  { children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={[styles.bubble, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.text}>{children}</span>
    </div>
  );
});

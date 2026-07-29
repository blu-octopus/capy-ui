import * as React from 'react';
import styles from './DialogueBubble.module.css';

export interface DialogueBubbleProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Where the tail meets the underside of the bubble, as a percentage of the
   * bubble's width. The default matches the Figma artwork, where the tail sits
   * roughly three quarters across.
   * @default 73
   */
  tailOffset?: number;
  /** Hide the tail to get a plain hand-drawn pill. */
  showTail?: boolean;
}

export const DialogueBubble = React.forwardRef<HTMLDivElement, DialogueBubbleProps>(
  function DialogueBubble({ tailOffset = 73, showTail = true, children, className, ...props }, ref) {
    return (
      <div ref={ref} className={[styles.bubble, className].filter(Boolean).join(' ')} {...props}>
        <span className={styles.text}>{children}</span>
        {showTail && <span className={styles.tail} style={{ left: `${tailOffset}%` }} aria-hidden />}
      </div>
    );
  },
);

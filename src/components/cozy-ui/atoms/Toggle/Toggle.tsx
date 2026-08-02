import * as React from 'react';
import { Switch } from '@base-ui/react/switch';
import { WobbleBorder } from '../../WobbleBorder';
import styles from './Toggle.module.css';

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof Switch.Root> {}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { className, ...props },
  ref,
) {
  return (
    <Switch.Root ref={ref} className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
      <Switch.Thumb className={styles.thumb}>
        {/* Always rendered, CSS-toggled by [data-checked] — avoids tracking checked state here just to mount/unmount an SVG. */}
        <WobbleBorder width={20} height={20} radius={10} seed={11} className={styles.thumbWobble} />
      </Switch.Thumb>
    </Switch.Root>
  );
});

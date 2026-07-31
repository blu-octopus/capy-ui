import * as React from 'react';
import { Switch } from '@base-ui/react/switch';
import styles from './Toggle.module.css';

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof Switch.Root> {}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { className, ...props },
  ref,
) {
  return (
    <Switch.Root ref={ref} className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
      <Switch.Thumb className={styles.thumb} />
    </Switch.Root>
  );
});

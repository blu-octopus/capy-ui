import * as React from 'react';
import { Switch } from '@base-ui/react/switch';
import { WobbleBorder } from '../../WobbleBorder';
import { Sparks } from '../../Sparks';
import styles from './Toggle.module.css';

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof Switch.Root> {}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { className, checked, defaultChecked, onCheckedChange, ...props },
  ref,
) {
  // Switch has no Indicator subcomponent to mount/unmount off of like Checkbox's
  // does, so this tracks checked state directly just to remount Sparks fresh on
  // every check (unlike WobbleBorder below, a plain CSS opacity/color toggle
  // can't replay a burst animation — it needs a fresh element in the DOM).
  const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked ?? false);
  React.useEffect(() => {
    if (checked !== undefined) setIsChecked(checked);
  }, [checked]);

  return (
    <Switch.Root
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(next, eventDetails) => {
        setIsChecked(next);
        onCheckedChange?.(next, eventDetails);
      }}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    >
      <Switch.Thumb className={styles.thumb}>
        {/* Always rendered, CSS-toggled by [data-checked] — avoids tracking checked state here just to mount/unmount an SVG. */}
        <WobbleBorder
          width={20}
          height={20}
          radius={10}
          seed={11}
          strokeWidth={2}
          color="currentColor"
          className={styles.thumbWobble}
        />
        {isChecked && <Sparks />}
      </Switch.Thumb>
    </Switch.Root>
  );
});

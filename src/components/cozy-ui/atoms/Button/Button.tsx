import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
import { Sparks } from '../../Sparks';
import styles from './Button.module.css';

export type ButtonVariant = 'filled' | 'outlined' | 'ghost';

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  variant?: ButtonVariant;
}

const BASE_SEED = 10;

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  function Button({ variant = 'filled', className, children, onPointerEnter, onClick, ...props }, ref) {
    const [setRef, size] = useElementSize<HTMLElement>(ref);
    const [burstKey, setBurstKey] = React.useState(0);
    // Re-rolled on every hover-in so the outline redraws with a fresh
    // wobble each time, instead of jittering continuously while hovered.
    const [seed, setSeed] = React.useState(BASE_SEED);
    const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

    return (
      <BaseButton
        ref={setRef}
        className={classes}
        onPointerEnter={
          variant === 'outlined'
            ? (event) => {
                if (!props.disabled) setSeed((s) => s + 7);
                onPointerEnter?.(event);
              }
            : onPointerEnter
        }
        onClick={
          variant === 'outlined'
            ? (event) => {
                if (!props.disabled) setBurstKey((k) => k + 1);
                onClick?.(event);
              }
            : onClick
        }
        {...props}
      >
        {variant === 'outlined' && (
          <>
            <WobbleBorder width={size.width} height={size.height} radius={10} seed={seed} />
            {burstKey > 0 && <Sparks key={burstKey} />}
          </>
        )}
        {children}
      </BaseButton>
    );
  },
);

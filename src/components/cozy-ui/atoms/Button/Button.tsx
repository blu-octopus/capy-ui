import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
import styles from './Button.module.css';

export type ButtonVariant = 'filled' | 'outlined' | 'ghost';

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  function Button({ variant = 'filled', className, children, ...props }, ref) {
    const [setRef, size] = useElementSize<HTMLElement>(ref);
    const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');
    return (
      <BaseButton ref={setRef} className={classes} {...props}>
        {variant === 'outlined' && (
          <WobbleBorder width={size.width} height={size.height} radius={10} seed={10} />
        )}
        {children}
      </BaseButton>
    );
  },
);

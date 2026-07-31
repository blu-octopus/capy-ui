import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import styles from './Button.module.css';

export type ButtonVariant = 'filled' | 'outlined' | 'ghost';

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  function Button({ variant = 'filled', className, ...props }, ref) {
    const classes = [styles.button, styles[variant], className]
      .filter(Boolean)
      .join(' ');
    return <BaseButton ref={ref} className={classes} {...props} />;
  },
);

import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { useHandDrawnFilter } from '../../HandDrawnFilterDefs';
import styles from './Button.module.css';

export type ButtonVariant = 'filled' | 'outlined' | 'ghost';

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  function Button({ variant = 'filled', className, style, ...props }, ref) {
    const { filterId, filter } = useHandDrawnFilter({ scale: 1, seed: 10 });
    const classes = [styles.button, styles[variant], className]
      .filter(Boolean)
      .join(' ');
    const mergedStyle =
      variant === 'outlined'
        ? ({ ...style, '--wobble-filter': `url(#${filterId})` } as React.CSSProperties)
        : style;
    return (
      <>
        {variant === 'outlined' && filter}
        <BaseButton ref={ref} className={classes} style={mergedStyle} {...props} />
      </>
    );
  },
);

import * as React from 'react';
import styles from './Text.module.css';

export const TEXT_VARIANTS = {
  mainTimerNumber: 'span',
  secondaryTimerNumber: 'span',
  h1: 'h1',
  heading1: 'h2',
  heading2: 'h3',
  body1: 'p',
  caption: 'span',
  bodyNumberDisplay: 'span',
} as const;

export type TextVariant = keyof typeof TEXT_VARIANTS;

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  /** Override the rendered element, e.g. render `heading1` styling as a `<span>`. */
  as?: React.ElementType;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  { variant = 'body1', as, className, ...props },
  ref,
) {
  const Component = as ?? TEXT_VARIANTS[variant];
  const classes = [styles[variant], className].filter(Boolean).join(' ');
  return <Component ref={ref} className={classes} {...props} />;
});

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

/**
 * Figma marks exactly these 3 variants with "Dynamic Stroke" — an uneven,
 * hand-drawn stroke weight — replicated here with a live
 * feTurbulence/feDisplacementMap filter applied via CSS `filter: url()`,
 * which distorts real HTML text just as well as SVG shapes.
 *
 * WEB ONLY. Every other hand-drawn shape in this library moved to generated
 * path geometry (`src/sketch`) so it renders anywhere, including
 * react-native-svg — which implements neither of these two filter
 * primitives. Glyphs are the one case with no path-generation equivalent:
 * there's no boundary to offset without converting live text to outlines.
 * On React Native, expect these variants to render as plain (unwobbled)
 * text; branch on platform rather than assuming parity here.
 */
const DYNAMIC_STROKE_FILTERS: Partial<Record<TextVariant, { baseFrequency: string; scale: number; seed: number }>> = {
  mainTimerNumber: { baseFrequency: '0.045', scale: 2.2, seed: 2 },
  h1: { baseFrequency: '0.045', scale: 2.2, seed: 3 },
  secondaryTimerNumber: { baseFrequency: '0.045', scale: 1.2, seed: 5 },
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  /** Override the rendered element, e.g. render `heading1` styling as a `<span>`. */
  as?: React.ElementType;
  /** For variants Figma marks "Dynamic Stroke" (mainTimerNumber, secondaryTimerNumber, h1), whether the hand-drawn wobble filter applies. No effect on variants that never had a wobble filter to begin with. @default true */
  showWobble?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  { variant = 'body1', as, showWobble = true, className, style, ...props },
  ref,
) {
  const Component = as ?? TEXT_VARIANTS[variant];
  const classes = [styles[variant], className].filter(Boolean).join(' ');
  const filterId = React.useId();
  const wobble = showWobble ? DYNAMIC_STROKE_FILTERS[variant] : undefined;

  return (
    <>
      {wobble && (
        <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
          <defs>
            <filter id={filterId} x="-10%" y="-30%" width="120%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={wobble.baseFrequency}
                numOctaves={2}
                seed={wobble.seed}
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={wobble.scale} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}
      <Component ref={ref} className={classes} style={wobble ? { ...style, filter: `url(#${filterId})` } : style} {...props} />
    </>
  );
});

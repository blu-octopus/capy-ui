import * as React from 'react';

export interface HandDrawnFilterOptions {
  /** feTurbulence baseFrequency — higher is finer/tighter noise. */
  baseFrequency?: string;
  numOctaves?: number;
  /** Fixed per instance (not randomized per render), matching Bubble's/Text's filters — same size + seed always reproduces the same wobble. */
  seed?: number;
  /** feDisplacementMap scale — how far the wobble pushes the stroke, in px. */
  scale?: number;
}

const DEFAULTS: Required<HandDrawnFilterOptions> = {
  baseFrequency: '0.045',
  numOctaves: 2,
  seed: 1,
  scale: 1.5,
};

export interface HandDrawnFilterDefsProps extends HandDrawnFilterOptions {
  id: string;
}

/**
 * The feTurbulence/feDisplacementMap defs block behind every hand-drawn wobble
 * in this library (Bubble's outline, Text's dynamic-stroke variants, and — via
 * this shared component — plain rect/pill borders on Button/Modal/card
 * organisms). Renders nothing visible on its own; reference `id` from a CSS
 * `filter: url(#id)` or SVG `filter="url(#id)"` on whatever should wobble.
 */
export function HandDrawnFilterDefs({
  id,
  baseFrequency = DEFAULTS.baseFrequency,
  numOctaves = DEFAULTS.numOctaves,
  seed = DEFAULTS.seed,
  scale = DEFAULTS.scale,
}: HandDrawnFilterDefsProps) {
  return (
    <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <filter id={id} x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves={numOctaves} seed={seed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/** Generates a stable per-instance filter id and the defs element to render it. */
export function useHandDrawnFilter(options?: HandDrawnFilterOptions) {
  const filterId = React.useId();
  const filter = <HandDrawnFilterDefs id={filterId} {...options} />;
  return { filterId, filter };
}

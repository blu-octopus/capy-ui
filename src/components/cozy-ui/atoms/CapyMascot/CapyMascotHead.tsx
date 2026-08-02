import type { SVGProps } from 'react';
import { CapyMascotHeadIcon } from './CapyMascotHeadIcon';

export interface CapyMascotHeadProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /** Rendered height in pixels; width follows the illustration's own aspect ratio. */
  size?: number;
}

const NATURAL_HEIGHT = 110.75;
const NATURAL_WIDTH = 107.98;

export function CapyMascotHead({ size = NATURAL_HEIGHT, ...props }: CapyMascotHeadProps) {
  return <CapyMascotHeadIcon width={(size * NATURAL_WIDTH) / NATURAL_HEIGHT} height={size} {...props} />;
}

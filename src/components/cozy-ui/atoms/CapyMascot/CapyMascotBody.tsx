import type { SVGProps } from 'react';
import { CapyMascotBodyIcon } from './CapyMascotBodyIcon';

export interface CapyMascotBodyProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /** Rendered height in pixels; width follows the illustration's own aspect ratio. */
  size?: number;
}

const NATURAL_HEIGHT = 111.5;
const NATURAL_WIDTH = 109.81;

export function CapyMascotBody({ size = NATURAL_HEIGHT, ...props }: CapyMascotBodyProps) {
  return <CapyMascotBodyIcon width={(size * NATURAL_WIDTH) / NATURAL_HEIGHT} height={size} {...props} />;
}

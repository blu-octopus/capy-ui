import type { SVGProps } from 'react';
import { CapyMascotIcon } from './CapyMascotIcon';
import { CapyMascotRoughIcon } from './CapyMascotRoughIcon';

export type CapyMascotVariant = 'default' | 'rough';

export interface CapyMascotProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  variant?: CapyMascotVariant;
  /** Rendered height in pixels; width follows the illustration's own aspect ratio. */
  size?: number;
}

const NATURAL_HEIGHT = 206;
const NATURAL_WIDTH: Record<CapyMascotVariant, number> = { default: 110, rough: 115 };

export function CapyMascot({ variant = 'default', size = NATURAL_HEIGHT, ...props }: CapyMascotProps) {
  const Icon = variant === 'rough' ? CapyMascotRoughIcon : CapyMascotIcon;
  return <Icon width={(size * NATURAL_WIDTH[variant]) / NATURAL_HEIGHT} height={size} {...props} />;
}

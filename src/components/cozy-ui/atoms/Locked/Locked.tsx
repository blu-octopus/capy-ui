import type { SVGProps } from 'react';
import { LockedIcon } from './LockedIcon';

export interface LockedProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
}

export function Locked({ size = 63, ...props }: LockedProps) {
  return <LockedIcon width={(size * 52) / 63} height={size} {...props} />;
}

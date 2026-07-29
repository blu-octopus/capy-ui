import type { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /**
   * Rendered height in pixels. Width follows the icon's own aspect ratio, since
   * the Figma icons are not all square.
   * @default the icon's natural height
   */
  size?: number;
}

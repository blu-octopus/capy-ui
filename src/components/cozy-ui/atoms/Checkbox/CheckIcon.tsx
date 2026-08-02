import type { SVGProps } from 'react';

/**
 * CheckIcon — path geometry from Figma export at assets/check.svg, with one
 * deliberate deviation from that export: the two subpaths are reordered
 * (short stroke first) and the long stroke's point order is reversed, so a
 * `stroke-dashoffset` draw animation reveals it as one continuous hand
 * motion — short stroke down-left first, then a long stroke sweeping up
 * from that same dip to the top-right tip — instead of the export's
 * original order, which drew the long stroke tip-to-dip (backwards) before
 * the short stroke. The curve shapes themselves are untouched; only
 * traversal order changed. Do not otherwise hand-edit.
 */
export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.0 5.39L1.08 5.45L2.0 5.5C2.4 5.75 2.36 6.29 2.53 6.48L3.22 6.71C3.39 6.9 3.59 7.05 3.81 7.16L4.5 7.5C4.73 7.61 4.95 7.74 5.16 7.87L5.61 8.62C5.82 8.75 6.02 8.91 6.2 9.09L6.73 9.63C6.9 9.81 7.03 9.93 7.09 9.98L7.2 10.05L7.32 10.13L7.4 10.19M7.01 10.45L7.07 10.37L7.12 10.4L7.17 10.38C7.21 10.36 7.31 10.26 7.48 10.08L7.98 9.52C8.15 9.34 8.3 9.14 8.43 8.92L8.83 8.27C8.96 8.06 9.1 7.86 9.26 7.66L9.74 7.09C9.9 6.89 10.08 6.71 10.26 6.54L10.83 6.03C11.01 5.87 11.18 5.68 11.32 5.47L11.75 4.85C11.9 4.65 12.03 4.43 12.15 4.21L12.51 3.54C12.64 3.32 12.8 3.12 12.99 2.96L13.59 2.48C13.79 2.32 14.02 2.04 14.28 1.66L14.68 1.08L14.74 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

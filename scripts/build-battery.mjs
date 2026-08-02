/**
 * Builds BatteryIndicator from the 4 Figma variant exports in
 * BatteryIndicator/assets. Each variant's fill is a hand-drawn, slanted
 * pennant shape (not a plain rect), so the variants are baked as fixed SVGs
 * rather than a single component driven by a numeric percentage.
 *
 *   node scripts/build-battery.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'cozy-ui', 'atoms', 'BatteryIndicator');
const ARTBOARD_WIDTH = '1523';
const BACKGROUND_FILLS = ['#F5F5F5', '#F1EBD8'];
const PRECISION = 2;

const VARIANTS = ['default', 'variant2', 'variant3', 'variant4'];

const isArtboardBackground = (rect) =>
  rect.includes(`width="${ARTBOARD_WIDTH}"`) || BACKGROUND_FILLS.some((fill) => rect.includes(fill));

function clean(svg) {
  return svg
    .replace(/<rect[^>]*\/>\s*/g, (rect) => (isArtboardBackground(rect) ? '' : rect))
    // Figma's dashed purple frame guide for the "battery Container" group — not artwork.
    .replace(/<rect[^>]*stroke-dasharray[^>]*\/>\s*/g, '')
    .replace(/ id="[^"]*"/g, '')
    .replace(/<g>\s*/g, '<g>')
    .replace(/-?\d+\.\d+/g, (n) => String(Number(Number(n).toFixed(PRECISION))))
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/\n\s*\n/g, '\n');
}

function toMarkup(variant) {
  const svg = readFileSync(join(DIR, 'assets', `${variant}.svg`), 'utf8');
  const [, width, height] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const body = clean(svg)
    .replace(/^<svg[^>]*>\n?/, '')
    .replace(/<\/svg>\s*$/, '')
    .trimEnd()
    .split('\n')
    .map((line) => (line ? `        ${line}` : line))
    .join('\n');
  return { width, height, body };
}

const cases = VARIANTS.map((variant) => {
  const { width, height, body } = toMarkup(variant);
  return `    case '${variant}':
      return (
        <svg width={${width}} height={${height}} viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
${body}
        </svg>
      );`;
}).join('\n');

writeFileSync(
  join(DIR, 'BatteryIndicator.tsx'),
  `import type { SVGProps } from 'react';

export type BatteryIndicatorVariant = 'default' | 'variant2' | 'variant3' | 'variant4';

export interface BatteryIndicatorProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /**
   * Matches the Figma variant names directly rather than a numeric percentage:
   * the fill in each is a hand-drawn, slanted pennant shape, not a plain rect,
   * so intermediate values can't be derived from these four.
   * - default: ~56% fill, green
   * - variant2: ~33% fill, yellow
   * - variant3: ~20% fill, red
   * - variant4: ~90% fill, green
   */
  variant?: BatteryIndicatorVariant;
}

/** BatteryIndicator — generated from Figma by scripts/build-battery.mjs. Do not edit by hand. */
export function BatteryIndicator({ variant = 'default', ...props }: BatteryIndicatorProps) {
  switch (variant) {
${cases}
    default:
      return null;
  }
}
`,
);

console.log(`Generated BatteryIndicator.tsx with variants: ${VARIANTS.join(', ')}`);

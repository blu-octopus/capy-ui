/**
 * Builds the Favicon component from the capybara head artwork exported from
 * Figma at src/components/cozy-ui/Favicon/assets. Figma has hand-drawn
 * artwork at 16px, 48px, and a large (~108x111) size — each drawn separately
 * rather than one asset scaled up, so all three are baked as fixed variants.
 *
 *   node scripts/build-favicon.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'cozy-ui', 'atoms', 'Favicon');
const ARTBOARD_WIDTH = '1523';
const BACKGROUND_FILLS = ['#F5F5F5', '#F1EBD8'];
const PRECISION = 2;

const SIZES = [
  { size: 16, file: 'head-16' },
  { size: 48, file: 'head-48' },
  { size: 128, file: 'head-large' },
];

const isArtboardBackground = (rect) =>
  rect.includes(`width="${ARTBOARD_WIDTH}"`) || BACKGROUND_FILLS.some((fill) => rect.includes(fill));

function toMarkup(file) {
  const raw = readFileSync(join(DIR, 'assets', `${file}.svg`), 'utf8');
  const [, viewBox] = raw.match(/viewBox="([^"]*)"/);
  const body = raw
    .replace(/^<svg[^>]*>\n?/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<rect[^>]*\/>\s*/g, (rect) => (isArtboardBackground(rect) ? '' : rect))
    .replace(/ id="[^"]*"/g, '')
    .replace(/<g>\s*/g, '<g>')
    .replace(/style="[^"]*"\s*/g, '')
    .replace(/-?\d+\.\d+/g, (n) => String(Number(Number(n).toFixed(PRECISION))))
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/preserveAspectRatio="[^"]*"\s*/g, '')
    .replace(/overflow="[^"]*"\s*/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trimEnd()
    .split('\n')
    .map((line) => (line ? `        ${line}` : line))
    .join('\n');
  return { viewBox, body };
}

const variants = SIZES.map(({ size, file }) => ({ size, ...toMarkup(file) }));

const cases = variants
  .map(
    ({ size, viewBox, body }) => `    case ${size}:
      return (
        <svg width={${size}} height={${size}} viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
${body}
        </svg>
      );`,
  )
  .join('\n');

const sizeUnion = SIZES.map((s) => s.size).join(' | ');

writeFileSync(
  join(DIR, 'Favicon.tsx'),
  `import type { SVGProps } from 'react';

export interface FaviconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /** Each size is drawn separately in Figma, not scaled from one asset. */
  size?: ${sizeUnion};
}

/** Favicon — generated from Figma by scripts/build-favicon.mjs. Do not edit by hand. */
export function Favicon({ size = ${SIZES[0].size}, ...props }: FaviconProps) {
  switch (size) {
${cases}
    default:
      return null;
  }
}
`,
);

console.log(`Generated Favicon.tsx with sizes: ${SIZES.map((s) => s.size).join(', ')}`);

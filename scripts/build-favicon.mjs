/**
 * Builds the Favicon component from the capybara head artwork exported from
 * Figma at src/components/cozy-ui/Favicon/assets. Figma only has hand-drawn
 * artwork at 16px and 48px — the 128px placeholder in the file is empty, so
 * there is no source to build a third size from.
 *
 *   node scripts/build-favicon.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'cozy-ui', 'Favicon');
const SIZES = [16, 48];

function toMarkup(name) {
  const raw = readFileSync(join(DIR, 'assets', `${name}.svg`), 'utf8');
  const [, viewBox] = raw.match(/viewBox="([^"]*)"/);
  const body = raw
    .replace(/^<svg[^>]*>\n?/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/style="[^"]*"\s*/g, '')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/preserveAspectRatio="[^"]*"\s*/g, '')
    .replace(/overflow="[^"]*"\s*/g, '')
    .trimEnd()
    .split('\n')
    .map((line) => (line ? `        ${line}` : line))
    .join('\n');
  return { viewBox, body };
}

const variants = SIZES.map((size) => ({ size, ...toMarkup(`head-${size}`) }));

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

const sizeUnion = SIZES.join(' | ');

writeFileSync(
  join(DIR, 'Favicon.tsx'),
  `import type { SVGProps } from 'react';

export interface FaviconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /**
   * Figma only has hand-drawn favicon artwork at these two sizes — there is no
   * source for a scaled-up 128px version, so it isn't offered here.
   */
  size?: ${sizeUnion};
}

/** Favicon — generated from Figma by scripts/build-favicon.mjs. Do not edit by hand. */
export function Favicon({ size = ${SIZES[0]}, ...props }: FaviconProps) {
  switch (size) {
${cases}
    default:
      return null;
  }
}
`,
);

console.log(`Generated Favicon.tsx with sizes: ${SIZES.join(', ')}`);

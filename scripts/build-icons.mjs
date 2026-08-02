/**
 * Regenerates the icon components in src/components/cozy-ui/icons from the
 * SVGs exported out of Figma into icons/assets.
 *
 * Figma's node export wraps each icon in the surrounding artboard, so the raw
 * files carry three background rects that have to come off. The brown line art
 * is remapped to currentColor so icons take their colour from CSS; the white
 * fill is the paper showing through the hand-drawn stroke and stays put.
 *
 *   node scripts/build-icons.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICONS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'cozy-ui', 'atoms', 'icons');
const ASSETS_DIR = join(ICONS_DIR, 'assets');

const LINE_ART = '#823D00';
const ARTBOARD_WIDTH = '1523';
const BACKGROUND_FILLS = ['#F5F5F5', '#F1EBD8'];
const PRECISION = 2;

const pascalCase = (name) => name.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());

const isArtboardBackground = (rect) =>
  rect.includes(`width="${ARTBOARD_WIDTH}"`) ||
  BACKGROUND_FILLS.some((fill) => rect.includes(fill));

function clean(svg) {
  return (
    svg
      // Artboard backgrounds Figma bakes into a node export.
      .replace(/<rect[^>]*\/>\s*/g, (rect) => (isArtboardBackground(rect) ? '' : rect))
      // Layer names would become duplicate DOM ids as soon as two icons render.
      .replace(/ id="[^"]*"/g, '')
      // Drop the artboard wrapper the export leaves behind once it is empty.
      .replace(/<g>\s*/g, '<g>')
      // Trim coordinate precision — the hand-drawn strokes carry far more than
      // an icon-sized render can show, and it triples the file size.
      .replace(/-?\d+\.\d+/g, (n) => String(Number(Number(n).toFixed(PRECISION))))
      .replace(new RegExp(LINE_ART, 'gi'), 'currentColor')
      // SVG kebab-case attrs aren't valid JSX identifiers.
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-dasharray=/g, 'strokeDasharray=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/\n\s*\n/g, '\n')
  );
}

function toComponent(name, svg) {
  const componentName = `${pascalCase(name)}Icon`;
  const [, width, height] = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const body = clean(svg)
    .replace(/^<svg[^>]*>\n?/, '')
    .replace(/<\/svg>\s*$/, '')
    .trimEnd()
    .split('\n')
    .map((line) => (line ? `      ${line}` : line))
    .join('\n');

  return `import type { IconProps } from './types';

/** ${componentName} — generated from Figma by scripts/build-icons.mjs. Do not edit by hand. */
export function ${componentName}({ size = ${height}, ...props }: IconProps) {
  return (
    <svg
      width={(size * ${width}) / ${height}}
      height={size}
      viewBox="0 0 ${width} ${height}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
${body}
    </svg>
  );
}
`;
}

const names = readdirSync(ASSETS_DIR)
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace('.svg', ''))
  .sort();

for (const name of names) {
  const svg = readFileSync(join(ASSETS_DIR, `${name}.svg`), 'utf8');
  writeFileSync(join(ICONS_DIR, `${pascalCase(name)}Icon.tsx`), toComponent(name, svg));
}

const exports = names
  .map((name) => `export { ${pascalCase(name)}Icon } from './${pascalCase(name)}Icon';`)
  .join('\n');
writeFileSync(join(ICONS_DIR, 'index.ts'), `export type { IconProps } from './types';\n${exports}\n`);

console.log(`Generated ${names.length} icons: ${names.join(', ')}`);

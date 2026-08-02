/**
 * Generates one-off icon components (coin ring/fill, locked padlock) from their
 * Figma exports, reusing the same artboard/precision cleanup as build-icons.mjs.
 * Unlike the icon set these keep their Figma fill colors (yellow coin, brown
 * line art) instead of switching to currentColor, since they aren't meant to be
 * recolored.
 *
 *   node scripts/build-misc-icons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'cozy-ui');
const ARTBOARD_WIDTH = '1523';
const BACKGROUND_FILLS = ['#F5F5F5', '#F1EBD8'];
const PRECISION = 2;

const isArtboardBackground = (rect) =>
  rect.includes(`width="${ARTBOARD_WIDTH}"`) || BACKGROUND_FILLS.some((fill) => rect.includes(fill));

function clean(svg) {
  return svg
    .replace(/<rect[^>]*\/>\s*/g, (rect) => (isArtboardBackground(rect) ? '' : rect))
    .replace(/ id="[^"]*"/g, '')
    .replace(/<g>\s*/g, '<g>')
    .replace(/-?\d+\.\d+/g, (n) => String(Number(Number(n).toFixed(PRECISION))))
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/\n\s*\n/g, '\n');
}

function toComponent(componentName, svgPath) {
  const svg = readFileSync(svgPath, 'utf8');
  const [, width, height] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const body = clean(svg)
    .replace(/^<svg[^>]*>\n?/, '')
    .replace(/<\/svg>\s*$/, '')
    .trimEnd()
    .split('\n')
    .map((line) => (line ? `      ${line}` : line))
    .join('\n');

  return `import type { SVGProps } from 'react';

/** ${componentName} — generated from Figma by scripts/build-misc-icons.mjs. Do not edit by hand. */
export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
${body}
    </svg>
  );
}
`;
}

const targets = [
  { dir: 'molecules/CoinWallet', asset: 'ellipse1.svg', name: 'CoinRingIcon' },
  { dir: 'molecules/CoinWallet', asset: 'ellipse2.svg', name: 'CoinInnerIcon' },
  { dir: 'molecules/CoinWallet', asset: 'coin-symbol.svg', name: 'CoinSymbolIcon' },
  { dir: 'atoms/Locked', asset: 'lock.svg', name: 'LockedIcon' },
  { dir: 'atoms/CapyMascot', asset: 'mascot.svg', name: 'CapyMascotIcon' },
  { dir: 'atoms/CapyMascot', asset: 'mascot-rough.svg', name: 'CapyMascotRoughIcon' },
  { dir: 'atoms/CapyMascot', asset: 'mascot-head.svg', name: 'CapyMascotHeadIcon' },
  { dir: 'atoms/CapyMascot', asset: 'mascot-body.svg', name: 'CapyMascotBodyIcon' },
];

for (const { dir, asset, name } of targets) {
  const svgPath = join(ROOT, dir, 'assets', asset);
  writeFileSync(join(ROOT, dir, `${name}.tsx`), toComponent(name, svgPath));
  console.log(`Wrote ${dir}/${name}.tsx`);
}

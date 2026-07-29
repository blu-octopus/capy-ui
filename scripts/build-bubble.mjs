/**
 * Splits the Figma dialogue bubble export into the two pieces the component needs.
 *
 * The bubble is a single Union path: a 229x47 pill with a tail hanging off the
 * underside at x=154..190. Because the tail sits mid-span rather than in a
 * corner, a plain border-image on the whole artwork would tile the tail once per
 * repeat. Cropping the viewBox instead gives us a pill that can stretch and a
 * tail we can place once.
 *
 *   node scripts/build-bubble.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'cozy-ui', 'assets');
const PRECISION = 1;

// Measured off the rendered export.
const BODY = { x: 0, y: 0, w: 229, h: 48 };
const TAIL = { x: 150, y: 46, w: 42, h: 43 };

const source = readFileSync(join(ASSETS, 'dialogue-bubble.svg'), 'utf8');

const round = (svg) =>
  svg.replace(/-?\d+\.\d+/g, (n) => String(Number(Number(n).toFixed(PRECISION))));

function crop({ x, y, w, h }) {
  return round(source).replace(
    /<svg[^>]*>/,
    `<svg width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">`,
  );
}

writeFileSync(join(ASSETS, 'dialogue-bubble-body.svg'), crop(BODY));
writeFileSync(join(ASSETS, 'dialogue-bubble-tail.svg'), crop(TAIL));

console.log('Wrote dialogue-bubble-body.svg and dialogue-bubble-tail.svg');

/**
 * Splits the Figma dialogue bubble export into the two pieces the components need.
 *
 * The bubble is a single Union path: a 229x47 pill with a tail hanging off the
 * underside at x=154..190. Because the tail sits mid-span rather than in a
 * corner, a plain border-image on the whole artwork would tile the tail once per
 * repeat. Cropping the viewBox instead gives us a pill that can stretch (owned
 * by Bubble) and a tail placed once by DialogueBubble.
 *
 *   node scripts/build-bubble.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'cozy-ui');
const SOURCE = join(ROOT, 'DialogueBubble', 'assets', 'dialogue-bubble.svg');
const PRECISION = 1;

// Measured off the rendered export.
const BODY = { x: 0, y: 0, w: 229, h: 48, out: join(ROOT, 'Bubble', 'assets', 'dialogue-bubble-body.svg') };
const TAIL = { x: 150, y: 46, w: 42, h: 43, out: join(ROOT, 'DialogueBubble', 'assets', 'dialogue-bubble-tail.svg') };

const source = readFileSync(SOURCE, 'utf8');

const round = (svg) =>
  svg.replace(/-?\d+\.\d+/g, (n) => String(Number(Number(n).toFixed(PRECISION))));

function crop({ x, y, w, h }) {
  return round(source).replace(
    /<svg[^>]*>/,
    `<svg width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">`,
  );
}

for (const region of [BODY, TAIL]) {
  writeFileSync(region.out, crop(region));
}

console.log('Wrote Bubble/assets/dialogue-bubble-body.svg and DialogueBubble/assets/dialogue-bubble-tail.svg');

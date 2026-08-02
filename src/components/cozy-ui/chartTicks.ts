/**
 * Picks "nice" round axis steps (1/2/5 × a power of 10) instead of dividing
 * the max into equal but arbitrary fractions — the same algorithm d3-scale
 * uses under the hood for `.ticks()`/`.nice()` (see Lucid UI's `Axis`
 * component, which wraps it), reimplemented here without the dependency so
 * it stays safe for the React Native build.
 */
function tickStep(max: number, count: number): number {
  const rawStep = max / Math.max(1, count);
  const pow10 = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const error = rawStep / pow10;
  if (error >= Math.sqrt(50)) return pow10 * 10;
  if (error >= Math.sqrt(10)) return pow10 * 5;
  if (error >= Math.sqrt(2)) return pow10 * 2;
  return pow10;
}

/** Rounds `max` up to the nearest nice step boundary — use this to pick an axis's own top value when it isn't given explicitly. */
export function niceMax(max: number, count = 3): number {
  if (!(max > 0)) return count;
  const step = tickStep(max, count);
  return Math.ceil(max / step) * step;
}

/** Nice tick values from 0 up to (and not exceeding) `max`, spaced at a round step. The last tick won't always land exactly on `max` — that's expected and matches d3's own behavior. */
export function niceTicks(max: number, count = 3): number[] {
  if (!(max > 0)) return [0];
  const step = tickStep(max, count);
  const ticks: number[] = [];
  for (let v = step; v <= max + step * 1e-9; v += step) {
    ticks.push(Math.round(v * 1e6) / 1e6);
  }
  return ticks.length ? ticks : [max];
}

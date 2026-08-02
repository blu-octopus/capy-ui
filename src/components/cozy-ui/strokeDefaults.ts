/**
 * Shared hand-drawn stroke language: same color, weight, and wobble "hand
 * feel" everywhere a generated outline appears (Button's outlined variant,
 * Bubble/DialogueBubble, the WobbleBorder-based cards). Each shape still
 * passes its own `seed` to `generateWobbleRibbon`/`WobbleBorder` so the
 * wobble pattern differs per component even though the parameters match.
 */
export const STROKE_COLOR = 'var(--color-brand-brown)';
export const STROKE_WIDTH = 1.5;
export const STROKE_FREQUENCY = 0.05;
export const STROKE_WIGGLE = 1;
export const STROKE_WIDTH_VARIANCE = 0.5;

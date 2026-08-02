import * as React from 'react';

export interface ProgressRingProps extends React.SVGProps<SVGSVGElement> {
  /** 0-100. Rendered as a filled pie wedge, matching the Figma "Sessions" indicator — not a stroked donut. */
  value: number;
  size?: number;
  trackColor?: string;
  progressColor?: string;
}

function wedgePoint(center: number, radius: number, percent: number) {
  const angle = (percent / 100) * 2 * Math.PI - Math.PI / 2;
  return [center + radius * Math.cos(angle), center + radius * Math.sin(angle)];
}

const ANIMATION_MS = 600;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function ProgressRing({
  value,
  size = 12,
  trackColor = '#D9D9D9',
  progressColor = 'var(--color-green-primary)',
  ...props
}: ProgressRingProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  // Animates the wedge sweeping in from 0 rather than snapping to its final
  // value — a `d` attribute can't be CSS-transitioned (browsers don't
  // interpolate arc commands), so the percent driving the path is animated
  // in JS instead and the path recomputed each frame.
  const [animated, setAnimated] = React.useState(0);
  const animatedRef = React.useRef(0);

  React.useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      animatedRef.current = clamped;
      setAnimated(clamped);
      return;
    }
    const from = animatedRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / ANIMATION_MS, 1);
      const next = from + (clamped - from) * easeOutCubic(t);
      animatedRef.current = next;
      setAnimated(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clamped]);

  const center = size / 2;
  const radius = size / 2;
  const [x, y] = wedgePoint(center, radius, animated);
  const largeArc = animated > 50 ? 1 : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...props}>
      <circle cx={center} cy={center} r={radius} fill={trackColor} />
      {animated > 0 && (
        <path
          d={
            animated >= 100
              ? `M ${center} ${center} m 0 ${-radius} a ${radius} ${radius} 0 1 1 -0.001 0 Z`
              : `M ${center} ${center} L ${center} ${center - radius} A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y} Z`
          }
          fill={progressColor}
        />
      )}
    </svg>
  );
}

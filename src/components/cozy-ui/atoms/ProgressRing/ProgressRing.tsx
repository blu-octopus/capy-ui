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

export function ProgressRing({
  value,
  size = 12,
  trackColor = '#D9D9D9',
  progressColor = 'var(--color-green-primary)',
  ...props
}: ProgressRingProps) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const center = size / 2;
  const radius = size / 2;
  const [x, y] = wedgePoint(center, radius, clamped);
  const largeArc = clamped > 50 ? 1 : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...props}>
      <circle cx={center} cy={center} r={radius} fill={trackColor} />
      {clamped > 0 && (
        <path
          d={
            clamped >= 100
              ? `M ${center} ${center} m 0 ${-radius} a ${radius} ${radius} 0 1 1 -0.001 0 Z`
              : `M ${center} ${center} L ${center} ${center - radius} A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y} Z`
          }
          fill={progressColor}
        />
      )}
    </svg>
  );
}

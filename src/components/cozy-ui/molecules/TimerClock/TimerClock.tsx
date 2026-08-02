import * as React from 'react';
import { Text } from '../../atoms/Text';
import { formatClock } from './formatClock';
import styles from './TimerClock.module.css';

export interface TimerClockProps {
  /** Countdown starts here (direction="down"), or the elapsed starting point (direction="up"). */
  seconds: number;
  /** 'down' ticks toward 0 and fires `onComplete` there; 'up' counts up indefinitely, or toward `target` if given. @default 'down' */
  direction?: 'up' | 'down';
  /** Fully controlled play/pause — pair with a Play/Pause `<Button>` rather than the clock managing its own start/stop. @default true */
  running?: boolean;
  /** Stops an 'up' clock once reached and fires `onComplete`. Ignored for 'down' (which always stops at 0). */
  target?: number;
  /** Called once per second with the new value — lets a consumer mirror the count into other UI (e.g. a `<ProgressRing>`). */
  onTick?: (seconds: number) => void;
  /** Called once when a 'down' clock reaches 0, or an 'up' clock reaches `target`. */
  onComplete?: () => void;
  variant?: 'mainTimerNumber' | 'secondaryTimerNumber';
  className?: string;
}

/**
 * A real ticking MM:SS display — not a one-shot "animate to a target"
 * counter. Every second the shown value advances by exactly 1 via
 * `setInterval` (no animation library; matches the dependency-free,
 * React-Native-safe approach used by `ProgressRing`'s animation). Only the
 * digits that actually changed play a roll-in transition, via CSS keyframes
 * triggered by React remounting just those characters — the same
 * remount-triggers-animation trick `Checkbox`'s spark burst uses.
 */
export const TimerClock = React.forwardRef<HTMLElement, TimerClockProps>(function TimerClock(
  { seconds, direction = 'down', running = true, target, onTick, onComplete, variant = 'mainTimerNumber', className },
  ref,
) {
  const [remaining, setRemaining] = React.useState(seconds);
  const remainingRef = React.useRef(remaining);
  remainingRef.current = remaining;

  const onTickRef = React.useRef(onTick);
  onTickRef.current = onTick;
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  // `seconds` is the reset point, not a live value — changing it (e.g. a new session length) restarts the clock from there.
  React.useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  React.useEffect(() => {
    if (!running) return;
    const isFinished =
      direction === 'down' ? remainingRef.current <= 0 : target != null && remainingRef.current >= target;
    if (isFinished) return;

    // Anchored to wall-clock time rather than counting "one tick = one
    // second" — a backgrounded or throttled tab (routine for a Pomodoro
    // timer on mobile) delays or coalesces setInterval callbacks, so a naive
    // per-tick counter drifts. Recomputing from elapsed real time on every
    // poll makes the shown value self-correct regardless of how late any
    // individual tick fires. `remaining` is deliberately read once here
    // (not a dep) — pausing freezes it, and resuming re-anchors from
    // wherever it was frozen via the `running` dependency below.
    const anchorTime = performance.now();
    const anchorValue = remainingRef.current;

    const id = setInterval(() => {
      const elapsed = Math.floor((performance.now() - anchorTime) / 1000);
      const next = direction === 'down' ? anchorValue - elapsed : anchorValue + elapsed;
      const clamped = direction === 'down' ? Math.max(next, 0) : target != null ? Math.min(next, target) : next;

      setRemaining((prev) => {
        if (clamped === prev) return prev;
        onTickRef.current?.(clamped);
        return clamped;
      });

      const done = direction === 'down' ? clamped === 0 : target != null && clamped === target;
      if (done) {
        onCompleteRef.current?.();
        clearInterval(id);
      }
    }, 250);

    return () => clearInterval(id);
    // `seconds` isn't read in this effect body, but it's included so an explicit reset (a new `seconds` prop) re-anchors the interval instead of continuing from the old value.
  }, [running, direction, target, seconds]);

  const display = formatClock(remaining);

  return (
    <Text ref={ref} variant={variant} className={className}>
      {[...display].map((char, i) => (
        <span key={`${i}-${char}`} className={styles.digit}>
          {char}
        </span>
      ))}
    </Text>
  );
});

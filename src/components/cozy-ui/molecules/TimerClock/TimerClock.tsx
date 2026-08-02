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
 * Gives the CURRENT render access to what `value` was as of the previous
 * completed render (the classic `usePrevious` pattern). The ref is written
 * in an effect — not mutated inline during render — specifically so
 * StrictMode's double-render in dev can't make it observe its own
 * in-progress render as "previous".
 */
function usePrevious<T>(value: T): T {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * A real ticking MM:SS display — not a one-shot "animate to a target"
 * counter. Every second the shown value advances by exactly 1 via
 * `setInterval` (no animation library; matches the dependency-free,
 * React-Native-safe approach used by `ProgressRing`'s animation).
 *
 * Digits that change scroll like an odometer wheel — clipped to a
 * one-line-tall box via `overflow: hidden` so the outgoing/incoming digit
 * never spills outside its cell — sliding upward for `direction="up"` and
 * downward for `direction="down"`, on a bezier ease so the motion settles
 * rather than snapping.
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
  const prevDisplay = usePrevious(display);
  const scrollClass = direction === 'down' ? styles.scrollDown : styles.scrollUp;

  return (
    <Text ref={ref} variant={variant} className={className}>
      {[...display].map((char, i) => {
        const prevChar = prevDisplay[i];

        // Unchanged (or no prior value yet, e.g. first render) — a plain
        // static cell, no transition to play.
        if (prevChar === undefined || prevChar === char) {
          return (
            <span key={`static-${i}`} className={styles.digitBox}>
              <span className={styles.digitCell}>{char}</span>
            </span>
          );
        }

        // Both the outgoing and incoming digit render together for the
        // scroll's duration; which sits on top depends on which way the
        // wheel turns. Keying by the transition's own before/after value
        // (not just the index) remounts a fresh instance per change, which
        // is what (re)triggers the CSS animation — same trick as the
        // Checkbox spark burst.
        const top = direction === 'down' ? char : prevChar;
        const bottom = direction === 'down' ? prevChar : char;
        return (
          <span key={`${i}-${prevChar}-${char}`} className={styles.digitBox}>
            <span className={[styles.digitTrack, scrollClass].join(' ')}>
              <span className={styles.digitCell}>{top}</span>
              <span className={styles.digitCell}>{bottom}</span>
            </span>
          </span>
        );
      })}
    </Text>
  );
});

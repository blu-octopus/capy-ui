import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimerClock } from './TimerClock';
import { Button } from '../../atoms/Button';
import { TimerToggle } from '../TimerToggle';
import { PlayIcon, PauseIcon } from '../../atoms/icons';

const meta: Meta<typeof TimerClock> = {
  title: 'CozyUI/Timer/TimerClock',
  component: TimerClock,
};

export default meta;
type Story = StoryObj<typeof TimerClock>;

/** Ticks down once a second. 10s (not a real 25-minute session) so the roll-in transition is visible without waiting. */
export const CountDown: Story = {
  args: { seconds: 10, direction: 'down' },
};

/** Ticks up once a second, stopping at `target`. */
export const CountUp: Story = {
  args: { seconds: 0, direction: 'up', target: 10 },
};

export const Secondary: Story = {
  args: { seconds: 10, direction: 'down', variant: 'secondaryTimerNumber' },
};

/**
 * The intended real composition: a Play/Pause `<Button>` drives `running`,
 * `<TimerToggle>` drives `direction` — `TimerClock` itself stays a plain
 * controlled ticker with no play/pause UI of its own.
 */
export const WithControls: Story = {
  render: function Render() {
    const [running, setRunning] = React.useState(false);
    const [direction, setDirection] = React.useState<'up' | 'down'>('down');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <TimerClock seconds={25} direction={direction} running={running} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="outlined" onClick={() => setRunning((r) => !r)}>
            {running ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
          </Button>
          <TimerToggle
            value={direction}
            onValueChange={(value) => setDirection(value as 'up' | 'down')}
          />
        </div>
      </div>
    );
  },
};

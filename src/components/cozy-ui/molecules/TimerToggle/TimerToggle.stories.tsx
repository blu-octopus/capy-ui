import type { Meta, StoryObj } from '@storybook/react';
import { TimerToggle } from './TimerToggle';

const meta: Meta<typeof TimerToggle> = {
  title: 'CozyUI/Timer/TimerToggle',
  component: TimerToggle,
};

export default meta;
type Story = StoryObj<typeof TimerToggle>;

export const CountUp: Story = {
  args: { defaultValue: 'up' },
};

export const CountDown: Story = {
  args: { defaultValue: 'down' },
};

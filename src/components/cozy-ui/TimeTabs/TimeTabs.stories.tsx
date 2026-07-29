import type { Meta, StoryObj } from '@storybook/react';
import { TimeTabs } from './TimeTabs';

const meta: Meta<typeof TimeTabs> = {
  title: 'CozyUI/TimeTabs',
  component: TimeTabs,
};

export default meta;
type Story = StoryObj<typeof TimeTabs>;

export const Default: Story = {
  args: {
    tabs: ['Today', 'Week', 'Month', 'Custom'],
    defaultValue: 'Today',
  },
};

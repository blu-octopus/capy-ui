import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'CozyUI/Progress & Stats/BarChart',
  component: BarChart,
};

export default meta;
type Story = StoryObj<typeof BarChart>;

/** Values reverse-engineered from the bar heights in the Figma "Average Session Length" graph. */
const data = [
  { value: 21, label: '9:00am' },
  { value: 11 },
  { value: 6, label: '12:00pm' },
  { value: 45 },
  { value: 34, label: '9:00pm' },
];

export const Default: Story = {
  args: { title: 'Average Session Length', data, max: 90 },
};

import type { Meta, StoryObj } from '@storybook/react';
import { DailyStreaks } from './DailyStreaks';

const meta: Meta<typeof DailyStreaks> = {
  title: 'CozyUI/Progress & Stats/DailyStreaks',
  component: DailyStreaks,
};

export default meta;
type Story = StoryObj<typeof DailyStreaks>;

export const Default: Story = {
  args: {
    rows: [
      { label: 'Study', checked: [true, false, false, false, false] },
      { label: 'Poop', checked: [true, true, false, false, false] },
      { label: 'Meditate', checked: [true, false, true, false, false] },
      { label: 'Cook', checked: [false, false, false, false, false] },
    ],
  },
};

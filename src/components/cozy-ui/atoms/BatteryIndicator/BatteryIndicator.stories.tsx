import type { Meta, StoryObj } from '@storybook/react';
import { BatteryIndicator } from './BatteryIndicator';

const meta: Meta<typeof BatteryIndicator> = {
  title: 'CozyUI/Progress & Stats/BatteryIndicator',
  component: BatteryIndicator,
};

export default meta;
type Story = StoryObj<typeof BatteryIndicator>;

export const Default: Story = {
  args: { variant: 'default' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <BatteryIndicator variant="default" />
      <BatteryIndicator variant="variant2" />
      <BatteryIndicator variant="variant3" />
      <BatteryIndicator variant="variant4" />
    </div>
  ),
};

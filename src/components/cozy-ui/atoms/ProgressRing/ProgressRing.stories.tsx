import type { Meta, StoryObj } from '@storybook/react';
import { ProgressRing } from './ProgressRing';

const meta: Meta<typeof ProgressRing> = {
  title: 'CozyUI/Progress & Stats/ProgressRing',
  component: ProgressRing,
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
  args: { value: 50 },
};

export const Values: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <ProgressRing key={v} value={v} size={24} />
      ))}
    </div>
  ),
};

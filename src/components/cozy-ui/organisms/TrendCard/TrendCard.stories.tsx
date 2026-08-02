import type { Meta, StoryObj } from '@storybook/react';
import { TrendCard } from './TrendCard';
import { ProgressRing } from '../../atoms/ProgressRing';

const meta: Meta<typeof TrendCard> = {
  title: 'CozyUI/Progress & Stats/TrendCard',
  component: TrendCard,
};

export default meta;
type Story = StoryObj<typeof TrendCard>;

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 152px)', gap: 17 }}>
      <TrendCard title="Sessions" stats={[{ value: '2/4', unit: 'completed' }]} indicator={<ProgressRing value={50} />} />
      <TrendCard
        title="Focus Time"
        stats={[
          { value: '12', unit: 'hr' },
          { value: '40', unit: 'min' },
        ]}
      />
      <TrendCard title="Most Common Tag" stats={[{ value: '3', unit: 'study' }]} />
      <TrendCard
        title="Longest Session"
        stats={[
          { value: '1', unit: 'hr' },
          { value: '20', unit: 'min' },
        ]}
      />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { CapyMascot } from './CapyMascot';

const meta: Meta<typeof CapyMascot> = {
  title: 'CozyUI/Atoms/CapyMascot',
  component: CapyMascot,
};

export default meta;
type Story = StoryObj<typeof CapyMascot>;

export const BothVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <CapyMascot variant="rough" />
      <CapyMascot variant="default" />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { CapyMascot } from './CapyMascot';
import { CapyMascotHead } from './CapyMascotHead';
import { CapyMascotBody } from './CapyMascotBody';

const meta: Meta<typeof CapyMascot> = {
  title: 'CozyUI/Brand/CapyMascot',
  component: CapyMascot,
};

export default meta;
type Story = StoryObj<typeof CapyMascot>;

export const Default: Story = {
  args: { variant: 'default' },
};

export const BothVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <CapyMascot variant="rough" />
      <CapyMascot variant="default" />
    </div>
  ),
};

export const Head: Story = {
  render: () => <CapyMascotHead />,
};

export const Body: Story = {
  render: () => <CapyMascotBody />,
};

export const HeadAndBody: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <CapyMascotHead />
      <CapyMascotBody />
    </div>
  ),
};

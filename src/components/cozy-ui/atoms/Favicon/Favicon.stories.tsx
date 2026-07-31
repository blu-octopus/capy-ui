import type { Meta, StoryObj } from '@storybook/react';
import { Favicon } from './Favicon';

const meta: Meta<typeof Favicon> = {
  title: 'CozyUI/Atoms/Favicon',
  component: Favicon,
};

export default meta;
type Story = StoryObj<typeof Favicon>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <Favicon size={16} />
      <Favicon size={48} />
      <Favicon size={128} />
    </div>
  ),
};

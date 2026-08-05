import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'CozyUI/Controls/Toggle',
  component: Toggle,
  argTypes: {
    strokeFrequency: { control: { type: 'range', min: 0.01, max: 0.4, step: 0.005 } },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

export const OffOn: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Toggle />
      <Toggle defaultChecked />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'CozyUI/Atoms/Button',
  component: Button,
  args: { children: 'Button 1' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: { variant: 'filled', children: 'Button 1' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Btn 2' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Btn 3' },
};

export const Disabled: Story = {
  args: { variant: 'filled', children: 'Button 1', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button variant="filled">Button 1</Button>
      <Button variant="outlined">Btn 2</Button>
      <Button variant="ghost">Btn 3</Button>
    </div>
  ),
};

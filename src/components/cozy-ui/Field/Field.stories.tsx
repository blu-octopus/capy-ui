import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'CozyUI/Field',
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: { label: 'Field', placeholder: 'entered text' },
};

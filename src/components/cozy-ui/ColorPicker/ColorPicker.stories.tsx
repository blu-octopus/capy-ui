import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'CozyUI/ColorPicker',
  component: ColorPicker,
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: { defaultValue: 'green' },
};

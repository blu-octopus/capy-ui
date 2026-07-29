import type { Meta, StoryObj } from '@storybook/react';
import { Locked } from './Locked';

const meta: Meta<typeof Locked> = {
  title: 'CozyUI/Locked',
  component: Locked,
};

export default meta;
type Story = StoryObj<typeof Locked>;

export const Default: Story = {};

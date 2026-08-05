import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'CozyUI/Overlays/Modal',
  component: Modal,
  argTypes: {
    strokeFrequency: { control: { type: 'range', min: 0.01, max: 0.4, step: 0.005 } },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: { trigger: 'Open modal' },
};

export const OpenByDefault: Story = {
  args: { defaultOpen: true },
};

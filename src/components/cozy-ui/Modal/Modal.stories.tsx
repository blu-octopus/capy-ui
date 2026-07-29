import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'CozyUI/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: { trigger: 'Open modal' },
};

export const OpenByDefault: Story = {
  args: { defaultOpen: true },
};

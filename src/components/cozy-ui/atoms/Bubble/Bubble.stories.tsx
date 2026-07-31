import type { Meta, StoryObj } from '@storybook/react';
import { Bubble } from './Bubble';

const meta: Meta<typeof Bubble> = {
  title: 'CozyUI/Atoms/Bubble',
  component: Bubble,
};

export default meta;
type Story = StoryObj<typeof Bubble>;

export const Default: Story = {
  args: { children: 'just a pill, no tail' },
};

/** The Figma note says the bubble's width tracks the sentence length. */
export const WidthTracksContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <Bubble>hi</Bubble>
      <Bubble>time to take a break!</Bubble>
      <Bubble>you have been focused for twenty five whole minutes, nice work</Bubble>
    </div>
  ),
};

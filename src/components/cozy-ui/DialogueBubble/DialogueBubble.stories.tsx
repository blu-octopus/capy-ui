import type { Meta, StoryObj } from '@storybook/react';
import { DialogueBubble } from './DialogueBubble';

const meta: Meta<typeof DialogueBubble> = {
  title: 'CozyUI/DialogueBubble',
  component: DialogueBubble,
};

export default meta;
type Story = StoryObj<typeof DialogueBubble>;

export const Default: Story = {
  args: { children: 'time to take a break!' },
};

/** The Figma note says the bubble's width tracks the sentence length. */
export const WidthTracksContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <DialogueBubble>hi</DialogueBubble>
      <DialogueBubble>time to take a break!</DialogueBubble>
      <DialogueBubble>you have been focused for twenty five whole minutes, nice work</DialogueBubble>
    </div>
  ),
};

export const WithoutTail: Story = {
  args: { children: 'just a pill', showTail: false },
};

export const TailPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      {[20, 50, 73].map((offset) => (
        <DialogueBubble key={offset} tailOffset={offset}>
          tail at {offset}%
        </DialogueBubble>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { DialogueBubble, type DialogueBubblePlacement } from './DialogueBubble';

const meta: Meta<typeof DialogueBubble> = {
  title: 'CozyUI/Speech Bubbles/DialogueBubble',
  component: DialogueBubble,
  argTypes: {
    strokeFrequency: { control: { type: 'range', min: 0.01, max: 0.4, step: 0.005 } },
  },
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

/**
 * The tail's placement follows the same 9-point grid as CSS object-position —
 * each name picks which edge (and where along it) the tail points from.
 */
export const AllPlacements: Story = {
  render: () => {
    const placements: DialogueBubblePlacement[] = [
      'top-left',
      'top',
      'top-right',
      'left',
      'center',
      'right',
      'bottom-left',
      'bottom',
      'bottom-right',
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 140px)', gap: 48, padding: 24 }}>
        {placements.map((placement) => (
          <div key={placement} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <DialogueBubble placement={placement}>{placement}</DialogueBubble>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Like a tooltip arrow, the tail is clamped to the straight run of its edge —
 * it can never point into the bubble's curved corner, even on a bubble too
 * narrow to fit the requested alignment.
 */
export const TailClampsLikeATooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <DialogueBubble placement="bottom-left">tail asked for the left corner</DialogueBubble>
      <DialogueBubble placement="bottom-right">tail asked for the right corner</DialogueBubble>
      <DialogueBubble placement="bottom-left">hi</DialogueBubble>
    </div>
  ),
};

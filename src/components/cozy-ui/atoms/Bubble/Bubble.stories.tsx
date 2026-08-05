import type { Meta, StoryObj } from '@storybook/react';
import { Bubble } from './Bubble';

const meta: Meta<typeof Bubble> = {
  title: 'CozyUI/Speech Bubbles/Bubble',
  component: Bubble,
  argTypes: {
    strokeFrequency: { control: { type: 'range', min: 0.01, max: 0.4, step: 0.005 } },
  },
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

/** `paddingX`/`paddingY` override the default 28px/16px independently. */
export const CustomPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <Bubble>default padding (28x / 16y)</Bubble>
      <Bubble paddingX={12} paddingY={8}>
        tight padding (12x / 8y)
      </Bubble>
      <Bubble paddingX={48} paddingY={32}>
        roomy padding (48x / 32y)
      </Bubble>
    </div>
  ),
};

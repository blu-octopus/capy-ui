import type { Meta, StoryObj } from '@storybook/react';
import { Text, TEXT_VARIANTS, type TextVariant } from './Text';

const meta: Meta<typeof Text> = {
  title: 'CozyUI/Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

const sample: Record<TextVariant, string> = {
  mainTimerNumber: '25:00',
  secondaryTimerNumber: '00:45',
  h1: 'time to focus',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  body1: 'Body 1',
  caption: 'Caption',
  bodyNumberDisplay: '128',
};

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {(Object.keys(TEXT_VARIANTS) as TextVariant[]).map((variant) => (
        <Text key={variant} variant={variant}>
          {sample[variant]}
        </Text>
      ))}
    </div>
  ),
};

const dynamicStrokeVariants: TextVariant[] = ['mainTimerNumber', 'secondaryTimerNumber', 'h1'];

export const DynamicStroke: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {dynamicStrokeVariants.map((variant) => (
        <Text key={variant} variant={variant}>
          {sample[variant]}
        </Text>
      ))}
    </div>
  ),
};

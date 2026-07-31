import type { Meta, StoryObj } from '@storybook/react';
import { BackIcon, NextIcon, PauseIcon, PlayIcon, RestartIcon, ReturnIcon, SkipIcon, StatsIcon } from './index';

const meta: Meta = {
  title: 'CozyUI/Atoms/Icons',
};

export default meta;
type Story = StoryObj;

const icons = [
  { name: 'stats', Icon: StatsIcon },
  { name: 'return', Icon: ReturnIcon },
  { name: 'restart', Icon: RestartIcon },
  { name: 'play', Icon: PlayIcon },
  { name: 'pause', Icon: PauseIcon },
  { name: 'skip', Icon: SkipIcon },
  { name: 'back', Icon: BackIcon },
  { name: 'next', Icon: NextIcon },
];

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 32,
        alignItems: 'flex-end',
        color: 'var(--color-brand-brown)',
      }}
    >
      {icons.map(({ name, Icon }) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div style={{ height: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <Icon />
          </div>
          <span
            style={{
              display: 'block',
              marginTop: 8,
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'var(--color-brand-black)',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', color: 'var(--color-brand-brown)' }}>
      {[16, 24, 48, 96].map((size) => (
        <PlayIcon key={size} size={size} />
      ))}
    </div>
  ),
};

export const Tinted: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <PlayIcon size={48} style={{ color: 'var(--color-brand-brown)' }} />
      <PlayIcon size={48} style={{ color: 'var(--color-green-primary)' }} />
      <PlayIcon size={48} style={{ color: 'var(--color-red-primary)' }} />
      <PlayIcon size={48} style={{ color: 'var(--color-blue-primary)' }} />
    </div>
  ),
};

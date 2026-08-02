import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'CozyUI/Progress & Stats/BarChart',
  component: BarChart,
};

export default meta;
type Story = StoryObj<typeof BarChart>;

/** Values reverse-engineered from the bar heights in the Figma "Average Session Length" graph. */
const data = [
  { value: 21, label: '9:00am' },
  { value: 11 },
  { value: 6, label: '12:00pm' },
  { value: 45 },
  { value: 34, label: '9:00pm' },
];

export const Default: Story = {
  args: { title: 'Average Session Length', data, max: 90 },
};

/** No explicit `max` — the y-axis tops out at a "nice" round number above the data instead of an arbitrary fraction. */
export const NiceAxisTicks: Story = {
  args: { title: 'Average Session Length', data: [{ value: 47 }, { value: 12 }, { value: 63 }] },
};

/**
 * Hover a bar (or its full column, even above a short one) on desktop; tap
 * one on touch — tapping pins the tooltip open until you tap elsewhere.
 * `onBarClick` is where you'd wire up a drill-down, e.g. jumping to that
 * session's detail view.
 */
export const WithInteraction: Story = {
  render: () => {
    const [lastClicked, setLastClicked] = React.useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <BarChart
          title="Average Session Length"
          data={data}
          max={90}
          onBarClick={(datum, index) => setLastClicked(`${datum.label ?? `#${index + 1}`} — ${datum.value} min`)}
        />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-brand-grey)' }}>
          {lastClicked ? `Last clicked: ${lastClicked}` : 'Click or tap a bar…'}
        </span>
      </div>
    );
  },
};

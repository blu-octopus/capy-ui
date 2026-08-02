import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'CozyUI/Progress & Stats/PieChart',
  component: PieChart,
};

export default meta;
type Story = StoryObj<typeof PieChart>;

/**
 * Data and colors reverse-engineered from the Figma "Categories" pie chart
 * (percentages derived from the wedge sweep angles in the source vectors).
 *
 * Note: this categorical set is Figma's own secondary/pastel color tokens
 * (color/colors/*-secondary + brand/grey), not a palette chosen for this
 * chart. Running it through the dataviz skill's validator fails hard:
 * grey vs. red sit at ΔE 9.8, well under the 15 floor for normal vision, and
 * three of the five colors read as gray under a chroma-floor check. Swapping
 * in different hues would fix that but would no longer match the design
 * system as specified — flagging it rather than silently repainting the
 * brand palette. The legend's text labels and the per-wedge hover tooltip
 * keep identity from resting on color alone in the meantime.
 */
const data = [
  { label: 'donttouchphone', value: 40, color: 'var(--color-yellow-secondary)' },
  { label: 'study', value: 30, color: 'var(--color-green-secondary)' },
  { label: 'workout', value: 19, color: 'var(--color-blue-secondary)' },
  { label: 'cooking', value: 7, color: 'var(--color-red-secondary)' },
  { label: 'others', value: 4, color: 'var(--color-grey-primary)' },
];

export const Default: Story = {
  args: { title: 'Categories', data },
};

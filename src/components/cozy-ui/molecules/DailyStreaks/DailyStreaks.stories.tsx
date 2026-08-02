import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DailyStreaks, type DailyStreaksRow } from './DailyStreaks';

const meta: Meta<typeof DailyStreaks> = {
  title: 'CozyUI/Progress & Stats/DailyStreaks',
  component: DailyStreaks,
};

export default meta;
type Story = StoryObj<typeof DailyStreaks>;

export const Default: Story = {
  args: {
    rows: [
      { label: 'Study', checked: [true, false, false, false, false] },
      { label: 'Poop', checked: [true, true, false, false, false] },
      { label: 'Meditate', checked: [true, false, true, false, false] },
      { label: 'Cook', checked: [false, false, false, false, false] },
    ],
  },
};

export const WithInteraction: Story = {
  render: () => {
    const [rows, setRows] = useState<DailyStreaksRow[]>([
      { label: 'Study', checked: [true, false, false, false, false] },
      { label: 'Poop', checked: [true, true, false, false, false] },
      { label: 'Meditate', checked: [true, false, true, false, false] },
      { label: 'Cook', checked: [false, false, false, false, false] },
    ]);
    const handleToggle = (rowIndex: number, dayIndex: number, checked: boolean) => {
      setRows((prev) =>
        prev.map((row, i) =>
          i === rowIndex
            ? { ...row, checked: row.checked.map((c, j) => (j === dayIndex ? checked : c)) }
            : row,
        ),
      );
    };
    return <DailyStreaks rows={rows} onToggle={handleToggle} />;
  },
};

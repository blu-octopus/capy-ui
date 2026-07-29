import * as React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { Radio } from '@base-ui/react/radio';
import styles from './ColorPicker.module.css';

export const COLOR_PICKER_SWATCHES = [
  { value: 'green', color: 'var(--color-green-primary)' },
  { value: 'red', color: 'var(--color-red-primary)' },
  { value: 'yellow', color: 'var(--color-yellow-primary)' },
  { value: 'blue', color: 'var(--color-blue-primary)' },
  { value: 'grey', color: 'var(--color-grey-primary)' },
] as const;

export interface ColorPickerProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  { className, ...props },
  ref,
) {
  return (
    <RadioGroup ref={ref} className={[styles.list, className].filter(Boolean).join(' ')} {...props}>
      {COLOR_PICKER_SWATCHES.map(({ value, color }) => (
        <Radio.Root key={value} value={value} className={styles.swatch} style={{ background: color }} />
      ))}
    </RadioGroup>
  );
});

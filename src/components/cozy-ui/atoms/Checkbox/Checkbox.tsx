import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckIcon } from './CheckIcon';
import { Sparks } from '../../Sparks';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { className, ...props },
  ref,
) {
  return (
    <BaseCheckbox.Root ref={ref} className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
      <BaseCheckbox.Indicator className={styles.indicator} keepMounted={false}>
        <CheckIcon width="100%" height="100%" />
        <Sparks />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
});

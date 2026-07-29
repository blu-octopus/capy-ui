import * as React from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import styles from './Field.module.css';

export interface FieldProps extends React.ComponentPropsWithoutRef<typeof BaseField.Root> {
  label: string;
  placeholder?: string;
  inputProps?: React.ComponentPropsWithoutRef<typeof BaseField.Control>;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, placeholder, inputProps, className, ...props },
  ref,
) {
  return (
    <BaseField.Root ref={ref} className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
      <BaseField.Label className={styles.label}>{label}</BaseField.Label>
      <BaseField.Control className={styles.control} placeholder={placeholder} {...inputProps} />
    </BaseField.Root>
  );
});

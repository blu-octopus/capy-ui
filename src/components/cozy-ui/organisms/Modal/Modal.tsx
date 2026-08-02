import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Button } from '../../atoms/Button';
import { Field } from '../../molecules/Field';
import { ColorPicker } from '../../molecules/ColorPicker';
import { useHandDrawnFilter } from '../../HandDrawnFilterDefs';
import styles from './Modal.module.css';

export interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Dialog.Root>, 'children'> {
  trigger?: React.ReactNode;
  title?: string;
  onDone?: () => void;
  children?: React.ReactNode;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { trigger, title = 'Modal', onDone, children, ...props },
  ref,
) {
  const { filterId, filter } = useHandDrawnFilter({ scale: 1.8, seed: 5 });
  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger render={<Button variant="outlined" />}>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        {filter}
        <Dialog.Popup
          ref={ref}
          className={styles.popup}
          style={{ '--wobble-filter': `url(#${filterId})` } as React.CSSProperties}
        >
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          {children ?? (
            <>
              <div className={styles.section}>
                <span className={styles.sectionLabel}>Color</span>
                <ColorPicker defaultValue="green" />
              </div>
              <Field label="Field" placeholder="entered text" />
            </>
          )}
          <div className={styles.actions}>
            <Dialog.Close render={<Button variant="ghost" />}>Cancel</Dialog.Close>
            <Dialog.Close render={<Button variant="outlined" />} onClick={onDone}>
              Done
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

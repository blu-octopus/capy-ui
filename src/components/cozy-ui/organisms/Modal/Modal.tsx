import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Button } from '../../atoms/Button';
import { Field } from '../../molecules/Field';
import { ColorPicker } from '../../molecules/ColorPicker';
import { WobbleBorder } from '../../WobbleBorder';
import { useElementSize } from '../../useElementSize';
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
  const [setRef, size] = useElementSize<HTMLDivElement>(ref);
  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger render={<Button variant="outlined" />}>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup ref={setRef} className={styles.popup}>
          <WobbleBorder width={size.width} height={size.height} radius={20} seed={5} />
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

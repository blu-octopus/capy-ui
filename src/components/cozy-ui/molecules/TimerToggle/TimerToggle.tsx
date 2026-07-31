import * as React from 'react';
import { Tabs } from '@base-ui/react/tabs';
import styles from './TimerToggle.module.css';

export interface TimerToggleProps extends React.ComponentPropsWithoutRef<typeof Tabs.Root> {}

export const TimerToggle = React.forwardRef<HTMLDivElement, TimerToggleProps>(function TimerToggle(
  { className, defaultValue = 'up', ...props },
  ref,
) {
  return (
    <Tabs.Root ref={ref} defaultValue={defaultValue} className={className} {...props}>
      <Tabs.List className={styles.list}>
        <Tabs.Indicator className={styles.indicator} />
        <Tabs.Tab value="up" className={styles.tab}>
          Count Up
        </Tabs.Tab>
        <Tabs.Tab value="down" className={styles.tab}>
          Count Down
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.Root>
  );
});

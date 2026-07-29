import * as React from 'react';
import { Tabs } from '@base-ui/react/tabs';
import styles from './TimeTabs.module.css';

export interface TimeTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs.Root> {
  tabs: string[];
}

export const TimeTabs = React.forwardRef<HTMLDivElement, TimeTabsProps>(function TimeTabs(
  { tabs, className, ...props },
  ref,
) {
  return (
    <Tabs.Root ref={ref} className={className} {...props}>
      <Tabs.List className={styles.list}>
        <Tabs.Indicator className={styles.indicator} />
        {tabs.map((tab) => (
          <Tabs.Tab key={tab} value={tab} className={styles.tab}>
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
});

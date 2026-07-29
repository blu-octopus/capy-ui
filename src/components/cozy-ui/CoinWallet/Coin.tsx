import * as React from 'react';
import { CoinRingIcon } from './CoinRingIcon';
import { CoinFillIcon } from './CoinFillIcon';
import styles from './Coin.module.css';

export interface CoinProps extends React.ComponentPropsWithoutRef<'span'> {}

export const Coin = React.forwardRef<HTMLSpanElement, CoinProps>(function Coin({ className, ...props }, ref) {
  return (
    <span ref={ref} className={[styles.coin, className].filter(Boolean).join(' ')} {...props}>
      <CoinRingIcon className={styles.ring} />
      <CoinFillIcon className={styles.fill} />
      <span className={styles.sign}>$</span>
    </span>
  );
});

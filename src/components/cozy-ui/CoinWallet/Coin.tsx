import * as React from 'react';
import { CoinIcon } from './CoinIcon';
import styles from './Coin.module.css';

export interface CoinProps extends React.ComponentPropsWithoutRef<'span'> {
  size?: number;
}

export const Coin = React.forwardRef<HTMLSpanElement, CoinProps>(function Coin(
  { size = 36, className, ...props },
  ref,
) {
  return (
    <span ref={ref} className={[styles.coin, className].filter(Boolean).join(' ')} {...props}>
      <CoinIcon width={size} height={size} />
    </span>
  );
});

import * as React from 'react';
import { CoinRingIcon } from './CoinRingIcon';
import { CoinFillIcon } from './CoinFillIcon';
import styles from './CoinWallet.module.css';

export interface CoinWalletProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Coin amount to display. The pill's width tracks its digit count. */
  amount: number | string;
}

export const CoinWallet = React.forwardRef<HTMLDivElement, CoinWalletProps>(function CoinWallet(
  { amount, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={[styles.wallet, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.coin} aria-hidden>
        <CoinRingIcon className={styles.ring} />
        <CoinFillIcon className={styles.fill} />
        <span className={styles.sign}>$</span>
      </div>
      <span className={styles.pill}>{amount}</span>
    </div>
  );
});

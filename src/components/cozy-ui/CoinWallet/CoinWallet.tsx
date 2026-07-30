import * as React from 'react';
import { CoinIcon } from './CoinIcon';
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
      <CoinIcon className={styles.coin} width={24} height={24} aria-hidden />
      <span className={styles.pill}>{amount}</span>
    </div>
  );
});

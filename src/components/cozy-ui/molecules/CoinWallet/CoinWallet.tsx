import * as React from 'react';
import { Coin } from './Coin';
import styles from './CoinWallet.module.css';

export interface CoinWalletProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Coin amount to display. The pill's width tracks its digit count. Numbers
   * are formatted with thousands separators (78160 -> "78,160"); pass a
   * string instead to bypass that, e.g. for a "00" placeholder.
   */
  amount: number | string;
}

export const CoinWallet = React.forwardRef<HTMLDivElement, CoinWalletProps>(function CoinWallet(
  { amount, className, ...props },
  ref,
) {
  const display = typeof amount === 'number' ? amount.toLocaleString('en-US') : amount;
  return (
    <div ref={ref} className={[styles.wallet, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.coin} aria-hidden>
        <Coin size={24} />
      </span>
      <span className={styles.pill}>{display}</span>
    </div>
  );
});

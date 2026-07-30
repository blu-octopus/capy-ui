import * as React from 'react';
import { Coin } from '../CoinWallet';
import styles from './InAppPurchaseCard.module.css';

export interface InAppPurchaseCardProps extends React.ComponentPropsWithoutRef<'div'> {
  coins: number;
  price: string;
  /** How many coin icons to stack — a purely visual choice in the Figma reference, not tied to the coin amount. */
  coinCount?: 1 | 2 | 3;
  /** Adds the brown border and "Value!" ribbon used on the best-value tier. */
  featured?: boolean;
}

export const InAppPurchaseCard = React.forwardRef<HTMLDivElement, InAppPurchaseCardProps>(
  function InAppPurchaseCard({ coins, price, coinCount = 1, featured = false, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={[styles.card, featured && styles.featured, className].filter(Boolean).join(' ')}
        {...props}
      >
        {featured && <span className={styles.ribbon}>Value!</span>}
        <div className={styles.coins}>
          {Array.from({ length: coinCount }, (_, i) => (
            <Coin key={i} />
          ))}
        </div>
        <span className={styles.amount}>{coins.toLocaleString()}</span>
        <span className={styles.price}>{price}</span>
      </div>
    );
  },
);

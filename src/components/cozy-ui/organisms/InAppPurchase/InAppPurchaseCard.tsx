import * as React from 'react';
import { Coin } from '../../molecules/CoinWallet';
import { RibbonIcon } from './RibbonIcon';
import styles from './InAppPurchaseCard.module.css';

export interface InAppPurchaseCardProps extends React.ComponentPropsWithoutRef<'div'> {
  coins: number;
  price: string;
  /** How many coin icons to show — only applies to the plain (non-featured) layout. */
  coinCount?: 1 | 2;
  /**
   * Switches to the best-value hero layout: a fixed bordered card with the
   * "Value!" ribbon clipped at the corner and 3 coins in Figma's exact
   * triangular arrangement (not a generic N-coin stack).
   */
  featured?: boolean;
}

// Each coin's top-left, relative to the featured card's top-left — lifted
// directly from Figma node 357:494 rather than computed from a formula.
const FEATURED_COIN_POSITIONS = [
  { left: 15.95, top: 32.25 }, // bottom-left
  { left: 36.56, top: 33.25 }, // bottom-right
  { left: 26.8, top: 15.0 }, // top-center, drawn last so it's on top
];

export const InAppPurchaseCard = React.forwardRef<HTMLDivElement, InAppPurchaseCardProps>(
  function InAppPurchaseCard({ coins, price, coinCount = 1, featured = false, className, ...props }, ref) {
    if (featured) {
      return (
        <div ref={ref} className={[styles.card, styles.featured, className].filter(Boolean).join(' ')} {...props}>
          <div className={styles.ribbon}>
            <RibbonIcon />
          </div>
          <span className={styles.ribbonText}>Value!</span>
          <div className={styles.featuredCoins}>
            {FEATURED_COIN_POSITIONS.map((pos, i) => (
              <span key={i} className={styles.featuredCoin} style={{ left: pos.left, top: pos.top }}>
                <Coin size={37.5} />
              </span>
            ))}
          </div>
          <span className={styles.featuredAmount}>{coins.toLocaleString()}</span>
          <span className={styles.featuredPrice}>{price}</span>
        </div>
      );
    }

    return (
      <div ref={ref} className={[styles.card, styles.plain, className].filter(Boolean).join(' ')} {...props}>
        <div className={styles.coins} data-count={coinCount}>
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

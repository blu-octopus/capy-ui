import * as React from 'react';
import { CoinRingIcon } from './CoinRingIcon';
import { CoinInnerIcon } from './CoinInnerIcon';
import { CoinSymbolIcon } from './CoinSymbolIcon';
import styles from './Coin.module.css';

export interface CoinProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Rendered size of the coin's nominal 36px diameter (each layer's own export bleed scales with it). */
  size?: number;
}

const NOMINAL_SIZE = 36;
// Each layer's own natural export size at the coin's nominal 36px scale.
const RING = { w: 39, h: 39 };
const INNER = { w: 30, h: 30 };
const SYMBOL = { w: 11, h: 19 };

export const Coin = React.forwardRef<HTMLSpanElement, CoinProps>(function Coin(
  { size = NOMINAL_SIZE, className, style, ...props },
  ref,
) {
  const k = size / NOMINAL_SIZE;
  return (
    <span
      ref={ref}
      className={[styles.coin, className].filter(Boolean).join(' ')}
      style={{ '--size': `${size}px`, ...style } as React.CSSProperties}
      {...props}
    >
      <CoinRingIcon className={styles.layer} width={RING.w * k} height={RING.h * k} />
      <CoinInnerIcon className={styles.layer} width={INNER.w * k} height={INNER.h * k} />
      <CoinSymbolIcon className={styles.layer} width={SYMBOL.w * k} height={SYMBOL.h * k} />
    </span>
  );
});

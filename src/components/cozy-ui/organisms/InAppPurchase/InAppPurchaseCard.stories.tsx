import type { Meta, StoryObj } from '@storybook/react';
import { InAppPurchaseCard } from './InAppPurchaseCard';

const meta: Meta<typeof InAppPurchaseCard> = {
  title: 'CozyUI/Coins & Purchases/InAppPurchaseCard',
  component: InAppPurchaseCard,
};

export default meta;
type Story = StoryObj<typeof InAppPurchaseCard>;

/** Entry tier: one coin, no card chrome — just the floating coin and its labels. */
export const Single: Story = {
  args: { coins: 1000, price: '$0.99', coinCount: 1 },
};

/** Mid tier: two coins overlapping by exactly half a coin width, still no card chrome. */
export const Bundle: Story = {
  args: { coins: 2000, price: '$1.99', coinCount: 2 },
};

/**
 * Best-value tier: the only variant with card chrome — a bordered box with the
 * "Value!" ribbon clipped at the corner and 3 coins in Figma's exact
 * triangular arrangement.
 */
export const Featured: Story = {
  args: { coins: 10000, price: '$4.99', featured: true },
};

/** All three side by side, as they appear in the store screen. */
export const AllTiers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <InAppPurchaseCard coins={1000} price="$0.99" coinCount={1} />
      <InAppPurchaseCard coins={10000} price="$4.99" featured />
      <InAppPurchaseCard coins={2000} price="$1.99" coinCount={2} />
    </div>
  ),
};

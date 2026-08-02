import type { Meta, StoryObj } from '@storybook/react';
import { Coin } from './Coin';

const meta: Meta<typeof Coin> = {
  title: 'CozyUI/Coins & Purchases/Coin',
  component: Coin,
};

export default meta;
type Story = StoryObj<typeof Coin>;

/** The base currency token. `CoinWallet` and `InAppPurchaseCard` both compose it. */
export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      <Coin size={16} />
      <Coin size={24} />
      <Coin size={36} />
      <Coin size={64} />
    </div>
  ),
};

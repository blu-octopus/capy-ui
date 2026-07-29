import type { Meta, StoryObj } from '@storybook/react';
import { CoinWallet } from './CoinWallet';
import { Coin } from './Coin';

const meta: Meta<typeof CoinWallet> = {
  title: 'CozyUI/CoinWallet',
  component: CoinWallet,
};

export default meta;
type Story = StoryObj<typeof CoinWallet>;

export const Default: Story = {
  args: { amount: 0 },
};

/** Figma note: "Rectangle gets longer as there's more digits". */
export const GrowsWithDigitCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <CoinWallet amount={0} />
      <CoinWallet amount={920} />
      <CoinWallet amount={3230} />
      <CoinWallet amount={78160} />
    </div>
  ),
};

export const StandaloneCoin: Story = {
  render: () => <Coin />,
};

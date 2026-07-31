import type { Meta, StoryObj } from '@storybook/react';
import { InAppPurchaseCard } from './InAppPurchaseCard';

const meta: Meta<typeof InAppPurchaseCard> = {
  title: 'CozyUI/Organisms/InAppPurchaseCard',
  component: InAppPurchaseCard,
};

export default meta;
type Story = StoryObj<typeof InAppPurchaseCard>;

export const Tiers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <InAppPurchaseCard coins={1000} price="$0.99" coinCount={1} />
      <InAppPurchaseCard coins={10000} price="$4.99" featured />
      <InAppPurchaseCard coins={2000} price="$1.99" coinCount={2} />
    </div>
  ),
};

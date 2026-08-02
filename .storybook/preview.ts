import type { Preview } from '@storybook/react';
import * as React from 'react';
import '../src/components/cozy-ui/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'cozy',
      values: [{ name: 'cozy', value: '#FFFFFF' }],
    },
    options: {
      /*
       * Grouped by what you reach for, not by atomic-design tier: the
       * everyday set first, then the feature-specific clusters, with
       * components that compose each other filed together (DialogueBubble
       * next to Bubble; CoinWallet and InAppPurchaseCard next to Coin).
       * Anything not listed sorts alphabetically after these.
       */
      storySort: {
        order: [
          'CozyUI',
          [
            'Overview',
            'Foundations',
            'Controls',
            'Speech Bubbles',
            'Timer',
            'Coins & Purchases',
            'Progress & Stats',
            'Overlays',
            'Brand',
          ],
        ],
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        { style: { background: '#FFFFFF', minHeight: '100vh', padding: 24, boxSizing: 'border-box' } },
        React.createElement(Story),
      ),
  ],
};

export default preview;

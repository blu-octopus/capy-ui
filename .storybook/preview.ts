import type { Preview } from '@storybook/react';
import * as React from 'react';
import '../src/components/cozy-ui/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'cozy',
      values: [{ name: 'cozy', value: '#FFFFFF' }],
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

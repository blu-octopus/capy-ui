import type { Preview } from '@storybook/react';
import '../src/components/cozy-ui/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'cozy',
      values: [{ name: 'cozy', value: '#FFFFFF' }],
    },
  },
};

export default preview;

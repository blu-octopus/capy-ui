import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // Full TS-aware prop extraction (types, `@default` JSDoc, unions) for
    // every component's autodocs table — the react-vite framework's default
    // docgen (plain react-docgen) can't resolve generics or extended
    // interfaces like `React.ComponentPropsWithoutRef<typeof Switch.Root>`
    // anywhere near as completely.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;

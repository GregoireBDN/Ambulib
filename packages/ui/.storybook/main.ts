import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    // Organize stories by category for better performance
    '../src/docs/**/*.stories.@(js|jsx|ts|tsx)',        // Design system docs first
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)', // Component stories
    '../src/examples/**/*.stories.@(js|jsx|ts|tsx)',   // Examples last
  ],
  staticDirs: ['./public'],
  addons: [
    '@storybook/addon-essentials', // Inclut addon-docs et support MDX
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      // Performance optimizations
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  
  // Performance optimizations
  features: {
    modernInlineRender: true, // Faster rendering
    storyStoreV7: true,      // Improved story loading
  },
  async viteFinal(config) {
    // Dynamic import for @tailwindcss/vite to avoid module resolution issues
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    
    return {
      ...config,
      // Add Tailwind CSS v4 plugin
      plugins: [
        ...(config.plugins || []),
        tailwindcss(),
      ],
      // Ensure MDX files are properly handled
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
        },
      },
      // Configure React
      esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'react',
      },
      // Optimize dependencies for Storybook performance
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          '@storybook/addon-a11y',
          '@storybook/addon-docs',
          '@storybook/addon-viewport',
          'react',
          'react-dom',
          'react/jsx-runtime',
          '@radix-ui/react-slot',
          'class-variance-authority',
          'clsx',
          'tailwind-merge',
        ],
        // Exclude heavy dependencies from pre-bundling
        exclude: [
          '@storybook/addon-essentials/dist/docs/preset',
        ],
      },
      // Server configuration
      server: {
        ...config.server,
        fs: {
          strict: false,
        },
      },
      // Define React globally
      define: {
        ...config.define,
        global: 'globalThis',
        // Performance optimizations
        __DEV__: 'true',
      },
      
      // Build optimizations
      build: {
        ...config.build,
        rollupOptions: {
          ...config.build?.rollupOptions,
          output: {
            // Code splitting by component type
            manualChunks: {
              'ui-components': [
                './src/components/ui/button.tsx',
                './src/components/ui/card.tsx',
                './src/components/ui/input.tsx',
                './src/components/ui/label.tsx',
                './src/components/ui/havrid-logo.tsx',
              ],
              'design-system': [
                './src/docs/Introduction.stories.tsx',
                './src/docs/Colors.stories.tsx',
                './src/docs/Typography.stories.tsx',
                './src/docs/Accessibility.stories.tsx',
                './src/docs/Patterns.stories.tsx',
              ],
            },
          },
        },
      },
    };
  },
  
  // Core configuration for performance
  core: {
    disableTelemetry: true, // Disable telemetry for faster startup
  },
};

export default config;
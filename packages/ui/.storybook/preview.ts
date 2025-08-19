import type { Preview } from '@storybook/react';
import * as React from 'react';
import '../src/styles/styles.css';

// Ensure React is available globally for stories
(window as any).React = React;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Disable region rule as it often causes false negatives in component stories
            id: 'region',
            enabled: false,
          }
        ]
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'light-gray', 
          value: '#f8fafc',
        },
        {
          name: 'dark',
          value: '#1f2937',
        },
      ],
    },
  },
};

export default preview;
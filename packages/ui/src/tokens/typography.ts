/**
 * Typography tokens optimized for accessibility and readability
 * Following WCAG guidelines for seniors and people with disabilities
 */

export const typography = {
  // Font families - system fonts for better performance and accessibility
  fontFamily: {
    sans: [
      'ui-sans-serif',
      'system-ui', 
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ],
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace'
    ]
  },

  // Font sizes - larger minimum sizes for better readability
  fontSize: {
    xs: ['0.875rem', { lineHeight: '1.5' }], // 14px - minimum for UI elements
    sm: ['1rem', { lineHeight: '1.5' }], // 16px - minimum for body text
    base: ['1.125rem', { lineHeight: '1.6' }], // 18px - recommended for seniors
    lg: ['1.25rem', { lineHeight: '1.6' }], // 20px - large text
    xl: ['1.5rem', { lineHeight: '1.5' }], // 24px
    '2xl': ['1.875rem', { lineHeight: '1.4' }], // 30px
    '3xl': ['2.25rem', { lineHeight: '1.3' }], // 36px - headings
    '4xl': ['3rem', { lineHeight: '1.2' }], // 48px
    '5xl': ['4rem', { lineHeight: '1.1' }], // 64px
  },

  // Font weights - limited set for consistency
  fontWeight: {
    normal: '400',
    medium: '500', // For emphasis without bold
    semibold: '600', // For strong emphasis
    bold: '700' // For headings and critical information
  },

  // Line heights - optimized for readability
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5', // Minimum for body text
    relaxed: '1.6', // Recommended for seniors
    loose: '1.8' // For users with reading difficulties
  },

  // Letter spacing - for improved readability
  letterSpacing: {
    tighter: '-0.025em',
    tight: '-0.0125em',
    normal: '0em',
    wide: '0.025em', // Slight increase for better readability
    wider: '0.05em',
    widest: '0.1em'
  },

  // Text sizes with semantic meanings
  textSizes: {
    // Critical text (emergency information)
    critical: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.6',
      fontWeight: '600',
      letterSpacing: '0.025em'
    },

    // Primary headings
    h1: {
      fontSize: '2.25rem', // 36px
      lineHeight: '1.3',
      fontWeight: '700',
      letterSpacing: '-0.0125em'
    },

    h2: {
      fontSize: '1.875rem', // 30px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '-0.0125em'
    },

    h3: {
      fontSize: '1.5rem', // 24px
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0em'
    },

    // Body text
    body: {
      fontSize: '1.125rem', // 18px - optimal for seniors
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0.025em'
    },

    // Large body text for better readability
    bodyLarge: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0.025em'
    },

    // Small text (minimum readable size)
    small: {
      fontSize: '1rem', // 16px - never go below this
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0.025em'
    },

    // Button text
    button: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.5',
      fontWeight: '500',
      letterSpacing: '0.025em'
    },

    // Large button text (primary actions)
    buttonLarge: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0.025em'
    },

    // Labels and captions
    label: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
      fontWeight: '500',
      letterSpacing: '0.025em'
    }
  }
} as const;

// Responsive typography scales
export const responsiveTypography = {
  // Mobile-first approach with larger base sizes
  mobile: {
    h1: '1.875rem', // 30px on mobile
    h2: '1.5rem', // 24px
    h3: '1.25rem', // 20px
    body: '1.125rem', // 18px
    small: '1rem' // 16px minimum
  },
  
  // Tablet and up
  tablet: {
    h1: '2.25rem', // 36px
    h2: '1.875rem', // 30px
    h3: '1.5rem', // 24px
    body: '1.125rem', // 18px
    small: '1rem' // 16px
  },
  
  // Desktop and up - can be slightly larger for better readability
  desktop: {
    h1: '3rem', // 48px
    h2: '2.25rem', // 36px
    h3: '1.875rem', // 30px
    body: '1.25rem', // 20px - larger for desktop reading
    small: '1.125rem' // 18px
  }
} as const;

export type TypographySize = keyof typeof typography.textSizes;
export type ResponsiveBreakpoint = keyof typeof responsiveTypography;
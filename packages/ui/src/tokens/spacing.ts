/**
 * Spacing tokens optimized for accessibility
 * Touch targets and interactive elements follow WCAG guidelines
 */

export const spacing = {
  // Base spacing scale (0.25rem = 4px)
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
  40: '10rem', // 160px
  48: '12rem', // 192px
  56: '14rem', // 224px
  64: '16rem', // 256px

  // Accessibility-focused touch targets
  touch: {
    // Minimum touch target size (44px x 44px per WCAG)
    minimum: '2.75rem', // 44px
    // Recommended touch target (48px x 48px)
    recommended: '3rem', // 48px
    // Large touch target for primary actions
    large: '3.5rem', // 56px
    // Extra large for critical/emergency actions
    extraLarge: '4rem', // 64px
  },

  // Interactive element spacing
  interactive: {
    // Minimum spacing between interactive elements
    between: '0.5rem', // 8px
    // Recommended spacing between buttons
    buttonGap: '0.75rem', // 12px
    // Large gap for primary action separation
    primaryGap: '1rem', // 16px
    // Extra large gap for critical action isolation
    criticalGap: '1.5rem', // 24px
  },

  // Content spacing
  content: {
    // Minimum line spacing for readability
    lineGap: '0.5rem', // 8px
    // Paragraph spacing
    paragraph: '1rem', // 16px
    // Section spacing
    section: '1.5rem', // 24px
    // Large section spacing
    sectionLarge: '2rem', // 32px
    // Page section spacing
    pageSection: '3rem', // 48px
  },

  // Form element spacing
  form: {
    // Spacing between form elements
    elementGap: '1rem', // 16px
    // Spacing between label and input
    labelGap: '0.5rem', // 8px
    // Spacing around form groups
    groupGap: '1.5rem', // 24px
    // Error message spacing
    errorGap: '0.5rem', // 8px
  },

  // Layout spacing
  layout: {
    // Container padding
    containerPadding: '1rem', // 16px mobile
    containerPaddingLg: '1.5rem', // 24px tablet+
    containerPaddingXl: '2rem', // 32px desktop
    
    // Grid gaps
    gridGap: '1rem', // 16px
    gridGapLarge: '1.5rem', // 24px
    
    // Card spacing
    cardPadding: '1.5rem', // 24px
    cardGap: '1rem', // 16px between cards
  }
} as const;

// Responsive spacing for different breakpoints
export const responsiveSpacing = {
  mobile: {
    touch: '2.75rem', // 44px - WCAG minimum
    padding: '1rem', // 16px
    gap: '0.75rem', // 12px
  },
  tablet: {
    touch: '3rem', // 48px - recommended
    padding: '1.5rem', // 24px
    gap: '1rem', // 16px
  },
  desktop: {
    touch: '3rem', // 48px - can be same as tablet
    padding: '2rem', // 32px
    gap: '1.25rem', // 20px
  }
} as const;

// Special spacing for accessibility features
export const a11ySpacing = {
  // Focus ring offset
  focusOffset: '0.125rem', // 2px
  // Focus ring width  
  focusWidth: '0.125rem', // 2px
  // Skip link positioning
  skipLink: '1rem', // 16px from edge
  // Screen reader only element positioning
  srOnly: '-9999px',
  // High contrast mode adjustments
  highContrast: {
    borderWidth: '0.125rem', // 2px
    outlineWidth: '0.1875rem', // 3px
  }
} as const;

export type SpacingToken = keyof typeof spacing;
export type TouchTarget = keyof typeof spacing.touch;
export type ResponsiveBreakpoint = keyof typeof responsiveSpacing;
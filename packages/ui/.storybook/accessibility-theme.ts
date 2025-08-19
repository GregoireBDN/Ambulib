import { create } from '@storybook/theming/create';
import { accessibleColors } from '../src/tokens/colors';

export default create({
  base: 'light',
  
  // Brand colors using our accessible palette
  brandTitle: 'HavRid Design System',
  brandUrl: 'https://havrid.com',
  brandTarget: '_self',
  
  // UI colors - high contrast for better accessibility
  colorPrimary: accessibleColors.primary[700], // High contrast blue
  colorSecondary: accessibleColors.primary[600],
  
  // UI
  appBg: accessibleColors.semantic.background,
  appContentBg: accessibleColors.semantic.backgroundAlt,
  appPreviewBg: accessibleColors.semantic.background,
  appBorderColor: accessibleColors.semantic.border,
  appBorderRadius: 8,
  
  // Text colors - high contrast
  textColor: accessibleColors.semantic.foreground,
  textInverseColor: accessibleColors.semantic.background,
  textMutedColor: accessibleColors.semantic.foregroundMuted,
  
  // Toolbar
  barTextColor: accessibleColors.semantic.foreground,
  barHoverColor: accessibleColors.primary[700],
  barSelectedColor: accessibleColors.primary[600],
  barBg: accessibleColors.semantic.backgroundAlt,
  
  // Forms
  inputBg: accessibleColors.semantic.background,
  inputBorder: accessibleColors.semantic.borderStrong,
  inputTextColor: accessibleColors.semantic.foreground,
  inputBorderRadius: 6,
  
  // Buttons
  buttonBg: accessibleColors.primary[700],
  buttonBorder: accessibleColors.primary[700],
  booleanBg: accessibleColors.semantic.backgroundAlt,
  booleanSelectedBg: accessibleColors.primary[700],
  
  // Typography - larger sizes for better readability
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
});
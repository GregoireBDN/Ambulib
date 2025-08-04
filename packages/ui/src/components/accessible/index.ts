/**
 * Composants UI Accessibles pour Ambulib
 * Spécialement optimisés pour les personnes âgées et handicapées
 * Conformes aux standards WCAG 2.1 Level AA
 */

export { LargeButton, type LargeButtonProps } from './LargeButton';
export { AccessibleInput, type AccessibleInputProps } from './AccessibleInput';
export { EmergencyButton, type EmergencyButtonProps } from './EmergencyButton';
export { SeniorCard, type SeniorCardProps } from './SeniorCard';
export { default as AccessibleChart } from './AccessibleChart';

// Note: Button, Input, Card sont disponibles via les composants shadcn/ui
// Utilisez LargeButton, AccessibleInput, SeniorCard pour les variantes accessibles
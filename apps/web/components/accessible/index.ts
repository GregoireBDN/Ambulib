/**
 * Composants UI Accessibles pour Ambulib
 * Spécialement optimisés pour les personnes âgées et handicapées
 * Conformes aux standards WCAG 2.1 Level AA
 */

export { LargeButton, type LargeButtonProps } from './LargeButton';
export { AccessibleInput, type AccessibleInputProps } from './AccessibleInput';
export { EmergencyButton, type EmergencyButtonProps } from './EmergencyButton';
export { SeniorCard, type SeniorCardProps } from './SeniorCard';
export { ClientIcon } from './ClientIcon';
export { default as AccessibleChart } from './AccessibleChart';

// Exports pour rétrocompatibilité et facilité d'utilisation
export { LargeButton as Button } from './LargeButton';
export { AccessibleInput as Input } from './AccessibleInput';
export { SeniorCard as Card } from './SeniorCard';
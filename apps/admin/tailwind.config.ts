/**
 * Configuration Tailwind CSS pour l'Application Admin HavRid
 * 
 * Cette configuration utilise le preset partagé du package UI pour garantir
 * la cohérence du design system et l'accessibilité WCAG 2.1 Level AA.
 * 
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  // Utilisation du preset partagé qui contient toute la configuration commune
  presets: [require("@repo/ui/tailwind.config.preset.js")],
  
  // Configurations spécifiques à l'app admin (si nécessaires)
  theme: {
    extend: {
      // Personnalisations spécifiques à l'interface admin
      colors: {
        'admin-danger': 'hsl(0, 70%, 50%)',          // Rouge pour actions dangereuses
        'admin-warning': 'hsl(38, 92%, 50%)',        // Orange pour avertissements
        'admin-success': 'hsl(84, 81%, 44%)',        // Vert pour succès
        'admin-info': 'hsl(199, 89%, 48%)',          // Bleu pour informations
      },
      // Espacements spéciaux pour les tableaux admin
      spacing: {
        'admin-table': '0.75rem',
        'admin-form': '1.25rem',
      },
    },
  },
  
  // Plugins spécifiques à l'app admin (si nécessaires)
  plugins: [],
};
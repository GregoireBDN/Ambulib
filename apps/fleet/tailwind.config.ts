/**
 * Configuration Tailwind CSS pour l'Application Fleet Manager HavRid
 * 
 * Cette configuration utilise le preset partagé du package UI pour garantir
 * la cohérence du design system et l'accessibilité WCAG 2.1 Level AA.
 * 
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  // Utilisation du preset partagé qui contient toute la configuration commune
  presets: [require("@repo/ui/tailwind.config.preset.js")],
  
  // Configurations spécifiques à l'app fleet (si nécessaires)
  theme: {
    extend: {
      // Personnalisations spécifiques à la gestion de flotte
      // Par exemple: couleurs spéciales pour les statuts d'ambulances
      colors: {
        'fleet-available': 'hsl(120, 60%, 50%)',     // Vert pour disponible
        'fleet-busy': 'hsl(45, 100%, 50%)',          // Jaune pour occupé
        'fleet-emergency': 'hsl(0, 84%, 60%)',       // Rouge pour urgence
        'fleet-maintenance': 'hsl(210, 50%, 50%)',   // Bleu pour maintenance
      },
    },
  },
  
  // Plugins spécifiques à l'app fleet (si nécessaires)
  plugins: [],
};
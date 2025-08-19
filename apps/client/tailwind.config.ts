/**
 * Configuration Tailwind CSS pour l'Application Client HavRid
 * 
 * Cette configuration utilise le preset partagé du package UI pour garantir
 * la cohérence du design system et l'accessibilité WCAG 2.1 Level AA.
 * 
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  // Utilisation du preset partagé qui contient toute la configuration commune
  presets: [require("@repo/ui/tailwind.config.preset.js")],
  
  // Configurations spécifiques à l'app client (si nécessaires)
  theme: {
    extend: {
      // Personnalisations spécifiques à l'app client uniquement
      // (vide pour l'instant, tout est dans le preset partagé)
    },
  },
  
  // Plugins spécifiques à l'app client (si nécessaires)
  plugins: [],
};
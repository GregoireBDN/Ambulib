import type { Config } from "tailwindcss";

/**
 * Configuration Tailwind CSS simplifiée pour HavRid Medical UI
 * 
 * Cette configuration minimaliste s'appuie entièrement sur le fichier theme.css
 * qui contient toutes les définitions de couleurs OKLCH et variables CSS.
 * 
 * Approche: "CSS-first" de Tailwind v4 - les couleurs sont définies dans @theme
 */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Aucune configuration de thème - tout est dans theme.css avec @theme
  plugins: [],
}

export default config
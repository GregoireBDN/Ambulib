import { eslint } from "@repo/eslint-config";

export default eslint({
  extends: ["next/core-web-vitals"],
  rules: {
    // Désactiver temporairement les erreurs de types jusqu'à ce que nous résolvions les problèmes de configuration
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
});

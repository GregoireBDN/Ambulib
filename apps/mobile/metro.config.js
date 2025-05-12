const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Chemins du projet et du monorepo
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 1. Surveiller tous les fichiers du monorepo
config.watchFolders = [monorepoRoot];

// 2. Indiquer à Metro où résoudre les packages et dans quel ordre
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// 3. Configuration supplémentaire pour pnpm
// Nécessaire pour pnpm car il utilise une structure de node_modules différente
config.resolver.disableHierarchicalLookup = true;

module.exports = config;

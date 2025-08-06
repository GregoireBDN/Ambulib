import { defineConfig } from 'tsup'

export default defineConfig([
  // Main entry point
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external: ['react', 'react-dom', 'next'],
  },
  // Client entry
  {
    entry: ['src/client/index.ts'],
    outDir: 'dist/client',
    format: ['cjs', 'esm'],
    dts: true,
    external: ['react', 'react-dom'],
  },
  // Server entry
  {
    entry: ['src/server/index.ts'],
    outDir: 'dist/server',
    format: ['cjs', 'esm'],
    dts: true,
    external: ['next', 'react'],
  },
  // Mobile entry
  {
    entry: ['src/mobile/index.ts'],
    outDir: 'dist/mobile',
    format: ['cjs', 'esm'],
    dts: true,
    external: ['react-native', '@react-native-async-storage/async-storage'],
  },
])
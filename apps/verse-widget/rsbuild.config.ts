import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { withZephyr } from 'zephyr-rsbuild-plugin';

export default defineConfig({
  output: {
    // Chunks resolve relative to wherever remoteEntry.js is served from
    // (localhost in dev, a Zephyr edge URL once deployed).
    assetPrefix: 'auto',
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'verse_widget',
      filename: 'remoteEntry.js',
      exposes: {
        './VerseCard': './src/VerseCard.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
      dts: false,
    }),
    withZephyr(),
  ],
  server: {
    port: 3001,
  },
});

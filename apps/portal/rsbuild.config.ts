import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { withZephyr } from 'zephyr-rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'portal',
      remotes: {
        // Local dev only. On a Zephyr build this URL is replaced with the one
        // resolved from "zephyr:dependencies" in package.json.
        verse_widget: 'verse_widget@http://localhost:3001/mf-manifest.json',
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
    port: 3000,
  },
});

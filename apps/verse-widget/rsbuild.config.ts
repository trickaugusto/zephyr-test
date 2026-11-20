import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { withZephyr } from 'zephyr-rsbuild-plugin';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const git = (args: string, fallback: string) => {
  try {
    return execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return fallback;
  }
};

const widgetMeta = {
  name: pkg.name as string,
  version: pkg.version as string,
  commit: git('rev-parse --short HEAD', 'unknown'),
  commitSubject: git('log -1 --format=%s', ''),
  builtAt: new Date().toISOString(),
};

export default defineConfig({
  source: {
    define: {
      __WIDGET_META__: JSON.stringify(widgetMeta),
    },
  },
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
        './VerseCard': './src/components/VerseCard.tsx',
        './VerseBanner': './src/components/VerseBanner.tsx',
        './meta': './src/meta.ts',
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

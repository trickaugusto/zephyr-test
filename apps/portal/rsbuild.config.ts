import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { withZephyr } from 'zephyr-rsbuild-plugin';
import { execSync } from 'node:child_process';

const git = (args: string, fallback: string) => {
  try {
    return execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return fallback;
  }
};

// Shown in the "Loaded remote" panel to prove the host was not redeployed.
const hostMeta = {
  commit: git('rev-parse --short HEAD', 'unknown'),
  builtAt: new Date().toISOString(),
  build: process.env.GITHUB_RUN_NUMBER ? `#${process.env.GITHUB_RUN_NUMBER}` : 'local',
};

export default defineConfig({
  html: {
    title: 'Verse of the day widget',
    template: './index.html',
  },
  source: {
    define: {
      __HOST_META__: JSON.stringify(hostMeta),
    },
  },
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

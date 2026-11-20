/// <reference types="@rsbuild/core/types" />

// `process.env.ZE_PUBLIC_*` reads are rewritten at build time (by Zephyr, or
// left undefined); there is no Node `process` in the browser.
declare const process: { env: Record<string, string | undefined> };

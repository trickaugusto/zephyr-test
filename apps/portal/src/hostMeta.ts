export type HostMeta = { commit: string; builtAt: string; build: string };

// Replaced at build time through `source.define` (see rsbuild.config.ts).
declare const __HOST_META__: HostMeta | undefined;

const hostMeta: HostMeta =
  typeof __HOST_META__ === 'undefined'
    ? { commit: 'unknown', builtAt: new Date(0).toISOString(), build: 'local' }
    : __HOST_META__;

export default hostMeta;

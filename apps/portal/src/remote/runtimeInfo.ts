import { getInstance } from '@module-federation/enhanced/runtime';

/**
 * Returns the URL of the remote entry the Module Federation runtime resolved
 * for `remoteName` (on a Zephyr build, this is the URL rewritten from
 * "zephyr:dependencies"). Works once the remote has been loaded at least once.
 */
export function getRemoteEntryUrl(remoteName: 'verse_widget'): string | undefined {
  const fromRuntime = readFromRuntime(remoteName);
  return fromRuntime ?? readFromResourceTiming();
}

function readFromRuntime(remoteName: string): string | undefined {
  try {
    const instance = getInstance();
    if (!instance) return undefined;
    // Loaded modules: remoteInfo.entry is the resolved remoteEntry.js URL.
    const loaded = instance.moduleCache.get(remoteName)?.remoteInfo?.entry;
    if (loaded) return loaded;
    // Registered but not (yet) loaded: the configured entry, may be a manifest URL.
    const registered = instance.options.remotes.find(
      (remote) => remote.name === remoteName,
    );
    const entry = registered && 'entry' in registered ? registered.entry : undefined;
    return entry || undefined;
  } catch {
    return undefined;
  }
}

// Fallback: the remoteEntry.js request the browser actually made.
function readFromResourceTiming(): string | undefined {
  try {
    const entries = performance.getEntriesByType('resource');
    const hit = entries
      .map((entry) => entry.name)
      .reverse()
      .find((name) => /remoteEntry(\.[\w-]+)?\.js(\?|$)/.test(name) || name.endsWith('mf-manifest.json'));
    return hit;
  } catch {
    return undefined;
  }
}

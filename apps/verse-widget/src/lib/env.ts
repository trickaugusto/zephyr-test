/**
 * Optional environment chip text. On Zephyr, `process.env.ZE_PUBLIC_*` reads are
 * rewritten at build time to values set per environment in the dashboard.
 * Where nothing rewrites the read (local dev, ZE_DISABLED), `process` does not
 * exist in the browser, so the lookup is guarded.
 */
export const getEnvBadge = (): string | null => {
  let value: unknown;
  try {
    value = process.env.ZE_PUBLIC_ENV_BADGE;
  } catch {
    return null;
  }
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed === '' || trimmed === 'undefined') return null;
  return trimmed;
};

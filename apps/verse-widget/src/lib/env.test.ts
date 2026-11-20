import { afterEach, describe, expect, it, vi } from 'vitest';
import { getEnvBadge } from './env';

afterEach(() => vi.unstubAllEnvs());

describe('getEnvBadge', () => {
  it('returns null when unset', () => {
    expect(getEnvBadge()).toBeNull();
  });
  it('returns null when empty', () => {
    vi.stubEnv('ZE_PUBLIC_ENV_BADGE', '  ');
    expect(getEnvBadge()).toBeNull();
  });
  it('returns the trimmed value', () => {
    vi.stubEnv('ZE_PUBLIC_ENV_BADGE', 'Staging');
    expect(getEnvBadge()).toBe('Staging');
  });
});

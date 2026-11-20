import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import pkg from '../../package.json';
import LoadedRemotePanel, { environmentFromUrl } from './LoadedRemotePanel';

const meta = {
  name: 'verse-widget',
  version: '1.0.3',
  commit: 'a1b2c3d',
  commitSubject: 'x',
  builtAt: '2026-11-20T14:32:00Z',
};

describe('LoadedRemotePanel', () => {
  it('shows remote version, commit, url and the host version', () => {
    render(<LoadedRemotePanel meta={meta} url="https://example/remoteEntry.js" />);
    expect(screen.getByText('1.0.3')).toBeInTheDocument();
    expect(screen.getByText(/a1b2c3d/)).toBeInTheDocument();
    expect(screen.getByText('https://example/remoteEntry.js')).toBeInTheDocument();
    expect(screen.getByText(pkg.version)).toBeInTheDocument();
  });

  it('shows placeholders when the remote metadata is unavailable', () => {
    render(<LoadedRemotePanel meta={undefined} url={undefined} />);
    expect(screen.getByText(/metadata unavailable/i)).toBeInTheDocument();
  });
});

describe('environmentFromUrl', () => {
  it.each([
    ['https://production-verse-widget-zephyr-test-trickaugusto-ze.zephyr-cloud.io/remoteEntry.js', 'production'],
    ['https://staging-verse-widget-zephyr-test-trickaugusto-ze.zephyr-cloud.io/remoteEntry.js', 'staging'],
    ['https://t-main-verse-widget-zephyr-test-trickaugusto-ze.zephyr-cloud.io/remoteEntry.js', 't-main'],
    ['http://localhost:3001/remoteEntry.js', 'local'],
    ['not a url', undefined],
    [undefined, undefined],
  ])('%s -> %s', (url, expected) => {
    expect(environmentFromUrl(url)).toBe(expected);
  });
});

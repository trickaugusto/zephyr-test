import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoadedRemotePanel, { environmentFromUrl } from './LoadedRemotePanel';

const meta = {
  name: 'verse-widget',
  version: '1.0.3',
  commit: 'a1b2c3d',
  commitSubject: 'x',
  builtAt: '2026-11-20T14:32:00Z',
  build: '#7',
};

const host = { commit: 'f00ba12', builtAt: '2026-11-20T10:00:00Z', build: '#4' };

describe('LoadedRemotePanel', () => {
  it('shows remote build, commit and url, and the host build and commit', () => {
    render(<LoadedRemotePanel meta={meta} url="https://example/remoteEntry.js" host={host} />);
    expect(screen.getByText('#7')).toBeInTheDocument();
    expect(screen.getByText(/a1b2c3d/)).toBeInTheDocument();
    expect(screen.getByText('https://example/remoteEntry.js')).toBeInTheDocument();
    expect(screen.getByText(/#4 · f00ba12/)).toBeInTheDocument();
    expect(screen.queryByText('1.0.3')).not.toBeInTheDocument();
  });

  it('labels a remote without a build number (older remotes) as local', () => {
    const { build: _omit, ...older } = meta;
    render(<LoadedRemotePanel meta={older} url="https://example/remoteEntry.js" host={host} />);
    expect(screen.getByText('local')).toBeInTheDocument();
  });

  it('shows placeholders when the remote metadata is unavailable', () => {
    render(<LoadedRemotePanel meta={undefined} url={undefined} host={host} />);
    expect(screen.getByText(/metadata unavailable/i)).toBeInTheDocument();
  });
});

describe('environmentFromUrl', () => {
  it.each([
    ['https://production-verse-widget-zephyr-test-trickaugusto-ze.zephyrcloud.app/remoteEntry.js', 'production'],
    ['https://staging-verse-widget-zephyr-test-trickaugusto-ze.zephyrcloud.app/remoteEntry.js', 'staging'],
    ['https://t-main-verse-widget-zephyr-test-trickaugusto-ze.zephyrcloud.app/remoteEntry.js', 't-main'],
    ['http://localhost:3001/remoteEntry.js', 'local'],
    ['not a url', undefined],
    [undefined, undefined],
  ])('%s -> %s', (url, expected) => {
    expect(environmentFromUrl(url)).toBe(expected);
  });
});

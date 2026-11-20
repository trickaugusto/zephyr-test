import { lazy } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RemoteSlot from './RemoteSlot';

describe('RemoteSlot', () => {
  it('shows an inline fallback when the remote module fails to load', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const Broken = lazy(() => Promise.reject(new Error('remote unreachable')));

    render(
      <div>
        <RemoteSlot label="verse_widget/VerseCard">
          <Broken />
        </RemoteSlot>
        <p>rest of the page</p>
      </div>,
    );

    expect(
      await screen.findByText("The verse widget couldn't be loaded."),
    ).toBeInTheDocument();
    expect(screen.getByText('rest of the page')).toBeInTheDocument();
  });

  it('renders the remote content and its label when loading succeeds', async () => {
    const Ok = lazy(async () => ({ default: () => <p>remote content</p> }));
    render(
      <RemoteSlot label="verse_widget/VerseCard">
        <Ok />
      </RemoteSlot>,
    );
    expect(await screen.findByText('remote content')).toBeInTheDocument();
    expect(screen.getByText('verse_widget/VerseCard')).toBeInTheDocument();
  });
});

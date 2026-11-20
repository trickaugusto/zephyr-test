import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getVerseForDate } from '../verses/getVerse';
import VerseBanner from './VerseBanner';

vi.mock('../env', () => ({ getEnvBadge: vi.fn(() => null) }));

describe('VerseBanner', () => {
  it('shows the reference and a secondary Share button', () => {
    const { container } = render(<VerseBanner />);
    expect(container.querySelector('.vw-ref')?.textContent).toBe(
      getVerseForDate(new Date(), 'en').reference,
    );
    const share = screen.getByRole('button', { name: 'Share' });
    expect(share).toHaveAttribute('data-variant', 'secondary');
    expect(share).not.toHaveAttribute('data-variant', 'primary');
  });

  it('falls back for unknown locale and theme', () => {
    const { container } = render(<VerseBanner theme={'neon' as any} locale={'es' as any} />);
    expect(container.firstElementChild).toHaveAttribute('data-theme', 'light');
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('renders in Portuguese', () => {
    render(<VerseBanner locale="pt-BR" theme="dark" />);
    expect(screen.getByRole('button', { name: 'Compartilhar' })).toBeInTheDocument();
  });
});

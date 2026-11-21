import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getVerseForDate } from '../lib/verses';
import VerseBanner from './VerseBanner';

vi.mock('../lib/env', () => ({ getEnvBadge: vi.fn(() => null) }));

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

  it('shows the translation label in English, with no license link', () => {
    render(<VerseBanner />);
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /CC BY/ })).not.toBeInTheDocument();
  });

  it('shows the Bíblia Livre CC BY 4.0 attribution in Portuguese', () => {
    render(<VerseBanner locale="pt-BR" />);
    expect(screen.getByText(/Bíblia Livre/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'CC BY 4.0' })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/deed.pt_BR',
    );
  });
});

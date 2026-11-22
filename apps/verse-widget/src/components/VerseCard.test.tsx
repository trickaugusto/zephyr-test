import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getEnvBadge } from '../lib/env';
import { getVerseForDate } from '../lib/verses';
import VerseCard from './VerseCard';

vi.mock('../lib/env', () => ({ getEnvBadge: vi.fn(() => null) }));

const refText = (container: HTMLElement) => container.querySelector('.vw-ref')?.textContent;

beforeEach(() => {
  vi.mocked(getEnvBadge).mockReturnValue(null);
});

describe('VerseCard', () => {
  it('renders the English card', () => {
    const { container } = render(<VerseCard locale="en" />);
    expect(screen.getByText('Verse of the day')).toBeInTheDocument();
    expect(refText(container)).toBe(getVerseForDate(new Date(), 'en').reference);
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(container.textContent).not.toContain('CC BY');
  });

  it('renders the Portuguese card with the license link', () => {
    render(<VerseCard locale="pt-BR" />);
    expect(screen.getByText('Versículo do dia')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'CC BY 4.0' });
    expect(link).toHaveAttribute('href', 'https://creativecommons.org/licenses/by/4.0/deed.pt_BR');
  });

  it('navigates days and comes back', () => {
    const { container } = render(<VerseCard />);
    const original = refText(container);
    const originalDate = container.querySelector('.vw-date')?.textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Next day' }));
    expect(refText(container)).not.toBe(original);
    expect(container.querySelector('.vw-date')?.textContent).not.toBe(originalDate);
    fireEvent.click(screen.getByRole('button', { name: 'Previous day' }));
    expect(refText(container)).toBe(original);
    expect(container.querySelector('.vw-date')?.textContent).toBe(originalDate);
  });

  it('applies the dark theme', () => {
    const { container } = render(<VerseCard theme="dark" />);
    expect(container.firstElementChild).toHaveAttribute('data-theme', 'dark');
  });

  it('falls back to light and en for unknown values', () => {
    const { container } = render(<VerseCard theme={'neon' as any} locale={'es' as any} />);
    expect(container.firstElementChild).toHaveAttribute('data-theme', 'light');
    expect(screen.getByText('Verse of the day')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('falls back when props are undefined', () => {
    const { container } = render(<VerseCard theme={undefined} locale={undefined} />);
    expect(container.firstElementChild).toHaveAttribute('data-theme', 'light');
    expect(screen.getByText('Verse of the day')).toBeInTheDocument();
  });

  it('uses the primary variant for Share', () => {
    render(<VerseCard />);
    expect(screen.getByRole('button', { name: 'Share' })).toHaveAttribute('data-variant', 'primary');
  });

  it('shows the environment chip when a badge is set', () => {
    vi.mocked(getEnvBadge).mockReturnValue('Staging');
    render(<VerseCard />);
    expect(screen.getByText('Staging')).toBeInTheDocument();
  });

  it('shows no chip and no "undefined" without a badge', () => {
    const { container } = render(<VerseCard />);
    expect(container.querySelector('.vw-chip')).toBeNull();
    expect(container.textContent).not.toContain('undefined');
  });
});

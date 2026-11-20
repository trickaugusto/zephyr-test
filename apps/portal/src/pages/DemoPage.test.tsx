import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('verse_widget/VerseCard', () => ({
  default: ({ theme, locale }: { theme?: string; locale?: string }) => (
    <div>card {theme} {locale}</div>
  ),
}));
vi.mock('verse_widget/VerseBanner', () => ({ default: () => <div>banner</div> }));
vi.mock('verse_widget/meta', () => ({
  default: { name: 'verse-widget', version: '2.0.0', commit: 'abc1234', commitSubject: 'tweak', builtAt: '2026-11-20T14:32:00Z' },
}));

import App from '../App';

describe('App', () => {
  it('renders remote pieces and metadata, and passes theme/locale props', async () => {
    render(<App />);
    expect(await screen.findByText('card light en')).toBeInTheDocument();
    expect(await screen.findByText('2.0.0')).toBeInTheDocument();
    screen.getByRole('button', { name: 'Dark' }).click();
    screen.getByRole('button', { name: 'PT' }).click();
    expect(await screen.findByText('card dark pt-BR')).toBeInTheDocument();
  });
});

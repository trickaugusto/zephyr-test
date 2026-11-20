import { describe, expect, it } from 'vitest';
import { formatDay, t } from './i18n';

describe('i18n', () => {
  it('has Portuguese copy', () => {
    expect(t('pt-BR').overline).toBe('Versículo do dia');
    expect(t('en').overline).toBe('Verse of the day');
  });

  it('formats days in both locales', () => {
    const d = new Date(2026, 10, 20);
    expect(formatDay(d, 'en').length).toBeGreaterThan(0);
    expect(formatDay(d, 'pt-BR').length).toBeGreaterThan(0);
  });
});

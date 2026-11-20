import { describe, expect, it } from 'vitest';
import { addDays, dayNumber, getVerseForDate, normalizeLocale } from './verses';
import { REFERENCE_IDS } from '../data/references';

describe('getVerseForDate', () => {
  it('returns the same verse for the same local date', () => {
    const a = getVerseForDate(new Date(2026, 10, 20, 8), 'en');
    const b = getVerseForDate(new Date(2026, 10, 20, 22), 'en');
    expect(a).toEqual(b);
  });

  it('returns a different reference on the next day', () => {
    const d = new Date(2026, 10, 20);
    expect(getVerseForDate(addDays(d, 1), 'en').reference).not.toBe(
      getVerseForDate(d, 'en').reference,
    );
  });

  it('keeps en and pt-BR on the same reference id for 60 days', () => {
    const start = new Date(2026, 10, 20);
    for (let i = 0; i < 60; i++) {
      const d = addDays(start, i);
      const index = ((dayNumber(d) % REFERENCE_IDS.length) + REFERENCE_IDS.length) % REFERENCE_IDS.length;
      const [, chapter, verse] = REFERENCE_IDS[index].split('.');
      const suffix = `${chapter}:${verse}`;
      expect(getVerseForDate(d, 'en').reference.endsWith(suffix)).toBe(true);
      expect(getVerseForDate(d, 'pt-BR').reference.endsWith(suffix)).toBe(true);
    }
  });

  it('always yields a verse within +-1000 days and before 1970', () => {
    const today = new Date(2026, 10, 20);
    for (let i = -1000; i <= 1000; i++) {
      for (const locale of ['en', 'pt-BR'] as const) {
        const v = getVerseForDate(addDays(today, i), locale);
        expect(v.text.length).toBeGreaterThan(0);
        expect(v.reference.length).toBeGreaterThan(0);
      }
    }
    expect(getVerseForDate(new Date(1969, 5, 1), 'en').text).not.toBe('');
    expect(getVerseForDate(new Date(1900, 0, 1), 'pt-BR').text).not.toBe('');
  });

  it('labels the translation per locale', () => {
    const d = new Date(2026, 10, 20);
    expect(getVerseForDate(d, 'en').translation).toBe('WEB');
    expect(getVerseForDate(d, 'pt-BR').translation).toBe('Bíblia Livre');
  });
});

describe('dayNumber', () => {
  it('ignores the time of day', () => {
    expect(dayNumber(new Date(2026, 10, 20, 23, 59))).toBe(
      dayNumber(new Date(2026, 10, 20, 0, 1)),
    );
  });

  it('increases by one per calendar day', () => {
    const d = new Date(2026, 2, 28);
    expect(dayNumber(addDays(d, 1)) - dayNumber(d)).toBe(1);
  });
});

describe('normalizeLocale', () => {
  it('falls back to en', () => {
    expect(normalizeLocale('es')).toBe('en');
    expect(normalizeLocale(undefined)).toBe('en');
  });
  it('keeps pt-BR', () => {
    expect(normalizeLocale('pt-BR')).toBe('pt-BR');
  });
});

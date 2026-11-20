import type { Locale, Verse } from '../types';
import en from '../data/en.json';
import ptBR from '../data/pt-BR.json';
import { REFERENCE_IDS } from '../data/references';

type VerseTable = Record<string, { reference: string; text: string }>;

const TABLES: Record<Locale, { table: VerseTable; translation: string }> = {
  en: { table: en, translation: 'WEB' },
  'pt-BR': { table: ptBR, translation: 'Bíblia Livre' },
};

export const normalizeLocale = (value: unknown): Locale =>
  value === 'pt-BR' ? 'pt-BR' : 'en';

const MS_PER_DAY = 86_400_000;

/** Days since 1970-01-01 of the local calendar date (time of day ignored). */
export const dayNumber = (date: Date): number =>
  Math.round(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(1970, 0, 1)) /
      MS_PER_DAY,
  );

/** Calendar arithmetic on local dates, so DST changes never skip a day. */
export const addDays = (date: Date, n: number): Date => {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + n);
  return next;
};

export const getVerseForDate = (date: Date, locale: Locale): Verse => {
  const total = REFERENCE_IDS.length;
  const index = ((dayNumber(date) % total) + total) % total;
  const { table, translation } = TABLES[locale];
  const entry = table[REFERENCE_IDS[index]];
  return { reference: entry.reference, text: entry.text, translation };
};

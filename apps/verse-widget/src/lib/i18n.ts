import type { Locale } from '../types';

interface Copy {
  overline: string;
  share: string;
  copied: string;
  copyFailed: string;
  previousDay: string;
  nextDay: string;
  tagline: string;
  licenseHref?: string;
}

const COPY: Record<Locale, Copy> = {
  en: {
    overline: 'Verse of the day',
    share: 'Share',
    copied: 'Copied',
    copyFailed: "Couldn't copy",
    previousDay: 'Previous day',
    nextDay: 'Next day',
    tagline: 'Your trail through the Word 👟',
  },
  'pt-BR': {
    overline: 'Versículo do dia',
    share: 'Compartilhar',
    copied: 'Copiado',
    copyFailed: 'Não foi possível copiar',
    previousDay: 'Dia anterior',
    nextDay: 'Próximo dia',
    tagline: 'Sua trilha na Palavra 👟',
    licenseHref: 'https://creativecommons.org/licenses/by/4.0/deed.pt_BR',
  },
};

export const t = (locale: Locale): Copy => COPY[locale];

export const formatDay = (date: Date, locale: Locale): string =>
  new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);

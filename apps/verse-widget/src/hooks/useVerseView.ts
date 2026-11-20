import { useEffect, useMemo, useState } from 'react';
import { getEnvBadge } from '../lib/env';
import { formatDay, t } from '../lib/i18n';
import type { Locale, Theme } from '../types';
import { addDays, getVerseForDate, normalizeLocale } from '../lib/verses';
import { useShare } from '../hooks/useShare';
import '../styles/tokens.css';
import '../styles/widget.css';

export interface WidgetProps {
  theme?: Theme;
  locale?: Locale;
}

const FONTS_ID = 'vw-fonts';
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&family=Cormorant+Garamond:ital,wght@1,700&family=Inter:wght@400;500;600&family=Literata:opsz,wght@7..72,400&display=swap';

const ensureFonts = () => {
  if (typeof document === 'undefined' || document.getElementById(FONTS_ID)) return;
  const link = document.createElement('link');
  link.id = FONTS_ID;
  link.rel = 'stylesheet';
  link.href = FONTS_HREF;
  document.head.appendChild(link);
};

/** Shared state for card and banner. Unknown theme/locale values fall back. */
export function useVerseView(props: WidgetProps) {
  const theme: Theme = props.theme === 'dark' ? 'dark' : 'light';
  const locale = normalizeLocale(props.locale);

  useEffect(ensureFonts, []);

  const [today] = useState(() => new Date());
  const [offset, setOffset] = useState(0);
  const date = useMemo(() => addDays(today, offset), [today, offset]);
  const verse = useMemo(() => getVerseForDate(date, locale), [date, locale]);
  const { share, status } = useShare();
  const copy = t(locale);

  const statusText =
    status === 'copied' ? copy.copied : status === 'copyFailed' ? copy.copyFailed : '';

  return {
    theme,
    locale,
    copy,
    verse,
    date,
    dateLabel: formatDay(date, locale),
    envBadge: getEnvBadge(),
    statusText,
    previous: () => setOffset((n) => n - 1),
    next: () => setOffset((n) => n + 1),
    share: () => share(verse),
  };
}

/** "1 Corinthians 15:58" -> ["1 Corinthians", "15:58"] */
export const splitReference = (reference: string): [string, string] => {
  const i = reference.lastIndexOf(' ');
  return i === -1 ? [reference, ''] : [reference.slice(0, i), reference.slice(i + 1)];
};

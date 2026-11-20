import Segmented from './Segmented';

export type Tab = 'demo' | 'practice';
export type Theme = 'light' | 'dark';
export type Locale = 'en' | 'pt-BR';

type Props = {
  tab: Tab;
  onTab: (tab: Tab) => void;
  theme: Theme;
  onTheme: (theme: Theme) => void;
  locale: Locale;
  onLocale: (locale: Locale) => void;
};

export default function TopBar({ tab, onTab, theme, onTheme, locale, onLocale }: Props) {
  return (
    <header className="top">
      <span className="name">
        Verse of the day <em>widget</em>
      </span>
      <nav className="tabs" aria-label="Pages">
        <button
          type="button"
          className={tab === 'demo' ? 'on' : undefined}
          aria-current={tab === 'demo' ? 'page' : undefined}
          onClick={() => onTab('demo')}
        >
          Demo
        </button>
        <button
          type="button"
          className={tab === 'practice' ? 'on' : undefined}
          aria-current={tab === 'practice' ? 'page' : undefined}
          onClick={() => onTab('practice')}
        >
          In practice
        </button>
      </nav>
      <div className="controls">
        <Segmented
          label="Theme"
          value={theme}
          onChange={onTheme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
        <Segmented
          label="Language"
          value={locale}
          onChange={onLocale}
          options={[
            { value: 'en', label: 'EN' },
            { value: 'pt-BR', label: 'PT' },
          ]}
        />
      </div>
    </header>
  );
}

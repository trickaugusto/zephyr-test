import { useState } from 'react';
import TopBar, { type Locale, type Tab, type Theme } from './components/TopBar';
import ChurchPage from './pages/ChurchPage';
import DemoPage from './pages/DemoPage';
import './styles/portal.css';

const App = () => {
  const [tab, setTab] = useState<Tab>('demo');
  const [theme, setTheme] = useState<Theme>('light');
  const [locale, setLocale] = useState<Locale>('en');

  return (
    <div className="portal">
      <TopBar
        tab={tab}
        onTab={setTab}
        theme={theme}
        onTheme={setTheme}
        locale={locale}
        onLocale={setLocale}
      />
      <main>
        {tab === 'demo' ? (
          <DemoPage theme={theme} locale={locale} />
        ) : (
          <ChurchPage theme={theme} locale={locale} />
        )}
      </main>
    </div>
  );
};

export default App;

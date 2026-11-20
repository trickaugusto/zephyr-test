import VerseBanner from './components/VerseBanner';
import VerseCard from './components/VerseCard';
import { getEnvBadge } from './lib/env';
import meta from './lib/meta';
import './styles/tokens.css';
import './styles/widget.css';

// Standalone page, shown when the remote's own URL is opened.
const App = () => (
  <main className="vw-page">
    <VerseCard />
    <div className="vw-page-banner">
      <VerseBanner />
    </div>
    <p className="vw-page-env">
      env: {getEnvBadge() ?? 'none'} · v{meta.version} · {meta.commit}
    </p>
  </main>
);

export default App;

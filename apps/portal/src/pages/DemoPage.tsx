import { lazy, useEffect, useState } from 'react';
import LoadedRemotePanel, { type RemoteMeta } from '../components/LoadedRemotePanel';
import RemoteSlot from '../components/RemoteSlot';
import type { Locale, Theme } from '../components/TopBar';
import { getRemoteEntryUrl } from '../lib/runtimeInfo';

const VerseCard = lazy(() => import('verse_widget/VerseCard'));
const VerseBanner = lazy(() => import('verse_widget/VerseBanner'));

export default function DemoPage({ theme, locale }: { theme: Theme; locale: Locale }) {
  const [meta, setMeta] = useState<RemoteMeta>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let active = true;
    import('verse_widget/meta')
      .then((module) => {
        if (!active) return;
        setMeta(module.default);
        setUrl(getRemoteEntryUrl('verse_widget'));
      })
      .catch(() => {
        if (active) setUrl(getRemoteEntryUrl('verse_widget'));
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="wrap">
      <div>
        <div className="overline">Micro-frontend with Module Federation + Zephyr</div>
        <h1 className="headline">
          One widget, <em>many</em> places.
        </h1>
        <p className="sub">
          This page is the host. The card and the banner come from a remote that is
          published separately. Publish the remote and this page changes without being
          deployed again.
        </p>
        <div className="stage">
          <RemoteSlot label="verse_widget/VerseCard">
            <VerseCard theme={theme} locale={locale} />
          </RemoteSlot>
          <div className="stage__side">
            <RemoteSlot label="verse_widget/VerseBanner">
              <VerseBanner theme={theme} locale={locale} />
            </RemoteSlot>
            <p className="hint">
              The Light/Dark and EN/PT controls in the top bar belong to the host. They
              pass the <code>theme</code> and <code>locale</code> props to both pieces.
            </p>
          </div>
        </div>
      </div>
      <LoadedRemotePanel meta={meta} url={url} />
    </div>
  );
}

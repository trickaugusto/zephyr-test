import hostMeta, { type HostMeta } from '../lib/hostMeta';

export type RemoteMeta = {
  name: string;
  version: string;
  commit: string;
  commitSubject: string;
  builtAt: string;
  build?: string;
};

/**
 * Zephyr URLs start with the environment/tag, e.g.
 * `production-verse-widget-…`, `staging-verse-widget-…`, `t-main-verse-widget-…`.
 * Returns that prefix (the part before the application name).
 */
export function environmentFromUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return undefined;
  }
  if (host === 'localhost' || host === '127.0.0.1') return 'local';
  const first = host.split('.')[0];
  const index = first.indexOf('-verse-widget');
  return index > 0 ? first.slice(0, index) : undefined;
}

function formatPublished(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString('en', { dateStyle: 'medium', timeStyle: 'short' });
}

type Props = { meta: RemoteMeta | undefined; url: string | undefined; host?: HostMeta };

export default function LoadedRemotePanel({ meta, url, host = hostMeta }: Props) {
  const environment = environmentFromUrl(url);
  return (
    <aside className="panel" aria-label="Loaded remote">
      <div className="overline">Loaded remote</div>
      <h3>{meta?.name ?? 'verse-widget'}</h3>
      {meta ? (
        <>
          <Row k="CI run" v={meta.build ?? 'local'} />
          <Row k="Commit" v={`${meta.commit} · “${meta.commitSubject}”`} />
          <Row k="Published" v={formatPublished(meta.builtAt)} />
        </>
      ) : (
        <p className="note">Remote metadata unavailable.</p>
      )}
      <Row k="Loaded from" v={url ?? 'unknown'} />
      <Row
        k="Environment"
        v={environment ? <span className="pill">{environment}</span> : 'unknown'}
      />
      <Row k="Host" v={`${host.build} · ${host.commit} · ${formatPublished(host.builtAt)}`} />
      <p className="note">
        Publishing only the remote changes the remote rows after a reload. The
        host row stays the same.
      </p>
    </aside>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="kv">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
    </div>
  );
}

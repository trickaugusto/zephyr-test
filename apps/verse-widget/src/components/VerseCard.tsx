import Attribution from './Attribution';
import { ChevronLeftIcon, ChevronRightIcon, ShareIcon } from './Icons';
import { splitReference, useVerseView, type WidgetProps } from '../hooks/useVerseView';

export default function VerseCard(props: WidgetProps) {
  const v = useVerseView(props);
  const [book, numbers] = splitReference(v.verse.reference);

  return (
    <section className="vw vw-card" data-theme={v.theme} lang={v.locale}>
      <div className="vw-top">
        <span aria-hidden="true">📖</span>
        <span className="vw-overline">{v.copy.overline}</span>
        {v.envBadge && <span className="vw-chip">{v.envBadge}</span>}
      </div>
      <p className="vw-text">{v.verse.text}</p>
      <div className="vw-ref">
        {book} <em>{numbers}</em>
      </div>
      <div>
        <Attribution
          translation={v.verse.translation}
          licenseHref={v.locale === 'pt-BR' ? v.copy.licenseHref : undefined}
        />
      </div>
      <div className="vw-foot">
        <button type="button" className="vw-btn" data-variant="primary" onClick={v.share}>
          <ShareIcon />
          {v.copy.share}
        </button>
        <span className="vw-status" role="status">
          {v.statusText}
        </span>
        <span className="vw-date">{v.dateLabel}</span>
        <button
          type="button"
          className="vw-btn"
          data-variant="ghost"
          aria-label={v.copy.previousDay}
          onClick={v.previous}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          className="vw-btn"
          data-variant="ghost"
          aria-label={v.copy.nextDay}
          onClick={v.next}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="vw-tagline">{v.copy.tagline}</div>
    </section>
  );
}

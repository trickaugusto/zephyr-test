import { splitReference, useVerseView, type WidgetProps } from '../hooks/useVerseView';

export default function VerseBanner(props: WidgetProps) {
  const v = useVerseView(props);
  const [book, numbers] = splitReference(v.verse.reference);

  return (
    <section className="vw vw-banner" data-theme={v.theme} lang={v.locale}>
      <span aria-hidden="true">📖</span>
      <span className="vw-text" title={v.verse.text}>
        {v.verse.text}
      </span>
      <span className="vw-ref">
        {book} <em>{numbers}</em>
      </span>
      <span className="vw-status" role="status">
        {v.statusText}
      </span>
      <button type="button" className="vw-btn" data-variant="secondary" onClick={v.share}>
        {v.copy.share}
      </button>
    </section>
  );
}

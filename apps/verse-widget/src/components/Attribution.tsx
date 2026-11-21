type Props = { translation: string; licenseHref?: string; className?: string };

/** Translation label; adds the CC BY 4.0 link when the translation requires it. */
export default function Attribution({ translation, licenseHref, className = 'vw-translation' }: Props) {
  return (
    <span className={className}>
      {licenseHref ? (
        <>
          {translation} ·{' '}
          <a href={licenseHref} target="_blank" rel="noopener noreferrer">
            CC BY 4.0
          </a>
        </>
      ) : (
        translation
      )}
    </span>
  );
}

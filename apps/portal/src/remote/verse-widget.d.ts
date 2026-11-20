// Types for modules exposed by the verse_widget remote.
// Kept by hand so builds never need to fetch types from a deployed remote.
declare module 'verse_widget/VerseCard' {
  import type { ReactElement } from 'react';
  const VerseCard: (props: {
    theme?: 'light' | 'dark';
    locale?: 'en' | 'pt-BR';
  }) => ReactElement;
  export default VerseCard;
}

declare module 'verse_widget/VerseBanner' {
  import type { ReactElement } from 'react';
  const VerseBanner: (props: {
    theme?: 'light' | 'dark';
    locale?: 'en' | 'pt-BR';
  }) => ReactElement;
  export default VerseBanner;
}

declare module 'verse_widget/meta' {
  const meta: {
    name: string;
    version: string;
    commit: string;
    commitSubject: string;
    /** ISO 8601 timestamp */
    builtAt: string;
    /** CI run number such as `#12`; missing on local or older builds. */
    build?: string;
  };
  export default meta;
}

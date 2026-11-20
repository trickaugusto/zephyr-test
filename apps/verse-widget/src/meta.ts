export interface WidgetMeta {
  name: string;
  version: string;
  commit: string;
  commitSubject: string;
  /** ISO timestamp of the build. */
  builtAt: string;
}

// Replaced at build time through `source.define` (see rsbuild.config.ts).
declare const __WIDGET_META__: WidgetMeta | undefined;

const fallback: WidgetMeta = {
  name: 'verse-widget',
  version: '0.0.0',
  commit: 'unknown',
  commitSubject: '',
  builtAt: new Date(0).toISOString(),
};

const meta: WidgetMeta =
  typeof __WIDGET_META__ === 'undefined' ? fallback : __WIDGET_META__;

export default meta;

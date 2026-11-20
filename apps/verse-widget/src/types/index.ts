export type Theme = 'light' | 'dark';
export type Locale = 'en' | 'pt-BR';

export interface Verse {
  reference: string;
  text: string;
  translation: string;
}

import { useCallback, useEffect, useRef, useState } from 'react';

export type ShareStatus = 'idle' | 'copied' | 'copyFailed';

export interface SharePayload {
  text: string;
  reference: string;
  translation: string;
}

const RESET_MS = 2500;

export const formatShareText = ({ text, reference, translation }: SharePayload) =>
  `"${text}" — ${reference} (${translation})`;

export function useShare() {
  const [status, setStatus] = useState<ShareStatus>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = useCallback((next: ShareStatus) => {
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), RESET_MS);
  }, []);

  const share = useCallback(
    async (payload: SharePayload) => {
      const text = formatShareText(payload);

      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title: payload.reference, text });
          return;
        } catch (error) {
          // The user dismissed the share sheet: nothing to report.
          if (error instanceof DOMException && error.name === 'AbortError') return;
          if ((error as { name?: string } | null)?.name === 'AbortError') return;
          // Any other failure falls through to the clipboard.
        }
      }

      try {
        await navigator.clipboard.writeText(text);
        flash('copied');
      } catch {
        flash('copyFailed');
      }
    },
    [flash],
  );

  return { share, status };
}

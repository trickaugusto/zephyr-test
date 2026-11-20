import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useShare } from './useShare';

const payload = { text: 'Love is patient', reference: '1 Corinthians 13:4', translation: 'WEB' };
const expected = '"Love is patient" — 1 Corinthians 13:4 (WEB)';

const setNavigator = (props: { share?: unknown; clipboard?: unknown }) => {
  Object.defineProperty(navigator, 'share', { value: props.share, configurable: true });
  Object.defineProperty(navigator, 'clipboard', { value: props.clipboard, configurable: true });
};

afterEach(() => {
  setNavigator({});
  vi.useRealTimers();
});

describe('useShare', () => {
  it('uses navigator.share when available', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    setNavigator({ share });
    const { result } = renderHook(() => useShare());
    await act(() => result.current.share(payload));
    expect(share).toHaveBeenCalledWith({ title: payload.reference, text: expected });
    expect(result.current.status).toBe('idle');
  });

  it('stays idle when the user dismisses the share sheet', async () => {
    const writeText = vi.fn();
    setNavigator({
      share: vi.fn().mockRejectedValue(new DOMException('cancelled', 'AbortError')),
      clipboard: { writeText },
    });
    const { result } = renderHook(() => useShare());
    await act(() => result.current.share(payload));
    expect(result.current.status).toBe('idle');
    expect(writeText).not.toHaveBeenCalled();
  });

  it('copies the exact text without navigator.share', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setNavigator({ clipboard: { writeText } });
    const { result } = renderHook(() => useShare());
    await act(() => result.current.share(payload));
    expect(writeText).toHaveBeenCalledWith(expected);
    expect(result.current.status).toBe('copied');
  });

  it('reports copyFailed when the clipboard rejects', async () => {
    setNavigator({ clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
    const { result } = renderHook(() => useShare());
    await act(() => result.current.share(payload));
    expect(result.current.status).toBe('copyFailed');
  });

  it('reports copyFailed when no clipboard exists', async () => {
    setNavigator({});
    const { result } = renderHook(() => useShare());
    await act(() => result.current.share(payload));
    expect(result.current.status).toBe('copyFailed');
  });

  it('falls back to the clipboard when sharing fails for another reason', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setNavigator({ share: vi.fn().mockRejectedValue(new Error('boom')), clipboard: { writeText } });
    const { result } = renderHook(() => useShare());
    await act(() => result.current.share(payload));
    expect(result.current.status).toBe('copied');
  });

  it('returns to idle after a while', async () => {
    vi.useFakeTimers();
    setNavigator({ clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    const { result } = renderHook(() => useShare());
    await act(() => result.current.share(payload));
    expect(result.current.status).toBe('copied');
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.status).toBe('idle');
  });
});

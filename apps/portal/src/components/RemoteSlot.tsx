import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react';

export const REMOTE_ERROR_MESSAGE = "The verse widget couldn't be loaded.";

type Props = { label: string; children: ReactNode };

class RemoteErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Remote failed to load', error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="remote-fallback" role="status">
          {REMOTE_ERROR_MESSAGE}
        </p>
      );
    }
    return this.props.children;
  }
}

export default function RemoteSlot({ label, children }: Props) {
  return (
    <div className="remote-slot">
      <span className="remote-slot__tag">{label}</span>
      <RemoteErrorBoundary>
        <Suspense fallback={<p className="remote-loading">Loading…</p>}>
          {children}
        </Suspense>
      </RemoteErrorBoundary>
    </div>
  );
}

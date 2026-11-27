import { Component, useEffect, type ReactNode } from "react";

function showFallback(visible: boolean) {
  const fallback = document.getElementById("portfolio-fallback");
  if (fallback) fallback.hidden = !visible;
}

export function StartupReady({ children }: { children: ReactNode }) {
  // Keep the independent HTML visible until React has committed successfully.
  useEffect(() => {
    showFallback(false);
    return () => showFallback(true);
  }, []);
  return children;
}

export default class StartupBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    showFallback(true);
    console.error("Portfolio rendering failed; contact fallback remains available.", error);
  }

  render() {
    return this.state.failed ? null : <StartupReady>{this.props.children}</StartupReady>;
  }
}

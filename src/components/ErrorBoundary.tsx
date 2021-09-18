import React, { PropsWithChildren } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  PropsWithChildren<{
    fallbackRender: FallbackRender;
  }>,
  { error: Error | null }
> {
  state = { error: null };

  // 抛出异常时将 error 合并到 state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}

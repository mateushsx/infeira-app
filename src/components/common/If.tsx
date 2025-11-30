import type { ReactNode } from 'react';

interface IfProps {
  condition: boolean;
  children: ReactNode;
  elseRender?: ReactNode;
}

export function If({ condition, children, elseRender }: IfProps): ReactNode {
  if (condition) {
    return <>{children}</>;
  }
  return elseRender ? <>{elseRender}</> : null;
}


// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default (Layout: React.StatelessFunctionalComponent<Props>);

import React from 'react';
import { Header, Logo, Root } from '@/layout';

export const App = () => {
  return (
    <Root
      historyType="hash"
      navType="breadcrumb"
      // navType="tab"
      maxTabNum={10}
      logo={(collapsed: boolean) => <Logo collapsed={collapsed} />}
      headerComponent={<Header />}
      headerHeight={56}
    />
  );
};

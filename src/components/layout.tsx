import * as React from 'react';
import Header from './Header';
import { Footer } from './Footer';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

interface Props {
  location: Location;
  children: React.ReactNode;
}

const Layout = ({ location, children }: Props) => {
  const rootPath = '/';
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

import * as React from 'react';
import Header from './Header';
import { Footer } from './Footer';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

interface Props {
  location?: Location;
  children: React.ReactNode;
}

const Layout = ({ location, children }: Props) => {
  return (
    <div>
      <Header />
      <main className="py-12 pb-20 px-6 flex overflow-y-scroll mx-auto max-w-screen-md">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

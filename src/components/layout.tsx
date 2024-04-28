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
  return (
    <div>
      <Header />
      <main className="pt-12 pl-6 pr-6 flex overflow-y-scroll max-w-screen-lg mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

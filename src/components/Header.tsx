import { Link } from 'gatsby';
import React from 'react';

function Header() {
  return (
    <header className="w-full flex justify-between">
      <ul className="flex pt-5 pb-5">
        <Link to="/">
          <li className="text-2xl text-violet-500">devjojo</li>
        </Link>
      </ul>

      <ul className="flex pt-5 pb-5">
        <Link to="/">
          <li className="text-stone-950 text-2xl ">POST</li>
        </Link>
        {/* <Link to="/about">
          <li className="text-stone-950 text-2xl">About</li>
        </Link> */}
      </ul>
    </header>
  );
}

export default Header;

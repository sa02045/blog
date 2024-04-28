import { Link } from 'gatsby';
import React from 'react';

function Header() {
  return (
    <header className="px-6 py-4 border-b">
      <div className="flex justify-between max-w-screen-md mx-auto">
        <ul className="flex">
          <Link to="/">
            <li className="text-2xl text-violet-500 font-bold">seunghee 기술블로그</li>
          </Link>
        </ul>

        <ul className="flex">
          <Link to="/">
            <li className="text-stone-950 text-xl">기술 글</li>
          </Link>
          {/* <Link to="/essay">
            <li className="text-stone-950 text-xl ml-3">에세이</li>
          </Link>
          <Link to="/about">
            <li className="text-stone-950 text-xl ml-3">자기소개</li>
          </Link> */}
        </ul>
      </div>
    </header>
  );
}

export default Header;

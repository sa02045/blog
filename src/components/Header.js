import { Link } from 'gatsby';
import React from 'react';
import Github from '../images/github.png';

function Header({ location }) {
  const currentPath = location.pathname;

  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <Link to="/">
            <li className={currentPath === '/' ? 'clicked' : ''}>Posts</li>
          </Link>
        </ul>
      </nav>
      <nav className="header__social">
        {/* <ul>
          <Link to="https://github.com/sa02045">
            <li>
              <img src={Github} width={30} />
            </li>
          </Link>
        </ul> */}
      </nav>
    </header>
  );
}

export default Header;

import { Link } from 'gatsby';
import React from 'react';
import { DarkModeToggler } from './darkModeToggler';
import classNames from 'classnames';
interface Props {
  location: Location;
}

function Header({ location }: Props) {
  const currentPath = location.pathname;

  const postNavClass = classNames({
    clicked: currentPath === '/',
  });

  return (
    <header className="header">
      <nav className="menu">
        <ul>
          <Link to="/">
            <li className={postNavClass}>Posts</li>
          </Link>
          <Link to="/about">
            <li className={postNavClass}>about</li>
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
      {/* <nav className="header__dark-toggle">
        <ul>
          <li>
            <DarkModeToggler />
          </li>
        </ul>
      </nav> */}
    </header>
  );
}

export default Header;

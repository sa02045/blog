import { Link } from 'gatsby';
import React from 'react';
import * as styles from './header.module.css';
import { DarkModeToggler } from './darkModeToggler';
import classNames from 'classnames';

function Header({ location }) {
  const currentPath = location.pathname;

  const postNavClass = classNames({
    clicked: currentPath === '/',
  });

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <Link to="/">
            <li className={postNavClass}>Posts</li>
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
      <nav>
        <ul>
          <li>
            <DarkModeToggler />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import { Link } from 'gatsby';
import React from 'react';
import * as styles from './Header.module.scss';

function Header({ location }) {
  const currentPath = location.pathname;

  return (
    <header children={styles.header}>
      <nav>
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

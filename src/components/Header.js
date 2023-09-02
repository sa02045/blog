import { Link } from "gatsby";
import React from "react";
import GithubLogo from "../images/github-mark.png";

function Header({ location }) {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <Link to="/">
            <li>dev.jo</li>
          </Link>
          <Link to="/posts">
            <li className={location.pathname === "/posts/" ? "clicked" : ""}>posts</li>
          </Link>
          {/* <Link to="/resume">
            <li className={location.pathname === "/resume/" ? "clicked" : ""}>resume</li>
          </Link> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

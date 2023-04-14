import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import quotes from "../constants/quotes"

function Header({ location }) {
  const [randomQuote, setRandomQuote] = useState({})

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomNumber])
  })

  return (
    <header className="header">
      <div className="header__title-container">
        <Link to="/">
          <h1>소프트엔지니어 블로그</h1>
        </Link>
        <div className="header__sub-title">
          <q>{randomQuote.quote}</q>
          <div> - {randomQuote.author}</div>
        </div>
      </div>
      <nav>
        <ul>
          <Link to="/">
            <li className={location.pathname === "/" ? "clicked" : ""}>Posts</li>
          </Link>
          <Link to="/resume/">
            <li className={location.pathname === "/resume/" ? "clicked" : ""}>Resume</li>
          </Link>
          <Link to="https://github.com/sa02045/">
            <li>Github</li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header

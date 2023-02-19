import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import quotes from "../constants/quotes"

function Header({ location }) {
  const rootPath = `${__PATH_PREFIX__}/`
  const [randomQuote, setRandomQuote] = useState({})

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomNumber])
  })

  // const isRootPath = location.pathname === rootPath

  return (
    <header className="header">
      <div className="header__title-container">
        <h1>소프트엔지니어 블로그</h1>
        <div className="header__sub-title">
          {randomQuote.quote} - {randomQuote.author}
        </div>
      </div>
      <nav>
        <ul>
          <Link to="/posts">
            <li>Posts</li>
          </Link>
          <Link to="/resume/">
            <li>Resume</li>
          </Link>
          <Link to="/">
            <li>Github</li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header

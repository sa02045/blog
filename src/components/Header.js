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

  console.log(location)
  // const isRootPath = location.pathname === rootPath

  return (
    <header className="header">
      <div className="header__title-container">
        <h1>소프트엔지니어 블로그</h1>
        <div className="header__sub-title">
          <q>{randomQuote.quote}</q>
          <div> - {randomQuote.author}</div>
        </div>
      </div>
      <nav>
        <ul>
          <Link to="/">
            <li className={location.pathname === "/" ? "clicked" : ""}>
              Posts
            </li>
          </Link>
          <Link to="/resume/">
            <li className={location.pathname === "/resume/" ? "clicked" : ""}>
              Resume
            </li>
          </Link>
          <Link to="https://github.com/sa02045">
            <li>Github</li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header

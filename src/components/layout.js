import * as React from "react"
import Header from "./Header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header location={location} />
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout

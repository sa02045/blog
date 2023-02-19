import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Posts = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return <Layout location={location} title={siteTitle}></Layout>
}

export const Head = () => <Seo title="404: Not Found" />

export default Posts

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

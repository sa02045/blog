import { Link, graphql } from "gatsby";
import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  return (
    <Layout location={location} title={siteTitle}>
      <div className="home__top-container">
        <h2>안녕하세요</h2>
      </div>
    </Layout>
  );
};

export default Home;

export const Head = () => <Seo title="개발자 승희" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
          description
        }
      }
    }
  }
`;

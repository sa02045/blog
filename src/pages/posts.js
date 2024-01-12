import { Link, graphql } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import { Seo } from '../components/seo';

const Posts = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <div className="post-list-wrapper"></div>
    </Layout>
  );
};

export default Posts;

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

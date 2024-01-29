import { graphql } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';

const Posts = ({ data, location }: { data: any; location: any }) => {
  return (
    <Layout location={location}>
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

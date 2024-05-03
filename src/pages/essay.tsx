import { graphql } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import { EssayList } from '../components/EssayList';

const Essay = ({ data, location }: { data: any; location: any }) => {
  const posts = data.allMarkdownRemark.nodes;
  return (
    <Layout location={location}>
      <section className="post-list-wrapper">
        <EssayList posts={posts} />
      </section>
    </Layout>
  );
};

export default Essay;

export const Head = () => <Seo title="개발 블로그" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { fields: { sourceName: { eq: "essay" } } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
        }
      }
    }
  }
`;

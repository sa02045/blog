import { graphql } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import { PostList } from '../components/PostList';

const Home = ({ data, location }: { data: any; location: any }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location}>
      <section className="post-list-wrapper">
        <PostList posts={posts} />
      </section>
    </Layout>
  );
};

export default Home;

export const Head = () => <Seo title="개발 블로그" />;

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
          image {
            childImageSharp {
              gatsbyImageData(width: 800, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`;

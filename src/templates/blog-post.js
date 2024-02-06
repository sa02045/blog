import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import { getImage } from 'gatsby-plugin-image';
import PageNavigation from '../components/PageNavigation';
const BlogPostTemplate = ({ data: { previous, next, site, markdownRemark: post }, location }) => {
  return (
    <Layout location={location}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <article className="article" itemScope itemType="http://schema.org/Article">
            <header>
              <h1 itemProp="headline">{post.frontmatter.title}</h1>
              <p>
                {new Date(post.frontmatter.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
            <hr />
            <footer></footer>
          </article>
          <PageNavigation previous={previous} next={next} />
        </div>
      </div>
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post } }) => {
  const thumbnailURL = getImage(post.frontmatter.image)?.images?.fallback?.src || '';
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      thumbnailURL={thumbnailURL}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      tableOfContents
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 800, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

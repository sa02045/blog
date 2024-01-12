import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const BlogPostTemplate = ({ data: { previous, next, site, markdownRemark: post }, location }) => {
  const siteTitle = site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
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
          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
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

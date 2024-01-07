import { Link, graphql } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <section className="post-list-wrapper">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug;
          return (
            <Link to={post.fields.slug} itemProp="url" key={post.fields.slug}>
              <div className="post-list">
                <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                  <div className="post-list-item-content">
                    <header>
                      <h2 className="post-title">{title}</h2>
                    </header>
                    <section>
                      <p className="post-list-item-description">{post.frontmatter.description}</p>
                    </section>
                    <span className="post-list-item-date">{post.frontmatter.date}</span>
                  </div>
                </article>
              </div>
            </Link>
          );
        })}
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
        }
      }
    }
  }
`;

import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import { getImage } from 'gatsby-plugin-image';
import Utterances from '../components/Utterances';

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

const BlogPostTemplate = ({ data: { site, markdownRemark: post }, location }) => {
  const dateText = new Date(post.frontmatter.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout location={location}>
      <article className="flex flex-col" itemScope itemType="http://schema.org/Article">
        <div className="mb-10">
          <h1 className="text-3xl">{post.frontmatter.title}</h1>
          <p className="text-sm mt-6">{dateText}</p>
        </div>
        <section
          className="article-section"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        ></section>
        <Utterances />
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
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
      }
    }
  }
`;

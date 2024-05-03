import { Link, graphql } from 'gatsby';
import * as React from 'react';
import type { Post } from '../schema';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import { PostList } from '../components/PostList';

const Home = ({ data, location }: { data: any; location: any }) => {
  const posts = data.allMarkdownRemark.nodes as Post[];

  const allTagsCounts: number = posts.reduce((acc, post) => {
    if (post.frontmatter.tags) {
      return acc + post.frontmatter.tags.length;
    }
    return acc;
  }, 0);

  const allTags: { [key: string]: number } = posts.reduce(
    (acc, post) => {
      if (post.frontmatter.tags) {
        post.frontmatter.tags.forEach(tag => {
          acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
        });
      }
      return acc;
    },
    {
      all: allTagsCounts,
    } as { [key: string]: number }
  );

  return (
    <Layout location={location}>
      <section>
        {/* <div className="flex">
          {Object.entries(allTags).map(([tag, count]) => (
            <Link to={`/posts/${tag}`} key={tag} className="text-black">
              <Tag key={tag} tag={tag} count={count} />
            </Link>
          ))}
        </div> */}

        <PostList posts={posts} />
      </section>
    </Layout>
  );
};

function Tag({ tag, count }: { tag: string; count: number }) {
  return (
    <div className="bg-purple-100 rounded-md p-2 text-sm hover:cursor-pointer">
      {tag} {count}
    </div>
  );
}

export default Home;

export const Head = () => <Seo title="개발 블로그" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { fields: { sourceName: { eq: "blog" } } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
          description
          tags
        }
      }
    }
  }
`;

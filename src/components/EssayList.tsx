import React from 'react';
import type { Post as PostType } from '../schema';
import { Link } from 'gatsby';
interface Props {
  posts: PostType[];
}

export const EssayList = ({ posts }: Props) => {
  return (
    <>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug;
        const date = post.frontmatter.date;
        const to = post.fields.slug;
        return (
          <Link to={to} itemProp="url" key={post.frontmatter.title}>
            <article
              className="group pb-10 flex hover:translate-y-3 transition mb-10"
              itemScope
              itemType="http://schema.org/Article"
            >
              <div className="flex-col">
                <h3 className="group-hover:text-violet-400 text-xl">{title}</h3>
                <span className="text-gray-500 text-sm">{date}</span>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
};

import { Post } from './Post';
import React from 'react';
import type { Post as PostType } from '../schema';

interface Props {
  posts: PostType[];
}

export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug;
        const description = post.frontmatter.description;
        const date = post.frontmatter.date;
        const to = post.fields.slug;
        return (
          <Post
            key={post.fields.slug}
            title={title}
            description={description}
            date={date}
            to={to}
            tags={post.frontmatter.tags}
          />
        );
      })}
    </>
  );
};

import { Post } from './Post';
import React from 'react';

interface Post {
  frontmatter: {
    title: string;
    description: string;
    date: string;
  };
  fields: {
    slug: string;
  };
}

interface Props {
  posts: Post[];
}

export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug;
        const description = post.frontmatter.description;
        const date = post.frontmatter.date;
        const to = post.fields.slug;
        return <Post key={post.fields.slug} title={title} description={description} date={date} to={to} />;
      })}
    </>
  );
};

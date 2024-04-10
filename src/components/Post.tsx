import React from 'react';
import { Link } from 'gatsby';

interface Props {
  description: string;
  date: string;
  title: string;
  to: string;
}

export const Post = ({ date, title, description, to }: Props) => {
  return (
    <Link to={to} itemProp="url">
      <article
        className="pb-10 flex hover:translate-y-3 transition flex-col"
        itemScope
        itemType="http://schema.org/Article"
      >
        <h3 className="post-title hover:text-cyan-700">{title}</h3>
        <p className="mt-4 mb-3 text-gray-700">{description}</p>
        <span className="text-gray-500">{date}</span>
      </article>
    </Link>
  );
};

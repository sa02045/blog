import React from 'react';
import { Link } from 'gatsby';

interface Props {
  description: string;
  date: string;
  title: string;
  to: string;
  tags?: string[];
}

export const Post = ({ date, title, description, to, tags }: Props) => {
  return (
    <Link to={to} itemProp="url">
      <article
        className="group pb-10 flex hover:translate-y-3 transition mb-10"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="flex-col">
          <h3 className="text-2xl group-hover:text-violet-400">{title}</h3>
          <p className="mt-6 mb-1 text-gray-600 text-base">{description}</p>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
      </article>
    </Link>
  );
};

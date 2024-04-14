import React from 'react';
import { Link } from 'gatsby';

interface Props {
  description: string;
  date: string;
  title: string;
  to: string;
  thumbnail?: string;
}

export const Post = ({ date, title, description, to, thumbnail }: Props) => {
  return (
    <Link to={to} itemProp="url">
      <article
        className="group pb-10 flex hover:translate-y-3 transition mb-10"
        itemScope
        itemType="http://schema.org/Article"
      >
        {thumbnail && (
          <div>
            <img
              width={100}
              height={100}
              className="object-cover object-center mr-10"
              src={thumbnail}
              alt="thumbnail"
            />
          </div>
        )}

        <div className="flex-col">
          <h3 className="text-3xl group-hover:text-violet-500">{title}</h3>
          <p className="mt-4 mb-3 text-gray-700">{description}</p>
          <span className="text-gray-500">{date}</span>
        </div>
      </article>
    </Link>
  );
};

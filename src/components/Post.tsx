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
      <div className="post-list">
        <article className="post-list-item" itemScope itemType="http://schema.org/Article">
          <div className="post-list-item-content">
            <header>
              <h2 className="post-title">{title}</h2>
            </header>
            <p className="post-list-item-description">{description}</p>
            <span className="post-list-item-date">{date}</span>
          </div>
        </article>
      </div>
    </Link>
  );
};

// TODO: thumbnail image
//         {/* {getImage(post.frontmatter?.image)?.images?.fallback?.src}
//         <GatsbyImage
//           image={getImage(post.frontmatter.image)}
//           alt={post.frontmatter.title}
//           style={{
//             width: 300,
//             height: 100,
//           }}
//         /> */}

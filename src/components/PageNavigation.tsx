import React from 'react';
import { Link } from 'gatsby';
import * as styles from './PageNavigation.module.css';

interface Props {
  previous: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };

  next: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
}

const PageNavigation = ({ previous, next }: Props) => {
  return (
    <nav className={styles.Navigation}>
      <ul>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;

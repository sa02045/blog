import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export const Seo = ({ description, title, children, thumbnailURL }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title || title;
  const siteUrl = site.siteMetadata?.siteUrl || 'https://deluxe-centaur-4a55b0.netlify.app/';
  const defaultThumbnailURL = thumbnailURL || '/images/og-image.png';

  return (
    <>
      <html lang="ko" />
      <title>{defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />

      <meta property="og:image" content={siteUrl + defaultThumbnailURL} />
      <meta name="twitter:image" content={siteUrl + defaultThumbnailURL} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.social?.twitter || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
};

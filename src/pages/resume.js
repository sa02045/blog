import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Seo } from '../components/Seo';

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      About
    </Layout>
  );
};

export const Head = () => <Seo title="404: Not Found" />;

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import GithubLogo from '../images/github.png';

interface Props {
  location: any;
}

const Essay = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <section
        style={{
          marginTop: '60px',
        }}
      ></section>
    </Layout>
  );
};

export default Essay;

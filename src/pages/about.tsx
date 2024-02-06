import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import GithubLogo from '../images/github.png';

interface Props {
  location: any;
}

const About = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <section
        style={{
          marginTop: '60px',
        }}
      >
        <h2>Github</h2>
        <Link to="https://github.com/sa02045">
          <img src={GithubLogo} width={50} height={50} alt="github logo" />
        </Link>
      </section>
    </Layout>
  );
};

export default About;

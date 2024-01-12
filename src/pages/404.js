import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
const NotFoundPage = () => {
  useEffect(() => {
    navigate('/');
  }, []);

  return <div></div>;
};

export default NotFoundPage;

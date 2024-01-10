import React from 'react';

const TableOfContents = ({ content }) => {
  return <div className="table-of-content" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default TableOfContents;

import React, { useEffect, useRef } from 'react';
export default function Utterances() {
  const commentsEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.async = true;
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.setAttribute('repo', 'sa02045/blog');
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    commentsEl.current?.appendChild(scriptEl);
  }, []);

  return (
    <>
      <div>
        <div ref={commentsEl}></div>
      </div>
    </>
  );
}

export interface Post {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags?: string[];
  };
  fields: {
    slug: string;
  };
}

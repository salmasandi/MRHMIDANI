export interface Author {
  name: { $t: string };
  email: { $t: string };
  gd$image: { src: string };
}

export interface Link {
  rel: string;
  type: string;
  href: string;
}

export interface Entry {
  id: { $t: string };
  published: { $t: string };
  updated: { $t: string };
  title: { $t: string };
  content: { $t: string };
  link: Link[];
  author: Author[];
  media$thumbnail?: { url: string };
  category?: { term: string }[];
}

export interface FeedResponse {
  feed: {
    entry: Entry[];
    title: { $t: string };
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
  thumbnail: string;
  author: string;
  categories: string[];
}
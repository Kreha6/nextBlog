type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

type PostsData = {
  posts: Post[];
  categories: Category[];
};

type SearchParamsType = { [key: string]: string | null };

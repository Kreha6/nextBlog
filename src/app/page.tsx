import Link from "next/link";

import PaginationComponent from "@/components/Pagination";

import myJson from "./api/dataSource.json" assert { type: "json" };
import FilteringComponent from "@/components/Filtering";
import { getFilteredPosts } from "@/utils/helpers";

function fetchAllData(searchParams: SearchParamsType) {
  const { posts, postsCount } = getFilteredPosts(myJson, searchParams);
  return {
    categories: myJson.categories,
    posts,
    postsCount,
  };
}

export default function Blog({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const { posts, categories, postsCount } = fetchAllData(searchParams);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="justify-center">blog</h1>
      <FilteringComponent categories={categories} />
      <section className="grid grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div style={{ width: 200, height: 150 }}>{post.title}</div>
          </Link>
        ))}
      </section>
      <PaginationComponent postsCount={postsCount} />
    </main>
  );
}

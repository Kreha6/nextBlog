import { getFilteredPosts } from "@/utils/helpers";
import myJson from "../../api/dataSource.json" assert { type: "json" };

function fetchPost(params: { id: string }) {
  const post = myJson.posts.find((p) => p.id === +params.id);
  return post ?? null;
}

export async function generateStaticParams() {
  const { posts } = getFilteredPosts(myJson);

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default function Post({ params }: { params: { id: string } }) {
  const post = fetchPost(params);
  console.log("post", post);
  if (!post) {
    return <p>sorry this post doesn&apos;t exist</p>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="justify-center">{post.title}</h1>
    </main>
  );
}

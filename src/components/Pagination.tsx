"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { PAGE_QUERY, POSTS_PER_PAGE } from "@/utils/constants";
import { getUpdatedRoute } from "@/utils/helpers";

export default function PaginationComponent({
  postsCount,
}: {
  postsCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || 1;

  const pages = Math.ceil(postsCount / POSTS_PER_PAGE);
  const isFirstPage = +pageParam === 1;
  const isLastPage = +pageParam === pages;

  const hangePageChange = (change: number) => {
    const newRoute = getUpdatedRoute((key: string) => searchParams.get(key), {
      key: PAGE_QUERY,
      value: `${+pageParam + change}`,
    });

    router.push(newRoute, undefined);
  };

  return (
    <section className="flex justify-center gap-20">
      <button
        disabled={isFirstPage}
        onClick={() => {
          hangePageChange(-1);
        }}
        className={`border-solid border-2 rounded-md p-1 border-${
          isFirstPage ? "grey-50" : "indigo-600"
        } cursor-${isFirstPage ? "default" : "pointer"}`}
      >
        Previous page
      </button>
      <button
        disabled={isLastPage}
        onClick={() => {
          hangePageChange(1);
        }}
        className={`border-solid border-2 rounded-md p-1 border-${
          isLastPage ? "grey-50" : "indigo-600"
        } cursor-${isLastPage ? "default" : "pointer"}`}
      >
        Next page
      </button>
    </section>
  );
}

import {
  CATEGORIES_QUERY,
  PAGE_QUERY,
  POSTS_PER_PAGE,
  QUERY_PARAMS,
  SEARCH_QUERY,
} from "./constants";

export const getUpdatedRoute = (
  paramGetter: (key: string) => string | null,
  paramToUpdate: { key: string; value: string | number }
): string => {
  let newRoute = "/?";
  QUERY_PARAMS.forEach((param) => {
    if (param === paramToUpdate.key) {
      newRoute = `${newRoute}${newRoute.length > 2 ? "&" : ""}${param}=${
        paramToUpdate.value
      }`;
    } else {
      const currentParamValue = paramGetter(param);
      if (currentParamValue) {
        newRoute = `${newRoute}${
          newRoute.length > 2 ? "&" : ""
        }${param}=${currentParamValue}`;
      }
    }
  });
  return newRoute;
};

export const getSearchParams = (
  urlSearchParams: URLSearchParams
): SearchParamsType => ({
  [PAGE_QUERY]: urlSearchParams.get(PAGE_QUERY),
  [CATEGORIES_QUERY]: urlSearchParams.get(CATEGORIES_QUERY),
  [SEARCH_QUERY]: urlSearchParams.get(SEARCH_QUERY),
});

export const getFilteredPosts = (
  data: PostsData,
  searchParams?: SearchParamsType
): { posts: Post[]; postsCount: number } => {
  const page = searchParams?.[PAGE_QUERY] || 1;
  const categories = searchParams?.[CATEGORIES_QUERY]
    ? searchParams[CATEGORIES_QUERY].split(",").map((c: string) => +c)
    : [];
  const searchTerm = searchParams?.[SEARCH_QUERY] ?? "";

  const startIndex = (+page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const filteredPosts = data.posts.filter(
    (post) =>
      (!categories.length ||
        post.categories.some((category) => categories.includes(category))) &&
      (!searchTerm.length || post.title.includes(searchTerm))
  );

  return {
    postsCount: filteredPosts.length,
    posts: filteredPosts.slice(startIndex, endIndex),
  };
};

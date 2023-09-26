"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";

import { getUpdatedRoute } from "@/utils/helpers";
import { CATEGORIES_QUERY, SEARCH_QUERY } from "@/utils/constants";

export default function FilteringComponent({
  categories,
}: {
  categories: Category[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoriesParam = searchParams.get("categories");
  const searchParam = searchParams.get("search");

  useEffect(() => {
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParam]);

  useEffect(() => {
    if (!!categoriesParam) {
      const { newCategories, shouldUpdate } = categoriesParam.split(",").reduce(
        (
          result: {
            newCategories: { [key: number]: boolean };
            shouldUpdate: boolean;
          },
          category: string
        ) => {
          result.newCategories[+category] = true;
          if (!selectedCategories[+category]) {
            result.shouldUpdate = true;
          }
          return result;
        },
        { newCategories: {}, shouldUpdate: false }
      );

      if (shouldUpdate) {
        setSelectedCategories(newCategories);
      }
    }
  }, [categoriesParam]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setSearchTerm(newValue);

    const newRoute = getUpdatedRoute((key: string) => searchParams.get(key), {
      key: SEARCH_QUERY,
      value: newValue,
    });

    router.push(newRoute, undefined);
  };

  const handleToggleCategory = (id: number): void => {
    const newCategories = {
      ...selectedCategories,
      [id]:
        typeof selectedCategories[id] !== "undefined"
          ? !selectedCategories[id]
          : true,
    };
    setSelectedCategories(newCategories);
    const newCategoriesParam = Object.keys(newCategories)
      .filter((cat) => newCategories[+cat])
      .join(",");

    const newRoute = getUpdatedRoute((key: string) => searchParams.get(key), {
      key: CATEGORIES_QUERY,
      value: newCategoriesParam,
    });

    router.push(newRoute, undefined);
  };

  return (
    <section>
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <div className="flex flex-row items-center w-full gap-6">
        {categories?.map(({ id, name, slug }) => (
          <li key={id} className="list-none">
            <span className="pr-2">{name}</span>
            <input
              type="checkbox"
              checked={selectedCategories[id] ?? false}
              onChange={() => {
                handleToggleCategory(id);
              }}
            />
          </li>
        ))}
      </div>
    </section>
  );
}

import myJson from "../dataSource.json" assert { type: "json" };
import { NextResponse, NextRequest } from "next/server";
import { getFilteredPosts, getSearchParams } from "@/utils/helpers";

export async function GET(req: NextRequest) {
  const { posts } = getFilteredPosts(
    myJson,
    getSearchParams(req.nextUrl.searchParams)
  );

  return NextResponse.json(posts);
}

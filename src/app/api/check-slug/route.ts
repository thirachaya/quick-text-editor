import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/typeorm";
import { Post } from "@/entities/post.entity";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ available: false });
  }

  const ds = await getDataSource();
  const repo = ds.getRepository(Post);

  const existing = await repo.findOne({
    where: { slug },
  });

  return NextResponse.json({
    available: !existing,
  });
}
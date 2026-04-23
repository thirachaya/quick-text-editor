import { getDataSource } from "@/lib/typeorm";
import { Post } from "@/entities/post.entity";
import { notFound } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const ds = await getDataSource();
  const post = await ds.getRepository(Post).findOne({ where: { slug } });
  if (!post) return notFound();

  const date = new Date(post.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-gray-700">
      {/* Hero */}
      <div className="bg-gray-100 border-b border-gray-200 py-5 px-5">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center gap-2 text-md text-gray-500">
            <Link href="/" className="hover:text-emerald-600 transition">
              Home
            </Link>

            <span>/</span>

            <Link href="/news" className="hover:text-emerald-600 transition">
              Post List
            </Link>

            <span>/</span>

            <span className="text-emerald-700 font-medium truncate">
              {post.title}
            </span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto text-center py-10">
          <span className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-[#2FA084]/10 text-[#2FA084] rounded-full border border-[#2FA084]/20">
            Latest Update
          </span>

          <h1 className="mt-4 mb-6 text-[clamp(32px,5vw,52px)] font-extrabold leading-tight tracking-tight text-emerald-800">
            {post.title}
          </h1>

          <p className="text-sm text-gray-500 font-medium">
            Published on {date} by Blew Noxs
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-5 py-14">
        <article
          className="
                        prose prose-lg max-w-none

                        /* Text */
                        prose-p:text-gray-700

                        /* Headings */
                        prose-headings:text-emerald-800

                        /* Links */
                        prose-a:text-emerald-500 
                        hover:prose-a:text-emerald-700
                        prose-a:no-underline
                        prose-a:border-b prose-a:border-emerald-300

                        /* Images */
                        prose-img:rounded-xl 
                        prose-img:shadow-md 
                        prose-img:border 
                        prose-img:border-gray-200

                        /* Lists */
                        prose-li:marker:text-emerald-500

                        /* Blockquote */
                        prose-blockquote:border-l-4 
                        prose-blockquote:border-emerald-500
                        prose-blockquote:bg-emerald-50
                        prose-blockquote:text-emerald-800
                        prose-blockquote:italic
                        prose-blockquote:px-5
                        prose-blockquote:py-3
                        prose-blockquote:rounded-r-lg

                        /* Inline code */
                        prose-code:bg-gray-100
                        prose-code:text-emerald-800
                        prose-code:px-1.5
                        prose-code:py-0.5
                        prose-code:rounded

                        /* Code block */
                        prose-pre:bg-gray-800
                        prose-pre:text-gray-100
                        prose-pre:rounded-lg
                        prose-pre:p-5
                    "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
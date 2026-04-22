import { getDataSource } from '@/lib/typeorm'
import { Post } from '@/entities/post.entity'
import Link from 'next/link'

export default async function NewsPage() {
    const ds = await getDataSource()
    const posts = await ds.getRepository(Post).find({
        order: { createdAt: 'DESC' }
    })

    return (
        <div className="min-h-screen bg-[#EEEEEE] py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="mb-12 border-l-4 border-[#1F6F5F] pl-6">
                    <h1 className="text-4xl font-extrabold text-[#1F6F5F] tracking-tight">
                        Explore Stories
                    </h1>
                    <p className="mt-2 text-gray-600 text-lg">
                        Read latest news from Blew Noxs
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/news/${post.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col"
                            >
                                <div className="h-48 bg-[#2FA084]/10 flex items-center justify-center group-hover:bg-[#2FA084]/20 transition-colors">
                                    <span className="text-[#2FA084] text-4xl opacity-50 font-bold">
                                        {post.title.charAt(0)}
                                    </span>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2FA084] mb-2">
                                        {new Date(post.createdAt).toLocaleDateString('en-GB', {
                                            year: 'numeric', month: 'short', day: 'numeric'
                                        })}
                                    </span>
                                    <h2 className="text-xl font-bold text-[#1F6F5F] mb-3 line-clamp-2 group-hover:text-[#2FA084] transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                        {post.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                                    </p>

                                    <div className="flex items-center text-[#1F6F5F] font-semibold text-sm group-hover:gap-2 transition-all">
                                        Read More
                                        <span className="ml-1">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 text-lg">No content found</p>
                        <Link href="/editor" className="mt-4 inline-block text-[#2FA084] font-medium underline">
                            Start writing first post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
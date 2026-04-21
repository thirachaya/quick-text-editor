import { getDataSource } from '@/lib/typeorm'
import { Post } from '@/entities/post.entity'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
    const ds = await getDataSource()
    const repo = ds.getRepository(Post)

    const post = await repo.findOne({ where: { slug: params.slug } })

    if (!post) return notFound()

    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}
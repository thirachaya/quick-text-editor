import { getDataSource } from '@/lib/typeorm'
import { Post } from '@/entities/post.entity'
import { notFound } from 'next/navigation'

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params

    const ds = await getDataSource()
    const repo = ds.getRepository(Post)

    const post = await repo.findOne({ where: { slug } })

    if (!post) return notFound()

    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}
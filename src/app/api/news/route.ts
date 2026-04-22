import { NextResponse } from 'next/server'
import { getDataSource } from '@/lib/typeorm'
import { Post } from '@/entities/post.entity'

export async function GET() {
    const ds = await getDataSource()
    const repo = ds.getRepository(Post)

    const posts = await repo.find({
        where: { published: true },
        order: { createdAt: 'DESC' },
    })

    return NextResponse.json(posts)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const ds = await getDataSource()
        const repo = ds.getRepository(Post)

        const post = repo.create({
            title: body.title,
            slug: body.slug,
            content: body.content,
            published: true,
        })

        await repo.save(post)

        return NextResponse.json(post)
    } catch (err: any) {
        console.error("SAVE ERROR:", err)

        return NextResponse.json(
            { error: err.message ?? 'unknown error' },
            { status: 500 }
        )
    }
}
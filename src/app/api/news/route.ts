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

        if (!body.title) {
            return NextResponse.json(
                { message: 'Title is required' },
                { status: 400 }
            )
        }

        if (!body.slug) {
            return NextResponse.json(
                { message: 'Slug is required' },
                { status: 400 }
            )
        }

        if (!body.content) {
            return NextResponse.json(
                { message: 'Content is required' },
                { status: 400 }
            )
        }

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

        if (err.code === '23505') { // 23505: error code of postgres for unique constraint violation
            return NextResponse.json(
                { message: 'Slug already exists. Please use another one.' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
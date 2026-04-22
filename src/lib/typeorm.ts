import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Post } from '@/entities/post.entity'

let AppDataSource: DataSource

export const getDataSource = async () => {
    if (AppDataSource?.isInitialized) {
        return AppDataSource
    }

    const ds = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Post],
        synchronize: false,
        logging: true,
        ssl: {
            rejectUnauthorized: false,
        },
    })

    AppDataSource = await ds.initialize()
    return AppDataSource
}
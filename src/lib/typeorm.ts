import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Post } from '@/entities/post.entity'

let AppDataSource: DataSource

export const getDataSource = async () => {
    if (AppDataSource && AppDataSource.isInitialized) {
        return AppDataSource
    }

    AppDataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Post],
        synchronize: true,
        logging: true,
    })

    return AppDataSource.initialize()
}
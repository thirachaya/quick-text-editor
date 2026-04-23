import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Post } from '@/entities/post.entity'

let AppDataSource: DataSource
let initializingPromise: Promise<DataSource> | null = null

export const getDataSource = async () => {
    if (AppDataSource && AppDataSource.isInitialized) {
        return AppDataSource
    }

    if (initializingPromise) {
        return initializingPromise
    }

    AppDataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Post],
        synchronize: true,
        logging: true,
    })

    initializingPromise = AppDataSource.initialize().finally(() => {
        initializingPromise = null
    })

    return initializingPromise
}
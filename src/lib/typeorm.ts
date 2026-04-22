import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Post } from '@/entities/post.entity'

let AppDataSource: DataSource | null = null

export const getDataSource = async (): Promise<DataSource> => {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set')
    }

    // Reuse existing connection if still alive
    if (AppDataSource?.isInitialized) {
        try {
            // Ping the DB to confirm the connection is alive
            await AppDataSource.query('SELECT 1')
            return AppDataSource
        } catch {
            // Connection is dead — reinitialize below
            AppDataSource = null
        }
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
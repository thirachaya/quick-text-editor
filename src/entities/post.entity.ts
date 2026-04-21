import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    title!: string

    @Column({ unique: true })
    slug!: string

    @Column('text')
    content!: string

    @Column({ default: false })
    published!: boolean

    @Column({ default: 0 })
    viewCount!: number

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
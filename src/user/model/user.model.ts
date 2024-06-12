import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm'
import { Task } from 'src/task/model/task.model'

interface UserCreationAttrs {
    nickname: string
    tasks: Task[]
    login: string
    password: string
    tg_id: number
}
@Entity()
export class User implements UserCreationAttrs {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', unique: true, nullable: false })
    nickname: string

    @Column({ type: 'varchar', nullable: false })
    login: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @Column({ type: 'bigint', nullable: false })
    tg_id: number

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]
}

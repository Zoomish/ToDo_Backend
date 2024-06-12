import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Task } from 'src/task/model/task.model'

interface UserCreationAttrs {
    nickname: string
    tasks: Task[]
    login: string
    password: string
    tg_id: number
}
@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column({ type: DataType.STRING(4048), unique: true, allowNull: false })
    nickname: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    login: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    password: string

    @Column({ type: DataType.BIGINT, allowNull: true })
    tg_id: number

    @HasMany(() => Task)
    tasks: Task[]
}

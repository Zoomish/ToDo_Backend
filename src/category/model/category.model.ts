import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript'
import { Task } from 'src/task/model/task.model'
import { User } from 'src/user/model/user.model'

interface ProjectCreationAttrs {
    title: string
    description: string
    userId: number
    taskId: number
}
@Table({ tableName: 'category' })
export class Category extends Model<Category, ProjectCreationAttrs> {
    @Column({
        type: DataType.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column({ type: DataType.STRING(4048), allowNull: false })
    title: string

    @Column({ type: DataType.STRING(4048), allowNull: true })
    description: string

    @ForeignKey(() => Task)
    @Column({ type: DataType.INTEGER })
    taskId: number

    @HasMany(() => Task)
    task: Task

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User
}

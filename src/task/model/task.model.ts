import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { User } from 'src/user/model/user.model'

interface ProjectCreationAttrs {
    title: string
    description: string
    image: string
    tags: string
    progress: string
    time: Date
    notification: Date
    userId: number
}

enum Progress {
    Done = 'Выполнено',
    InProgress = 'В процессе',
    NotStarted = 'Не начато',
    Deferred = 'Приостановлено',
    Overdue = 'Просрочено',
}
@Table({ tableName: 'task' })
export class Task extends Model<Task, ProjectCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column({ type: DataType.STRING(4048), unique: true, allowNull: false })
    title: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    description: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    image: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    tags: string

    @Column({
        type: DataType.STRING(4048),
        allowNull: false,
        defaultValue: Progress['NotStarted'],
    })
    progress: Progress

    @Column({ type: DataType.DATE, allowNull: true })
    time: Date

    @Column({ type: DataType.DATE, allowNull: true })
    notification: Date

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User
}

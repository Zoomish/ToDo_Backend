import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Category } from 'src/category/model/category.model'
import { User } from 'src/user/model/user.model'

interface ProjectCreationAttrs {
    title: string
    description: string
    image: string
    tags: string
    progress: string
    time: Date
    notification: Date
    pereodic: Array<number>
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

    @Column({ type: DataType.STRING(4048), allowNull: true })
    image: string

    @Column({ type: DataType.STRING(4048), allowNull: true })
    tags: string

    @Column({
        type: DataType.STRING(4048),
        allowNull: false,
        defaultValue: Object.keys(Progress).filter(
            (k) => Progress[k] === 'Не начато'
        )[0],
    })
    progress: keyof typeof Progress

    @Column({ type: DataType.DATE, allowNull: true })
    time: Date

    @Column({ type: DataType.DATE, allowNull: true })
    notification: Date

    @Column({ type: DataType.ARRAY(DataType.SMALLINT), allowNull: true })
    pereodic: Array<number>

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number

    @BelongsTo(() => Category)
    category: Category
}

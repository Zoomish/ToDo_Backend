import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { User } from 'src/user/model/user.model'

interface UserCreationAttrs {
    title: string
    image: string
    userId: number
}
@Table({ tableName: 'skill' })
export class Skill extends Model<Skill, UserCreationAttrs> {
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
    image: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User
}

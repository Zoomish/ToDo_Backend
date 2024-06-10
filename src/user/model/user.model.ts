import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Project } from 'src/projects/model/project.model'
import { Skill } from 'src/skill/model/skill.model'

interface UserCreationAttrs {
    name: string
    email: string
    image: string
    github: string
    expirience: string
    skills: string
    work: string
    portfolio: string
    phone: string
    tg: string
    tg_bot: string
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
    name: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    email: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    image: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    expirience: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    work: string

    @HasMany(() => Skill)
    skills: Skill[]

    @HasMany(() => Project)
    projects: Project[]

    @Column({ type: DataType.STRING(4048), allowNull: false })
    github: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    portfolio: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    phone: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    tg: string

    @Column({ type: DataType.STRING(4048), allowNull: false })
    tg_bot: string
}

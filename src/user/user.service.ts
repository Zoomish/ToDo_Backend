import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcryptjs'
import { User } from './model/user.model'
import { UpdateUserDto } from './dto/update-user.dto copy'

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}
    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        })
    }

    async findAll() {
        return await this.userRepository.findAll({
            include: { all: true },
            attributes: { exclude: ['email', 'password'] },
        })
    }

    async findByPk(id: number) {
        return await this.userRepository.findByPk(id, {
            include: { all: true },
            attributes: { exclude: ['email', 'password'] },
        })
    }

    async findByLogin(email: string) {
        return await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        })
    }

    async findByTg_id(tg_id: number) {
        return await this.userRepository.findOne({
            where: { tg_id },
            include: { all: true },
            attributes: { exclude: ['email', 'password'] },
        })
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.findByPk(id)
        return await Object.assign(user, { ...dto }).save()
    }
}

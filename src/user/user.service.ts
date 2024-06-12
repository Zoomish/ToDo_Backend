import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './model/user.model'
import { UpdateUserDto } from './dto/update-user.dto copy'

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}
    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.create({
            ...createUserDto,
        })
    }

    async findAll() {
        return await this.userRepository.findAll({
            include: { all: true },
        })
    }

    async findByPk(id: number) {
        return await this.userRepository.findByPk(id, {
            include: { all: true },
        })
    }

    async findByTg_id(tg_id: number) {
        return await this.userRepository.findOne({
            where: { tg_id },
            include: { all: true },
        })
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.findByPk(id)
        user.nickname = dto.nickname ? dto.nickname : user.nickname
        user.email = dto.email ? dto.email : user.email
        user.password = dto.password ? dto.password : user.password
        return await user.save()
    }
}

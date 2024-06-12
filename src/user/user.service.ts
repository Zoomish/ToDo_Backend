import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './model/user.model'

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}
    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.create({
            ...createUserDto,
        })
    }

    async findAll() {
        return await this.userRepository.findOne({
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

    update(id: number) {
        return `This action updates a #id user`
    }

    remove(id: number) {
        return `This action removes a #id user`
    }
}

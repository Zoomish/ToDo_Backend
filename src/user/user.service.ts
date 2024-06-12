import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './model/user.model'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}
    async create(createUserDto: CreateUserDto) {
        const project = this.userRepository.create(createUserDto)
        return await await this.userRepository.save(project)
    }

    async findAll() {
        return await this.userRepository.find()
    }

    findOne(id: number) {
        return `This action returns a #id user`
    }

    update(id: number) {
        return `This action updates a #id user`
    }

    remove(id: number) {
        return `This action removes a #id user`
    }
}

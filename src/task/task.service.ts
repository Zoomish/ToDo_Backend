import { Injectable } from '@nestjs/common'
import { Task } from './model/task.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateTaskDto } from './dto/create-task.dto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task) private projectRepository: typeof Task,
        private userService: UserService
    ) {}
    async findAll() {
        return await this.projectRepository.findAll()
    }

    async create(dto: CreateTaskDto) {
        const user = await this.userService.findByPk(dto.user_id)
        return await this.projectRepository.create({
            ...dto,
            userId: user.id,
        })
    }

    async findOne(id: number) {
        return await this.projectRepository.findByPk(id)
    }

    update(id: number) {
        return `This action updates a #id projects-service`
    }

    remove(id: number) {
        return `This action removes a #id projects-service`
    }
}

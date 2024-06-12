import { Injectable } from '@nestjs/common'
import { Task } from './model/task.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateTaskDto } from './dto/create-task.dto'
import { UserService } from 'src/user/user.service'
import { UpdateTaskDto } from './dto/update-task.dto'

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

    async update(id: number, dto: UpdateTaskDto) {
        const task = await this.findOne(id)
        return await Object.assign(task, { ...dto }).save()
    }

    async remove(id: number) {
        const task = await this.projectRepository.findByPk(id)
        return await task.destroy()
    }
}

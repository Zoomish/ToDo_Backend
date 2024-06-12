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
        task.title = dto.title ? dto.title : task.title
        task.description = dto.description ? dto.description : task.description
        task.tags = dto.tags ? dto.tags : task.tags
        task.image = dto.image ? dto.image : task.image
        task.time = dto.time ? dto.time : task.time
        task.notification = dto.notification
            ? dto.notification
            : task.notification
        return await task.save()
    }

    async remove(id: number) {
        const task = await this.projectRepository.findByPk(id)
        return await task.destroy()
    }
}

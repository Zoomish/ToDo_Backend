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
    async findByUserId(id: number) {
        const user = await this.userService.findByPk(id)
        return user.tasks
    }

    async findByUserTgId(id: number) {
        const user = await this.userService.findByTg_id(id)
        if (!user) {
            return
        }
        return user.tasks
    }

    async create(dto: CreateTaskDto) {
        const user = await this.userService.findByPk(dto.user_id)
        return await this.projectRepository.create({
            ...dto,
            userId: user.id,
        })
    }

    async findOne(id: number, taskid: number) {
        const tasks = await this.findByUserId(id)
        return await tasks.find((task) => task.id === taskid)
    }

    async update(id: number, taskid: number, dto: UpdateTaskDto) {
        const task = await this.findOne(id, taskid)
        return await Object.assign(task, { ...dto }).save()
    }

    async remove(id: number, taskid: number) {
        const task = await this.findOne(id, taskid)
        return await task.destroy()
    }
}

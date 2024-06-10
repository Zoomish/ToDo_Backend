import { Injectable } from '@nestjs/common'
import { Project } from './model/task.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProjectDto } from './dto/create-task.dto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project) private projectRepository: typeof Project,
        private userService: UserService
    ) {}
    async findAll() {
        return await this.projectRepository.findAll()
    }

    async create(dto: CreateProjectDto) {
        const user = await this.userService.findAll()
        const project = await this.projectRepository.create({
            ...dto,
            userId: user.id,
        })
        return project
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

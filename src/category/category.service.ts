import { Injectable } from '@nestjs/common'
import { Category } from './model/category.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateTaskDto } from './dto/create-category.dto'
import { UserService } from 'src/user/user.service'
import { UpdateTaskDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        private userService: UserService
    ) {}
    async findByUserId(id: number) {
        const user = await this.userService.findByPk(id)
        return user.categories
    }

    async findByUserTgId(id: number) {
        const user = await this.userService.findByTg_id(id)
        if (!user) {
            return
        }
        return user.categories
    }

    async create(dto: CreateTaskDto) {
        const user = await this.userService.findByPk(dto.user_id)
        return await this.categoryRepository.create({
            ...dto,
            userId: user.id,
        })
    }

    async findOne(id: number, taskid: number) {
        const categories = await this.findByUserId(id)
        return await categories.find((category) => category.id === taskid)
    }

    async update(id: number, taskid: number, dto: UpdateTaskDto) {
        const category = await this.findOne(id, taskid)
        return await Object.assign(category, { ...dto }).save()
    }

    async remove(id: number, taskid: number) {
        const category = await this.findOne(id, taskid)
        return await category.destroy()
    }
}

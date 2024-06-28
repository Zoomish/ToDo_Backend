import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Category } from './model/category.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModule } from 'src/user/user.module'
import { Task } from 'src/task/model/task.model'

@Module({
    imports: [SequelizeModule.forFeature([Category, Task]), UserModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}

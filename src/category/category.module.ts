import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Category } from './model/category.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/model/user.model'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [SequelizeModule.forFeature([Category, User]), UserModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}

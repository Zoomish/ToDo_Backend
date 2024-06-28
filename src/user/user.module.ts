import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './model/user.model'
import { Task } from 'src/task/model/task.model'
import { Category } from 'src/category/model/category.model'

@Module({
    imports: [SequelizeModule.forFeature([User, Task, Category])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

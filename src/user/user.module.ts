import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './model/user.model'
import { Project } from 'src/projects/model/project.model'

@Module({
    imports: [SequelizeModule.forFeature([User, Project])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

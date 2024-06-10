import { Module } from '@nestjs/common'
import { ProjectsController } from './task.controller'
import { ProjectsService } from './task.service'
import { Project } from './model/task.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/model/user.model'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [SequelizeModule.forFeature([Project, User]), UserModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule {}

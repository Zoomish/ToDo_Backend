import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './model/user.model'
import { Task } from 'src/task/model/task.model'

@Module({
    imports: [TypeOrmModule.forFeature([User, Task])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import {
    GreetingService,
    CallbackService,
    TasksService,
    HelpService,
    WebAppService,
    WebUserService,
    UsersService,
    NotificationService,
} from './services'
import { TaskModule } from 'src/task/task.module'
import { UserModule } from 'src/user/user.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TaskModule, UserModule, AuthModule],
    providers: [
        BotService,
        GreetingService,
        CallbackService,
        UsersService,
        WebAppService,
        WebUserService,
        TasksService,
        HelpService,
        NotificationService,
    ],
    exports: [],
})
export class BotModule {}

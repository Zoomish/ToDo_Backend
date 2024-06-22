import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import {
    GreetingService,
    CallbackService,
    TasksService,
    HelpService,
    DeferredService,
    WebAppService,
    WebUserService,
    UsersService,
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
        DeferredService,
    ],
    exports: [],
})
export class BotModule {}

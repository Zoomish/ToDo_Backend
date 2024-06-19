import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import {
    GreetingService,
    CallbackService,
    ProjectService,
    HelpService,
    DeferredService,
    AgreeTaskService,
} from './services'
import { TaskModule } from 'src/task/task.module'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [TaskModule, UserModule],
    providers: [
        BotService,
        GreetingService,
        CallbackService,
        AgreeTaskService,
        ProjectService,
        HelpService,
        DeferredService,
    ],
    exports: [],
})
export class BotModule {}

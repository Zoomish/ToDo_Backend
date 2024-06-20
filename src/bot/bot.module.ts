import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import {
    GreetingService,
    CallbackService,
    ProjectService,
    HelpService,
    DeferredService,
    WebAppService,
} from './services'
import { TaskModule } from 'src/task/task.module'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [TaskModule, UserModule],
    providers: [
        BotService,
        GreetingService,
        CallbackService,
        WebAppService,
        ProjectService,
        HelpService,
        DeferredService,
    ],
    exports: [],
})
export class BotModule {}

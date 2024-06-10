import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import {
    GreetingService,
    CallbackService,
    ProjectService,
    HelpService,
} from './services'
import { TaskModule } from 'src/projects/task.module'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [TaskModule, UserModule],
    providers: [
        BotService,
        GreetingService,
        CallbackService,
        ProjectService,
        HelpService,
    ],
    exports: [],
})
export class BotModule {}

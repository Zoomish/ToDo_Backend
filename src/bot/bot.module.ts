import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import {
    GreetingService,
    CallbackService,
    ProjectService,
    HelpService,
} from './services'
import { ProjectsModule } from 'src/projects/task.module'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [ProjectsModule, UserModule],
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

import { Injectable } from '@nestjs/common'
import { TasksService } from '../task/task.service'
import { HelpService } from '../help/help.service'
import { UsersService } from '../user/user.service'

@Injectable()
export class CallbackService {
    constructor(
        private readonly taskService: TasksService,
        private readonly helpService: HelpService,
        private readonly userService: UsersService
    ) {}
    async callback(bot, callbackQuery) {
        const action = callbackQuery.data
        const msg = callbackQuery.message
        switch (action) {
            case 'all_commands':
                return await this.helpService.help(bot, msg.chat.id)
            case 'tasks':
                return await this.taskService.getTasks(bot, msg)
            default:
                break
        }
    }
}

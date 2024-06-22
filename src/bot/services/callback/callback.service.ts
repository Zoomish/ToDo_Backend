import { Injectable } from '@nestjs/common'
import { TasksService } from '../task/task.service'
import { DeferredService } from '../calendar/deferred.service'
import { HelpService } from '../help/help.service'
import { UsersService } from '../user/user.service'

@Injectable()
export class CallbackService {
    constructor(
        private readonly taskService: TasksService,
        private readonly helpService: HelpService,
        private readonly userService: UsersService,
        private readonly deferredService: DeferredService
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
        if (action !== 'object') {
            return false
        }
        const calendar = JSON.parse(action)
        if (typeof calendar === 'object' && calendar.type === 'calendar') {
            if (calendar.date === 0) {
                return
            }
            console.log(calendar)
            const date = new Date(calendar.date)
            switch (calendar.action) {
                case null:
                    return console.log(1)
                case 'next-month':
                    return this.deferredService.getPage(
                        date.setMonth(date.getMonth() + 1),
                        msg,
                        bot
                    )
                case 'prev-month':
                    return this.deferredService.getPage(
                        date.setMonth(date.getMonth() - 1),
                        msg,
                        bot
                    )
                case 'select-year':
                    return this.deferredService.getYears(bot, msg)
                case 'set-year':
                    return this.deferredService.getPage(
                        date.setMonth(0),
                        msg,
                        bot
                    )
                default:
                    break
            }
        }
    }
}

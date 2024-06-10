import { Injectable } from '@nestjs/common'
import { ProjectService } from './project.service'
import { DeferredService } from './deferred.service'

@Injectable()
export class CallbackService {
    constructor(
        private readonly projectService: ProjectService,
        private readonly deferredService: DeferredService
    ) {}
    async callback(bot, callbackQuery) {
        const action = callbackQuery.data
        const msg = callbackQuery.message
        switch (action) {
            case 'projects':
                return await this.projectService.getProjects(bot, msg)
            default:
                break
        }
        const calendar = JSON.parse(action)
        if (typeof calendar === 'object' && calendar.type === 'calendar') {
            console.log(calendar)

            switch (calendar.action) {
                case null:
                    return console.log(1)
                case 'next-month':
                    return console.log(2)
                case 'select-year':
                    return this.deferredService.getYears(bot, msg)
                default:
                    break
            }
        }
    }
}

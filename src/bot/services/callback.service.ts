import { Injectable } from '@nestjs/common'
import { ProjectService } from './project.service'

@Injectable()
export class CallbackService {
    constructor(private readonly projectService: ProjectService) {}
    async callback(bot, callbackQuery) {
        const action = callbackQuery.data
        const msg = callbackQuery.message
        switch (action) {
            case 'projects':
                return await this.projectService.getProjects(bot, msg)
            default:
                break
        }
    }
}

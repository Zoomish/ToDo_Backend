import { Injectable } from '@nestjs/common'
import { WebUserService } from './webuser.service'

@Injectable()
export class WebAppService {
    constructor(private readonly webUserService: WebUserService) {}
    async agree(bot, chatId, msg) {
        const data = JSON.parse(msg?.web_app_data?.data)
        const operation = data.operation
        switch (operation) {
            case 'autorization':
                return this.webUserService.addTdIdUser(bot, chatId, msg)
            case 'registration':
                return this.webUserService.addTdIdUser(bot, chatId, msg)
            default:
                break
        }
    }
}

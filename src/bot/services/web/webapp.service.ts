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
                return this.webUserService.addTdIdUser(
                    bot,
                    chatId,
                    data,
                    msg.from.id
                )
            case 'registration':
                return this.webUserService.addTdIdUser(
                    bot,
                    chatId,
                    data,
                    msg.from.id
                )
            default:
                break
        }
    }
}

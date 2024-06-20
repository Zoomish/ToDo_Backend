import { Injectable } from '@nestjs/common'
import { WebUserService } from './webuser.service'

@Injectable()
export class WebAppService {
    constructor(private readonly webUserService: WebUserService) {}
    async agree(bot, chatId, msg) {
        const operation = msg.operation
        console.log(operation)
        switch (operation) {
            case 'autorization':
                return this.webUserService.agree(bot, chatId, msg)
            case 'registration':
                return this.webUserService.agree(bot, chatId, msg)
            default:
                break
        }
    }
}

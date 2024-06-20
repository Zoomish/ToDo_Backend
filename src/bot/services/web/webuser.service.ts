import { Injectable } from '@nestjs/common'
import { UserService } from '../../../user/user.service'

@Injectable()
export class WebUserService {
    constructor(private readonly userService: UserService) {}
    async addTdIdUser(bot, chatId, msg) {
        const operation = msg.operation
        console.log(operation)
        await bot.sendMessage(chatId, JSON.stringify(msg))
    }
}

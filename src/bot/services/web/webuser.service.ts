import { Injectable } from '@nestjs/common'

@Injectable()
export class WebUserService {
    constructor() {}
    async agree(bot, chatId, msg) {
        const operation = msg.operation
        console.log(operation)
        await bot.sendMessage(chatId, JSON.stringify(msg))
    }
}

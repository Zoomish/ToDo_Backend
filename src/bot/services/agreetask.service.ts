import { Injectable } from '@nestjs/common'

@Injectable()
export class AgreeTaskService {
    constructor() {}
    async agree(bot, chatId, msg) {
        console.log(msg)
        await bot.sendMessage(chatId, JSON.stringify(msg))
    }
}

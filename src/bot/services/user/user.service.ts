import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class UsersService {
    constructor(private readonly userService: UserService) {}
    async getUser(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        return 0
    }
}

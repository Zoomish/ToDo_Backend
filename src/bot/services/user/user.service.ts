import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class UsersService {
    constructor(private readonly userService: UserService) {}
    async getUser(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        const user = await this.userService.findByTg_id(msg.chat.id)
        return await bot.sendMessage(
            msg.chat.id,
            `<b>Никнейм</b> ${user.nickname}\n<b>Почта</b> ${user.email}`,
            {
                parse_mode: 'HTML',
                protect_content: true,
            }
        )
    }
}

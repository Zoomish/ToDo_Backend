import { Injectable } from '@nestjs/common'
import { UserService } from '../../../user/user.service'

@Injectable()
export class WebUserService {
    constructor(private readonly userService: UserService) {}
    async addTdIdUser(bot, chatId, data, userTgId) {
        const user = await this.userService.findByLogin(data.email)
        if (user.tg_id === null) {
            user.tg_id = userTgId
            user.save()
        }
        await bot.sendMessage(chatId, `Вы успешно зарегистрировались!`)
        await bot.sendMessage(chatId, JSON.stringify(user))
    }
}

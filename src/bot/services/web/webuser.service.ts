import { Injectable } from '@nestjs/common'
import { UserService } from '../../../user/user.service'

@Injectable()
export class WebUserService {
    constructor(private readonly userService: UserService) {}
    async addTdIdUser(bot, chatId, email, userTgId) {
        const user = await this.userService.findByLogin(email)
        if (user.tg_id === null) {
            user.tg_id = userTgId
            user.save()
            await bot.sendMessage(
                chatId,
                `Вы успешно привязали телеграм к аккаунту`
            )
        }
        return await bot.sendMessage(chatId, `Вы успешно вошли в аккаунт!`)
    }
}

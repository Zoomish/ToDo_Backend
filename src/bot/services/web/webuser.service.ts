import { Injectable } from '@nestjs/common'
import { UserService } from '../../../user/user.service'

@Injectable()
export class WebUserService {
    constructor(private readonly userService: UserService) {}
    private async addTdIdUser(bot, chatId, email, userTgId) {
        const user = await this.userService.findByLogin(email)
        if (user.tg_id === null) {
            user.tg_id = userTgId
            user.save()
            return await bot.sendMessage(
                chatId,
                `Вы успешно привязали телеграм к аккаунту`
            )
        }
    }
    async signIn(bot, chatId, email, userTgId) {
        await bot.sendMessage(chatId, `Вы успешно вошли в аккаунт!`, {
            reply_markup: {
                hide_keyboard: true,
            },
        })
        return await this.addTdIdUser(bot, chatId, email, userTgId)
    }
    async signUp(bot, chatId, email, userTgId) {
        await bot.sendMessage(chatId, `Вы успешно создали аккаунт!`, {
            reply_markup: {
                hide_keyboard: true,
            },
        })
        return await this.addTdIdUser(bot, chatId, email, userTgId)
    }
}

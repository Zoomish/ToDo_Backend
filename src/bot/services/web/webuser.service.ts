import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class WebUserService {
    constructor(private readonly authService: AuthService) {}
    private async addTdIdUser(bot, chatId, user, userTgId) {
        if (user.tg_id === null) {
            user.tg_id = userTgId
            user.save()
            return await bot.sendMessage(
                chatId,
                `Вы успешно привязали телеграм к аккаунту`
            )
        }
    }
    async signIn(bot, chatId, data, userTgId) {
        const user = await this.authService.login(data)
        await bot.sendMessage(chatId, `Вы успешно вошли в аккаунт!`, {
            reply_markup: {
                hide_keyboard: true,
            },
        })
        return await this.addTdIdUser(bot, chatId, user, userTgId)
    }
    async signUp(bot, chatId, data, userTgId) {
        const user = await this.authService.register(data)
        await bot.sendMessage(chatId, `Вы успешно создали аккаунт!`, {
            reply_markup: {
                hide_keyboard: true,
            },
        })
        return await this.addTdIdUser(bot, chatId, user, userTgId)
    }
}

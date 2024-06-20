import { Injectable } from '@nestjs/common'
import { UserService } from '../../../user/user.service'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class WebUserService {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}
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
    async signIn(bot, chatId, data, userTgId) {
        const token = await this.authService.login(data)
        if (!token) {
            return await bot.sendMessage(
                chatId,
                `Неправильная почта или пароль`
            )
        }
        await bot.sendMessage(chatId, `Вы успешно вошли в аккаунт!`, {
            reply_markup: {
                hide_keyboard: true,
            },
        })
        return await this.addTdIdUser(bot, chatId, data.email, userTgId)
    }
    async signUp(bot, chatId, data, userTgId) {
        await this.authService.register(data)
        return await this.signIn(bot, chatId, data, userTgId)
    }
}

import { Injectable } from '@nestjs/common'
import { UserService } from '../../../user/user.service'
import { AuthService } from 'src/auth/auth.service'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const schedule = require('node-schedule')

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
            return await bot.sendMessage(chatId, `Некоректные данные`)
        }
        await bot.sendMessage(chatId, `Вы успешно вошли в аккаунт!`, {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Все мои задачи',
                            web_app: {
                                url: process.env.URL + '/tasks',
                            },
                        },
                        {
                            text: 'Добавить задачу',
                            web_app: {
                                url: process.env.URL + '/add/task',
                            },
                        },
                    ],
                    [
                        {
                            text: 'Изменить мой профиль',
                            web_app: {
                                url: process.env.URL + '/change',
                            },
                        },
                        {
                            text: 'Показать мой профиль',
                            web_app: {
                                url: process.env.URL + '/me',
                            },
                        },
                    ],
                ],
            },
        })
        await this.addTdIdUser(bot, chatId, data.email, userTgId)
        schedule.scheduleJob(+new Date() + 1000 * 60, async () => {
            await this.badToken(bot, chatId)
        })
        return await bot.sendMessage(
            chatId,
            `Отлично! Теперь можно начинать работу`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Что я могу делать?',
                                callback_data: 'all_commands',
                            },
                        ],
                    ],
                },
            }
        )
    }
    async signUp(bot, chatId, data, userTgId) {
        await this.authService.register(data)
        return await this.signIn(bot, chatId, data, userTgId)
    }

    async badToken(bot, chatId) {
        const message = await bot.sendMessage(
            chatId,
            `К сожалению, срок действия авторизации истек. Пожалуйста, войдите в аккаунт снова.`,
            {
                reply_markup: JSON.stringify({
                    keyboard: [
                        [
                            {
                                text: 'Войти в аккаунт',
                                web_app: {
                                    url:
                                        process.env.URL + '/admin/autorization',
                                },
                            },
                        ],
                    ],
                }),
            }
        )
        const batchSize = 80
        const result = []
        let currentNumber = message.message_id - 1
        while (currentNumber >= 1) {
            const batch = Array.from(
                { length: batchSize },
                (_, index) => currentNumber - index
            )
            result.push(batch)
            currentNumber -= batchSize
        }
        for (let i = 0; i < result.length; i++) {
            try {
                await bot.deleteMessages(chatId, result[i])
            } catch (error) {}
        }
    }
}

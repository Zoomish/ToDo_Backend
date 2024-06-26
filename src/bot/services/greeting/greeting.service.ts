import { Injectable } from '@nestjs/common'

@Injectable()
export class GreetingService {
    constructor() {}
    async greeting(bot, chatId, msg) {
        await bot.sendMessage(
            chatId,
            `Здравствуйте, ${msg?.chat?.first_name}! Это мой бот(@Zoomish). Он был написан для вашего удобства в планировании своих дел\n\n/help - для просмотра команд`,
            {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [
                            {
                                text: 'Информация обо мне',
                                callback_data: 'about',
                            },
                        ],
                    ],
                }),
            }
        )
        await bot.sendMessage(
            chatId,
            `Для начала, зарегистрируйтесь или войдите в уже существующий аккаунт`,
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
                        [
                            {
                                text: 'Зарегестрироваться',
                                web_app: {
                                    url:
                                        process.env.URL + '/admin/registration',
                                },
                            },
                        ],
                    ],
                }),
            }
        )
    }
}

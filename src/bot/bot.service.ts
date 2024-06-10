import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import telegram = require('node-telegram-bot-api')
import {
    CallbackService,
    GreetingService,
    ProjectService,
    HelpService,
    DeferredService,
} from './services'

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly callbackService: CallbackService,
        private readonly projectService: ProjectService,
        private readonly configService: ConfigService,
        private readonly helpService: HelpService,
        private readonly greetingService: GreetingService,
        private readonly deferredService: DeferredService
    ) {}

    async onModuleInit() {
        const telegramToken = this.configService.get('telegram.token')
        const bot = new telegram(telegramToken, {
            polling: true,
        })
        await this.initBot(bot)
    }

    async initBot(bot) {
        bot.on('message', async (msg) => {
            const chatId = msg.chat.id
            const text = msg.text
            console.log(msg)

            switch (text) {
                case '/start':
                    return this.greetingService.greeting(bot, chatId, msg)
                case '/projects':
                    return await this.projectService.getProjects(bot, msg)
                case '/help':
                    return this.helpService.help(bot, chatId)
                default:
                    break
            }
        })
        bot.onText(/\/send/, (msg) => {
            this.deferredService.sendTime(1, msg, 'текст', bot)
        })
        bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(bot, callbackQuery)
        })
    }
}

import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import schedule = require('node-schedule')
import telegram = require('node-telegram-bot-api')
import {
    CallbackService,
    GreetingService,
    ProjectService,
    HelpService,
} from './services'

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly callbackService: CallbackService,
        private readonly projectService: ProjectService,
        private readonly configService: ConfigService,
        private readonly helpService: HelpService,
        private readonly greetingService: GreetingService
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
            this.sendTime(1, msg, 'текст', bot)
        })
        bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(bot, callbackQuery)
        })
    }
    async sendTime(time, msg, text, bot) {
        const date = +new Date() + time * 1000
        console.log(date)

        new schedule.scheduleJob(date, function () {
            bot.sendMessage(msg.chat.id, text)
        })
    }
}

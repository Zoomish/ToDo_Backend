import { Injectable } from '@nestjs/common'
import schedule = require('node-schedule')
import { Calendar } from '@michpl/telegram-calendar'

@Injectable()
export class DeferredService {
    calendar = new Calendar({
        minDate: new Date(),
    })
    async sendTime(time, msg, text, bot) {
        const date = +new Date() + time * 60 * 1000
        new schedule.scheduleJob(date, () => {
            bot.sendMessage(msg.chat.id, text, {
                parse_mode: 'html',
                reply_markup: JSON.stringify({
                    inline_keyboard: this.calendar.getPage(new Date()),
                    callback_data: 'date',
                }),
            })
        })
    }

    async getPage(time, msg, bot) {
        bot.editMessageText('Выберите дату', {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: JSON.stringify({
                inline_keyboard: this.calendar.getPage(time),
                callback_data: 'date',
            }),
        })
    }

    async getYears(bot, msg) {
        bot.editMessageText('Выберите год', {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: JSON.stringify({
                inline_keyboard: this.calendar.getYears(new Date()),
                callback_data: 'date',
            }),
        })
    }
}

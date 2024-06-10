import { Injectable } from '@nestjs/common'
import schedule = require('node-schedule')
import { Calendar } from 'telegram-inline-calendar'

@Injectable()
export class DeferredService {
    async sendTime(time, msg, text, bot) {
        const calendar = new Calendar(bot, {
            date_format: 'MMM D, YYYY h:mm A',
            language: 'ru',
            start_week_day: 1,
            time_selector_mod: true,
            time_range: '08:00-15:59',
            time_step: '15m',
        })

        const date = +new Date() + time * 60 * 1000
        new schedule.scheduleJob(date, function () {
            bot.sendMessage(msg.chat.id, text, {
                parse_mode: 'html',
                reply_markup: JSON.stringify({
                    inline_keyboard: calendar.getPage(new Date()),
                }),
            })
        })
    }
}

import { Injectable } from '@nestjs/common'
import schedule = require('node-schedule')
import { Calendar } from '@michpl/telegram-calendar'

@Injectable()
export class DeferredService {
    async sendTime(time, msg, text, bot) {
        const calendar = new Calendar()
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

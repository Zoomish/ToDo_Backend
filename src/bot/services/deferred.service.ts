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
}

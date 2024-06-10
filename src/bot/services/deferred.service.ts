import { Injectable } from '@nestjs/common'
import schedule = require('node-schedule')

@Injectable()
export class DeferredService {
    async sendTime(time, msg, text, bot) {
        const date = +new Date() + time * 60 * 1000
        new schedule.scheduleJob(date, function () {
            bot.sendMessage(msg.chat.id, text)
        })
    }
}

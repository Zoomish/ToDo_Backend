import { Injectable } from '@nestjs/common'
import { Task } from 'src/task/model/task.model'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const schedule = require('node-schedule')

@Injectable()
export class NotificationService {
    async sendNotification(bot, chatId, tasks) {
        await bot.sendMessage(
            chatId,
            `Уведомления установлены для всех имеющихся задач`
        )
        return await tasks
            .filter((task: Task) => task.notification !== null)
            .map((task: Task) => {
                schedule.scheduleJob(task.notification, async () => {
                    return bot.sendMessage(
                        chatId,
                        `<b>Уведомление о задаче!</b>\n\n<b>Заголовок:</b> ${task.title}\n<b>Описание:</b> ${task.description ? task.description : 'Нет'}\n<b>Дедлайн:</b> ${
                            task.time
                                ? new Date(task.time).toLocaleString(
                                      undefined,
                                      {
                                          weekday: 'long',
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric',
                                      }
                                  )
                                : 'Нет'
                        }\n<b>Статус:</b> ${task.progress}
                    `,
                        {
                            parse_mode: 'HTML',
                            protect_content: true,
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'Изменить задачу',
                                            web_app: {
                                                url: process.env.URL,
                                            },
                                        },
                                    ],
                                    [
                                        {
                                            text: 'Удалить задачу',
                                            web_app: {
                                                url: process.env.URL,
                                            },
                                        },
                                    ],
                                ],
                            }),
                        }
                    )
                })
            })
    }
}

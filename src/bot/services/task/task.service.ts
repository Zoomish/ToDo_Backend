import { Injectable } from '@nestjs/common'
import { Task } from 'src/task/model/task.model'
import { TaskService } from 'src/task/task.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class TasksService {
    constructor(
        private readonly taskService: TaskService,
        private readonly notificationService: NotificationService
    ) {}
    async getTasks(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        const tasks = await this.taskService.findByUserTgId(msg?.chat?.id)
        return await tasks.map(async (task: Task) => {
            return await bot.sendMessage(
                msg.chat.id,
                `<b>Заголовок:</b> ${task.title}\n<b>Описание:</b> ${task.description ? task.description : 'Нет'}\n<b>Дедлайн:</b> ${
                    task.time
                        ? new Date(task.time).toLocaleString(undefined, {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                          })
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
    }
}

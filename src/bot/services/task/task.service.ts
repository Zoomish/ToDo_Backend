import { Injectable } from '@nestjs/common'
import { Task } from 'src/task/model/task.model'
import { TaskService } from 'src/task/task.service'
// Приоритет: ${task.priority}
@Injectable()
export class TasksService {
    constructor(private readonly taskService: TaskService) {}
    async getTasks(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        const tasks = await this.taskService.findByUserTgId(msg?.chat?.id)
        return await tasks.map((task: Task) => {
            return bot.sendMessage(
                msg.chat.id,
                `Заголовок: ${task.title}\nОписание: ${task.description}\nДедлайн: ${task.time}\nСтатус: ${task.progress}
                `,
                {
                    parse_mode: 'HTML',
                    protect_content: true,
                }
            )
        })
    }
}

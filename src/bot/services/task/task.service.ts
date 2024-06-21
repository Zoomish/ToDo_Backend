import { Injectable } from '@nestjs/common'
import { TaskService } from 'src/task/task.service'

@Injectable()
export class TasksService {
    constructor(private readonly taskService: TaskService) {}
    async getTasks(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        const tasks = await this.taskService.findByUserTgId(msg?.chat?.id)
        return await tasks.map((task) => {
            return bot.sendMessage(msg.chat.id, JSON.stringify(task), {
                parse_mode: 'HTML',
                protect_content: true,
            })
        })
    }
}

import { Injectable } from '@nestjs/common'
import { TaskService } from 'src/task/task.service'

@Injectable()
export class TasksService {
    constructor(private readonly taskService: TaskService) {}
    async getTasks(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        return await bot.sendMessage(
            msg.chat.id,
            JSON.stringify(
                (await this.taskService.findByUserTgId(msg?.chat?.id)) || 'No'
            )
        )
    }
}

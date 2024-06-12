import { Injectable } from '@nestjs/common'
import { TaskService } from 'src/task/task.service'

@Injectable()
export class ProjectService {
    constructor(private readonly taskService: TaskService) {}
    async getProjects(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        return await 0
    }
}

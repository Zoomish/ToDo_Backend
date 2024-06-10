import { Injectable } from '@nestjs/common'
import { TaskService } from 'src/projects/task.service'

@Injectable()
export class ProjectService {
    constructor(private readonly TaskService: TaskService) {}
    async getProjects(bot, msg) {
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        const data = await this.TaskService.findAll()
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        return await data.map(async (project) => {
            await bot.sendPhoto(msg.chat.id, `${project.image}`, {
                parse_mode: 'html',
                caption: `<b>Название:</b> ${project.title}\n<b>Описание:</b> ${project.description}\n<b>Посмотреть:</b> <a href='${project.live}'>${project.live}</a>\n<b>Репозиторий:</b> <a href='${project.repository}'>${project.repository}</a>\n<b>Теги:</b> \n${project.tags
                    .replaceAll(' ', '')
                    .split(',')
                    .map((skill) => {
                        return `    ${skill}\n`
                    })
                    .join('')}`,
            })
        })
    }
}

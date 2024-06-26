import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { UpdateTaskDto } from './dto/update-task.dto'
import { CreateTaskDto } from './dto/create-task.dto'

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    findAll(@Param('id') id: string) {
        return this.taskService.findByUserId(+id)
    }
    @Get('/get/AAA')
    AAAA() {
        return {
            mesage: 'AAAAAAAAAAAAAA',
        }
    }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.taskService.create(dto)
    }

    @Get(':id/:taskid')
    findOne(@Param('id') id: string, @Param('taskid') taskid: string) {
        return this.taskService.findOne(+id, +taskid)
    }

    @Patch(':id/:taskid')
    update(
        @Param('id') id: string,
        @Param('taskid') taskid: string,
        @Body() dto: UpdateTaskDto
    ) {
        return this.taskService.update(+id, +taskid, dto)
    }

    @Delete(':id/:taskid')
    remove(@Param('id') id: string, @Param('taskid') taskid: string) {
        return this.taskService.remove(+id, +taskid)
    }
}

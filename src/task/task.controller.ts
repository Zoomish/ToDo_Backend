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
    findAll() {
        return this.taskService.findAll()
    }

    @Get('/AAA')
    AAAA() {
        return {}
    }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.taskService.create(dto)
    }

    @Get('/one:id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(+id)
    }

    @Patch('/one:id')
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
        return this.taskService.update(+id, dto)
    }

    @Delete('/one:id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(+id)
    }
}

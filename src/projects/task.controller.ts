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
import { CreateTaskDto } from './dto/create-task.dto'

@Controller('projects')
export class TaskController {
    constructor(private readonly TaskService: TaskService) {}

    @Get()
    findAll() {
        return this.TaskService.findAll()
    }

    @Get('/AAA')
    AAAA() {
        return {}
    }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.TaskService.create(dto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.TaskService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string) {
        return this.TaskService.update(+id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.TaskService.remove(+id)
    }
}

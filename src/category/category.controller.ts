import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { UpdateTaskDto } from './dto/update-category.dto'
import { CreateTaskDto } from './dto/create-category.dto'

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get(':id')
    findAll(@Param('id') id: string) {
        return this.categoryService.findByUserId(+id)
    }
    @Get('/get/AAA')
    AAAA() {
        return {
            mesage: 'AAAAAAAAAAAAAA',
        }
    }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.categoryService.create(dto)
    }

    @Get(':id/:taskid')
    findOne(@Param('id') id: string, @Param('taskid') taskid: string) {
        return this.categoryService.findOne(+id, +taskid)
    }

    @Patch(':id/:taskid')
    update(
        @Param('id') id: string,
        @Param('taskid') taskid: string,
        @Body() dto: UpdateTaskDto
    ) {
        return this.categoryService.update(+id, +taskid, dto)
    }

    @Delete(':id/:taskid')
    remove(@Param('id') id: string, @Param('taskid') taskid: string) {
        return this.categoryService.remove(+id, +taskid)
    }
}

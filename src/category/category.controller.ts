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

    @Get(':id/:categoryId')
    findOne(@Param('id') id: string, @Param('categoryId') categoryId: string) {
        return this.categoryService.findOne(+id, +categoryId)
    }

    @Patch(':id/:categoryId')
    update(
        @Param('id') id: string,
        @Param('categoryId') categoryId: string,
        @Body() dto: UpdateTaskDto
    ) {
        return this.categoryService.update(+id, +categoryId, dto)
    }

    @Delete(':id/:categoryId')
    remove(@Param('id') id: string, @Param('categoryId') categoryId: string) {
        return this.categoryService.remove(+id, +categoryId)
    }
}

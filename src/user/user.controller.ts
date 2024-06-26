import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto copy'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findByPk(+id)
    }

    @Get('tg/:tg_id')
    findByTg_id(@Param('tg_id') tg_id: string) {
        return this.userService.findByTg_id(+tg_id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(+id, dto)
    }
}

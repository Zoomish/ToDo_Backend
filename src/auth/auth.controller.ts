import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { Roles } from 'src/decorators/roles-auth.decorator'
import { RolesGuard } from 'src/guards/roles.guard'
import { LoginDto } from './dto/login.dto'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @ApiOperation({
        summary: 'Проверка токена на валидность, role: SUPER_ADMIN, ADMIN',
    })
    @ApiResponse({ status: 200 })
    @Get('/validate/token')
    @Roles('ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    async validateToken() {
        return this.authService.validateToken()
    }
}

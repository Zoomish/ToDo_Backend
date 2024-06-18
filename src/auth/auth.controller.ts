import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from 'src/guard/auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @UseGuards(AuthGuard)
    @Get('/validate/token')
    async validateToken() {
        return this.authService.validateToken()
    }
}

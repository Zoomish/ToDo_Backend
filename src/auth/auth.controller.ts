import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from 'src/guard/auth.guard'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto)
    }

    @UseGuards(AuthGuard)
    @Get('/validate/token')
    async validateToken() {
        return this.authService.validateToken()
    }
}

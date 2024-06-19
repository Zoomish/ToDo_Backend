import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto'
import { User } from 'src/user/model/user.model'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto)
        Logger.log('User was logged in successfully')
        return this.generateToken(user)
    }

    async validateToken() {
        return { message: 'valid' }
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id }
        return {
            token: this.jwtService.sign(payload, {
                expiresIn: process.env.JWT_EXPIRES_TIME,
                secret: process.env.JWT_SECRET,
            }),
        }
    }

    private async validateUser(dto: LoginDto) {
        const user = await this.userService.findByLogin(dto.email)
        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        Logger.log('Wrong email or password')
        throw new UnauthorizedException({ message: 'Wrong email or password' })
    }
}

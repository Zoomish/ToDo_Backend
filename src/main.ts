import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    function aaa() {
        setInterval(
            async () => {
                await fetch(
                    'https://todo-backend-pwzq.onrender.com/task/get/AAA'
                )
            },
            1000 * 60 * 14 + 1000 * 30
        )
    }
    await app.listen(process.env.PORT, () => aaa())
}
bootstrap()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    function aaa() {
        setInterval(async () => {
            await fetch('https://jsonplaceholder.typicode.com/posts')
        }, 1000 * 60)
    }
    await app.listen(process.env.PORT, () => aaa())
}
bootstrap()

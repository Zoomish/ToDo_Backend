import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { BotModule } from './bot/bot.module'
import { configurator } from './configurator'
import { Project } from './projects/model/task.model'
import { ProjectsModule } from './projects/task.module'
import { UserModule } from './user/user.module'
import { User } from './user/model/user.model'

@Module({
    imports: [
        UserModule,
        BotModule,
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
            load: [configurator],
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            models: [Project, User],
            autoLoadModels: true,
            synchronize: true,
        }),
        UserModule,
        ProjectsModule,
    ],
})
export class AppModule {}

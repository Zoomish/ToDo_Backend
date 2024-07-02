import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { BotModule } from './bot/bot.module'
import { configurator } from './configurator'
import { Task } from './task/model/task.model'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { User } from './user/model/user.model'
import { AuthModule } from './auth/auth.module'
import { Category } from './category/model/category.model'
import { CategoryModule } from './category/category.module'

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
            models: [Task, User, Category],
            autoLoadModels: true,
            synchronize: true,
        }),
        UserModule,
        TaskModule,
        AuthModule,
        CategoryModule,
    ],
})
export class AppModule {}

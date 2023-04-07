import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      name: 'mysqlMaster',
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities:
        process.env.NODEMON_START === 'TRUE'
          ? ['src/services/entities/service/**/*.entity{.ts,.js}']
          : ['./dist/src/services/entities/service/**/*.entity{.ts,.js}'],
      logging: process.env.ENVIRONMENT === 'development',
      synchronize: false,
      charset: 'utf8mb4',
      extra: {
        connectionLimit: process.env.ENVIRONMENT === 'development' ? 18 : 38,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

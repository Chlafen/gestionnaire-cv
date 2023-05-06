import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';
import { CvsModule } from './cvs/cvs.module';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';
import { Cv } from './cvs/entities/cv.entity';
import { Skill } from './skills/entities/skill.entity';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    SkillsModule,
    CvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
